import React, { useMemo } from 'react';
import styles from '../../assets/css/client/Container-Design.module.css';

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

import { useTheme } from '../../context/ThemeContext';

interface Transaction {
    timestamp: string;
    type: 'DEPOSIT' | 'WITHDRAWAL' | 'PROFIT' | 'TRANSFER';
    amount: number;
}

interface GraphProps {
    transactions: Transaction[];
}

const InvestmentGraph: React.FC<GraphProps> = ({ transactions }) => {
    const { theme } = useTheme();

    const chartData = useMemo(() => {
        return transactions.map((transaction) => ({
            date: new Date(transaction.timestamp).toLocaleDateString(
                'en-US',
                {
                    month: 'short',
                    day: 'numeric',
                }
            ),

            deposit:
                transaction.type === 'DEPOSIT'
                    ? transaction.amount
                    : 0,

            withdrawal:
                transaction.type === 'WITHDRAWAL'
                    ? transaction.amount
                    : 0,

            profit:
                transaction.type === 'PROFIT'
                    ? transaction.amount
                    : 0,

            transfer:
                transaction.type === 'TRANSFER'
                    ? transaction.amount
                    : 0,
        }));
    }, [transactions]);

    const isDark = theme === 'dark';

    return (
        <div
            className={
                isDark
                    ? styles['dark-container']
                    : styles.container
            }
            style={{
                height: '300px',
                width: '100%',
            }}
        >
            <p
                style={{
                    color: isDark ? '#fff' : '#000',
                    marginBottom: '20px',
                    fontFamily: 'sans-serif',
                    fontSize: '14px',
                }}
            >
                Investment Performance
            </p>

            <ResponsiveContainer
                width="100%"
                height="85%"
            >
                <BarChart
                    data={chartData}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 20,
                    }}
                >
                    <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke={isDark ? '#2a2d33' : '#e5e5e5'}
                    />

                    <XAxis
                        dataKey="date"
                        axisLine={false}
                        tickLine={false}
                        tick={{
                            fill: isDark ? '#aaa' : '#666',
                            fontSize: 12,
                        }}
                    />

                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{
                            fill: isDark ? '#aaa' : '#666',
                            fontSize: 12,
                        }}
                        tickFormatter={(value) =>
                            `$${value / 1000}K`
                        }
                    />

                    <Tooltip
                        contentStyle={{
                            backgroundColor: isDark
                                ? '#1a1d23'
                                : '#fff',
                            border: 'none',
                            borderRadius: '8px',
                            color: isDark ? '#fff' : '#000',
                        }}
                        formatter={(value: any, name: string) => [
                            `$${Number(value).toLocaleString()}`,
                            name,
                        ]}
                    />

                    <Bar
                        dataKey="deposit"
                        name="Deposit"
                        fill="#0E695C"
                        radius={[4, 4, 0, 0]}
                    />

                    <Bar
                        dataKey="withdrawal"
                        name="Withdrawal"
                        fill="#e74c3c"
                        radius={[4, 4, 0, 0]}
                    />

                    <Bar
                        dataKey="profit"
                        name="Profit Earned"
                        fill="#27ae60"
                        radius={[4, 4, 0, 0]}
                    />

                    <Bar
                        dataKey="transfer"
                        name="Amount Transferred"
                        fill="#3498db"
                        radius={[4, 4, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default InvestmentGraph;