const TAX_RATE = 0.085
const FREE_DELIVERY_THRESHOLD_CENTS = 3500
const DELIVERY_FEE_CENTS = 499

export function calcTaxCents(subtotalCents: number): number {
  return Math.round(subtotalCents * TAX_RATE)
}

export function calcDeliveryFeeCents(subtotalCents: number): number {
  return subtotalCents >= FREE_DELIVERY_THRESHOLD_CENTS ? 0 : DELIVERY_FEE_CENTS
}

export function calcOrderTotals(subtotalCents: number) {
  const taxCents = calcTaxCents(subtotalCents)
  const deliveryFeeCents = calcDeliveryFeeCents(subtotalCents)
  return {
    subtotalCents,
    taxCents,
    deliveryFeeCents,
    totalCents: subtotalCents + taxCents + deliveryFeeCents,
  }
}
