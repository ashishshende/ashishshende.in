export const formatDate = (dateString: string, timezone = 'Asia/Kolkata') => {
  return new Date(dateString).toLocaleDateString('en-IN', {
    timeZone: timezone,
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const formatCurrency = (amount: number, currency = 'INR') => {
  const symbols: { [key: string]: string } = {
    INR: '₹',
    USD: '$',
    EUR: '€',
    GBP: '£',
    AED: 'د.إ'
  };
  
  const symbol = symbols[currency] || '₹';
  return `${symbol}${amount.toLocaleString('en-IN')}`;
};

export const getGymSettings = () => {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const userData = JSON.parse(user);
        return {
          timezone: userData.timezone || 'Asia/Kolkata',
          currency: userData.currency || 'INR'
        };
      } catch {
        return { timezone: 'Asia/Kolkata', currency: 'INR' };
      }
    }
  }
  return { timezone: 'Asia/Kolkata', currency: 'INR' };
};

export const formatDateWithSettings = (dateString: string) => {
  const { timezone } = getGymSettings();
  return formatDate(dateString, timezone);
};

export const formatCurrencyWithSettings = (amount: number) => {
  const { currency } = getGymSettings();
  return formatCurrency(amount, currency);
};