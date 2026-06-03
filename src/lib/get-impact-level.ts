export function getImpactLevel(
  amount?: number
) {
  if (!amount) {
    return null
  }

  if (amount >= 1_000_000_000) {
    return {
      label: "Dampak Tinggi",
      variant: "destructive"
    }
  }

  if (amount >= 100_000_000) {
    return {
      label: "Dampak Sedang",
      variant: "secondary"
    }
  }

  return {
    label: "Dampak Rendah",
    variant: "outline"
  }
}