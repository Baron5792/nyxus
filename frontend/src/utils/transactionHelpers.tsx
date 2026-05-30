import { TrendingUp, WalletMinimal, HandCoins, SendHorizontal, ChartLine } from 'lucide-react';

interface TransactionStyle {
    icon: any;
    color: string;
    bgColor: string;
}

export const transactionConfig: { [key: string]: TransactionStyle } = {
    'Investment Profit': { icon: TrendingUp, color: '#10b981', bgColor: 'rgba(16, 185, 129, 0.2)' },
    'Withdrawal': { icon: WalletMinimal, color: '#a855f7', bgColor: 'rgba(168, 85, 247, 0.2)' },
    'Deposit': { icon: HandCoins, color: '#22c55e', bgColor: 'rgba(34, 197, 94, 0.2)' },
    'Investment': { icon: ChartLine, color: '#3b82f6', bgColor: 'rgba(59, 130, 246, 0.2)' },
    'Default': { icon: SendHorizontal, color: '#f59e0b', bgColor: 'rgba(245, 158, 11, 0.2)' }
};