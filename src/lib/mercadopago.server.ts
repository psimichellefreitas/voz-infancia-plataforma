import process from "node:process";

/** Server-only helpers para o Mercado Pago. Nunca importar do cliente. */

const MP_API = "https://api.mercadopago.com";

/** URL pública estável do projeto — usada quando a requisição vem de localhost. */
const FALLBACK_SITE_URL = "https://project--dc6bf197-145a-407f-ad81-c1e39885e4f7.lovable.app";

export function getAccessToken(): string {
  const token = process.env["MERCADOPAGO_ACCESS_TOKEN"];
  if (!token) {
    throw new Error(
      "Integração de pagamento indisponível: MERCADOPAGO_ACCESS_TOKEN não está configurado.",
    );
  }
  return token;
}

export function getWebhookSecret(): string | undefined {
  return process.env["MERCADOPAGO_WEBHOOK_SECRET"];
}

export function resolvePublicBaseUrl(requestUrl?: string): string {
  if (!requestUrl) return FALLBACK_SITE_URL;
  try {
    const url = new URL(requestUrl);
    if (url.protocol !== "https:" || url.hostname === "localhost" || url.hostname === "127.0.0.1") {
      return FALLBACK_SITE_URL;
    }
    return url.origin;
  } catch {
    return FALLBACK_SITE_URL;
  }
}

export interface PreferenceInput {
  purchaseId: string;
  productId: string;
  title: string;
  amount: number;
  buyerName: string;
  buyerEmail: string;
  baseUrl: string;
}

export async function createPreference(input: PreferenceInput): Promise<{
  id: string;
  checkoutUrl: string;
}> {
  const response = await fetch(`${MP_API}/checkout/preferences`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
      "Content-Type": "application/json",
      "X-Idempotency-Key": input.purchaseId,
    },
    body: JSON.stringify({
      external_reference: input.purchaseId,
      statement_descriptor: "VOZ PELA INFANCIA",
      items: [
        {
          id: input.productId,
          title: input.title,
          description: "Compra única: acesso ao Voz Protetora.",
          quantity: 1,
          currency_id: "BRL",
          unit_price: input.amount,
        },
      ],
      payer: { name: input.buyerName, email: input.buyerEmail },
      back_urls: {
        success: `${input.baseUrl}/pagamento/processando?compra=${input.purchaseId}`,
        pending: `${input.baseUrl}/pagamento/processando?compra=${input.purchaseId}`,
        failure: `${input.baseUrl}/pagamento/recusado?compra=${input.purchaseId}`,
      },
      auto_return: "approved",
      notification_url: `${input.baseUrl}/api/public/webhooks/mercadopago`,
    }),
  });

  const payload = (await response.json()) as {
    id?: string | number;
    init_point?: string;
    sandbox_init_point?: string;
    message?: string;
  };

  if (!response.ok || !payload.init_point) {
    console.error("[MercadoPago] falha ao criar preferência", response.status, payload.message);
    throw new Error("Não foi possível iniciar o pagamento agora. Tente novamente em instantes.");
  }

  return { id: String(payload.id ?? ""), checkoutUrl: payload.init_point };
}

export interface MpPayment {
  id: string;
  status: string;
  externalReference: string | null;
  amount: number | null;
  payerEmail: string | null;
}

export async function fetchPayment(paymentId: string): Promise<MpPayment | null> {
  const response = await fetch(`${MP_API}/v1/payments/${paymentId}`, {
    headers: { Authorization: `Bearer ${getAccessToken()}` },
  });
  if (!response.ok) {
    console.error("[MercadoPago] falha ao consultar pagamento", paymentId, response.status);
    return null;
  }
  const data = (await response.json()) as {
    id: string | number;
    status: string;
    external_reference?: string | null;
    transaction_amount?: number | null;
    payer?: { email?: string | null };
  };
  return {
    id: String(data.id),
    status: data.status,
    externalReference: data.external_reference ?? null,
    amount: data.transaction_amount ?? null,
    payerEmail: data.payer?.email ?? null,
  };
}

/** Status oficiais do Mercado Pago → status interno. */
export function mapPaymentStatus(status: string): string {
  switch (status) {
    case "approved":
      return "approved";
    case "pending":
    case "in_process":
    case "authorized":
      return "pending";
    case "rejected":
      return "rejected";
    case "cancelled":
    case "refunded":
    case "charged_back":
      return "cancelled";
    default:
      return "pending";
  }
}

// ---------------------------------------------------------------------------
// Assinatura recorrente (Preapproval) — DOC_PRODUTO_VOZ_PROTETORA_V1.md §13
// ---------------------------------------------------------------------------

export interface PreapprovalInput {
  /** id interno de `subscriptions`, usado como external_reference e chave de idempotência. */
  subscriptionId: string;
  reason: string;
  amount: number;
  /** Ciclo de cobrança. Mercado Pago não aceita frequency_type "years": 12 meses = 1 ano. */
  frequency: number;
  frequencyType: "days" | "months";
  payerEmail: string;
  backUrl: string;
}

export async function createPreapproval(input: PreapprovalInput): Promise<{
  id: string;
  checkoutUrl: string;
}> {
  const response = await fetch(`${MP_API}/preapproval`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
      "Content-Type": "application/json",
      "X-Idempotency-Key": input.subscriptionId,
    },
    body: JSON.stringify({
      reason: input.reason,
      external_reference: input.subscriptionId,
      payer_email: input.payerEmail,
      back_url: input.backUrl,
      auto_recurring: {
        frequency: input.frequency,
        frequency_type: input.frequencyType,
        transaction_amount: input.amount,
        currency_id: "BRL",
      },
      // "pending": o pagador autoriza no checkout do Mercado Pago antes de virar "authorized".
      status: "pending",
    }),
  });

  const payload = (await response.json()) as {
    id?: string | number;
    init_point?: string;
    message?: string;
  };

  if (!response.ok || !payload.init_point) {
    console.error("[MercadoPago] falha ao criar preapproval", response.status, payload.message);
    throw new Error("Não foi possível iniciar a assinatura agora. Tente novamente.");
  }

  return { id: String(payload.id ?? ""), checkoutUrl: payload.init_point };
}

export interface MpPreapproval {
  id: string;
  status: string;
  externalReference: string | null;
  payerEmail: string | null;
  /** Data do próximo débito informada pelo Mercado Pago, quando disponível. */
  nextPaymentDate: string | null;
}

export async function fetchPreapproval(preapprovalId: string): Promise<MpPreapproval | null> {
  const response = await fetch(`${MP_API}/preapproval/${preapprovalId}`, {
    headers: { Authorization: `Bearer ${getAccessToken()}` },
  });
  if (!response.ok) {
    console.error("[MercadoPago] falha ao consultar preapproval", preapprovalId, response.status);
    return null;
  }
  const data = (await response.json()) as {
    id: string;
    status: string;
    external_reference?: string | null;
    payer_email?: string | null;
    auto_recurring?: { next_payment_date?: string | null };
  };
  return {
    id: data.id,
    status: data.status,
    externalReference: data.external_reference ?? null,
    payerEmail: data.payer_email ?? null,
    nextPaymentDate: data.auto_recurring?.next_payment_date ?? null,
  };
}

/** Cancela a assinatura no Mercado Pago. O acesso local continua até current_period_end
 * (DOC_PRODUTO §13.4) — esta função só reflete o cancelamento junto ao Mercado Pago. */
export async function cancelPreapproval(preapprovalId: string): Promise<boolean> {
  const response = await fetch(`${MP_API}/preapproval/${preapprovalId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status: "cancelled" }),
  });
  if (!response.ok) {
    console.error("[MercadoPago] falha ao cancelar preapproval", preapprovalId, response.status);
    return false;
  }
  return true;
}

export interface MpAuthorizedPayment {
  id: string;
  status: string;
  preapprovalId: string | null;
  amount: number | null;
}

/** Uma cobrança (inicial ou renovação) dentro de uma assinatura Preapproval. */
export async function fetchAuthorizedPayment(
  authorizedPaymentId: string,
): Promise<MpAuthorizedPayment | null> {
  const response = await fetch(`${MP_API}/authorized_payments/${authorizedPaymentId}`, {
    headers: { Authorization: `Bearer ${getAccessToken()}` },
  });
  if (!response.ok) {
    console.error(
      "[MercadoPago] falha ao consultar authorized_payment",
      authorizedPaymentId,
      response.status,
    );
    return null;
  }
  const data = (await response.json()) as {
    id: string | number;
    status: string;
    preapproval_id?: string | null;
    transaction_amount?: number | null;
  };
  return {
    id: String(data.id),
    status: data.status,
    preapprovalId: data.preapproval_id ?? null,
    amount: data.transaction_amount ?? null,
  };
}

/** Status de preapproval do Mercado Pago → status interno de `subscriptions`. */
export function mapSubscriptionStatus(mpStatus: string): string {
  switch (mpStatus) {
    case "authorized":
      return "authorized";
    case "cancelled":
      return "cancelled";
    case "pending":
      return "pending";
    default:
      return "pending";
  }
}
