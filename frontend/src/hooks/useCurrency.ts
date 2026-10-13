import { useUser } from "../context/authContext"
import { useRates } from "../context/rateContext";
import { formatCurrency } from "../utils/formatCurrency";

export const useCurrency = () => {
    const { user } = useUser();
    const rates = useRates();
    const currency = user?.Currency ?? 'USD';

    return (amountUSD: number, show: boolean = true) => show ? formatCurrency(amountUSD, currency, rates) : '*****'
}