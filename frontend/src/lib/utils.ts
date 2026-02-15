// Utility function to format numbers in Indian number system (lakhs, crores)
export function formatIndianCurrency(amount: number): string {
  if (amount >= 10000000) {
    // Crores
    const crores = amount / 10000000;
    return `₹${crores.toFixed(2)} Cr`;
  } else if (amount >= 100000) {
    // Lakhs
    const lakhs = amount / 100000;
    return `₹${lakhs.toFixed(2)} L`;
  } else if (amount >= 1000) {
    // Thousands
    const thousands = amount / 1000;
    return `₹${thousands.toFixed(2)} K`;
  } else {
    return `₹${amount.toFixed(2)}`;
  }
}

// Format with commas for Indian numbering system
export function formatIndianNumber(amount: number): string {
  return amount.toLocaleString('en-IN', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
  });
}

// Format currency with ₹ symbol
export function formatCurrency(amount: number): string {
  return `₹${formatIndianNumber(amount)}`;
}
