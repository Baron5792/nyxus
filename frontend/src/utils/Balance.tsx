import type { ReactNode } from "react";

export const FormatBalance = (balance: number, displayBalance: boolean) => {
    if (!displayBalance) {
        return '******';
    }

    return `${Number(balance).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })}`
}