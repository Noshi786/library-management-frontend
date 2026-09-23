export function formatHeader(titleText) {
  return `\n=== ${titleText.toUpperCase()} ===`;
}

export function formatCurrency(amount) {
  return `$${Number(amount).toFixed(2)}`;
}