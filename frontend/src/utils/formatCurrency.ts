export const formatCurrency = (amountUSD: number, currency: string, rates: Record<string, number>): string => {
    const rate = rates[currency];

    const code = rate ? currency : 'USD';
    const converted = amountUSD * (rate ?? 1);

    return new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: code
    }).format(converted)
};