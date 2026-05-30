import React, { useMemo } from 'react';
import styles from '../../assets/css/client/Container-Design.module.css'
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

interface Transaction {
    timestamp: any; // ISO format or "YYYY-MM-DD"
    type: any;
    amount: number;
}

interface GraphProps {
    transactions: Transaction[];
}

const InvestmentGraph: React.FC<GraphProps> = ({ transactions }) => {
    // Process raw transactions into a cumulative timeline for the graph
    const chartData = useMemo(() => {
        let cumulativeBalance = 0;
        return transactions
            .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
            .map((item) => {
                if (item.type === 'WITHDRAWAL') {
                cumulativeBalance -= item.amount;
                } else {
                cumulativeBalance += item.amount;
                }
                return {
                date: new Date(item.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                value: cumulativeBalance,
                };
            });
    }, [transactions]);

    return (
        <div className={styles.container} style={{ height: '300px' }}>
            <p style={{ color: 'black', marginBottom: '20px', fontFamily: 'sans-serif', fontSize: '14px' }}>Investment Performance</p>
        
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right:30, left: 0, bottom: 40 }}>
                    <defs>
                        {/* Creates the glowing green gradient from your image */}
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#00ffa3" stopOpacity={0.1}/>
                            <stop offset="80%" stopColor="#00ffa3" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                
                    <XAxis 
                        dataKey="date" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#666', fontSize: 12 }} 
                        dy={10}
                    />
                
                    <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#666', fontSize: 12 }}
                        tickFormatter={(value) => `$${value / 1000}K`}
                    />

                    <Tooltip 
                        contentStyle={{ backgroundColor: '#1a1d23', border: 'none', borderRadius: '8px', color: '#fff' }}
                        itemStyle={{ color: '#00ffa3' }}
                        formatter={(value: any) => [`$${value.toLocaleString()}`, 'Balance']}
                    />

                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1f2229" />

                    <Area
                        type="monotone" // This creates the smooth wave
                        dataKey="value"
                        stroke="#00ffa3"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorValue)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default InvestmentGraph;