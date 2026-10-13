import { useCurrency } from "../../hooks/useCurrency"

type Props = {
    amount: number;
    hidden?: boolean;
}

export const CurrencyFormat = ({ amount, hidden = false }: Props) => {
    const format = useCurrency();
    return (
        format(amount, !hidden)
    )
};