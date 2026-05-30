import { NavLink } from 'react-router-dom'
import container from '../../assets/css/client/Container-Design.module.css'
// import { TrendingUp } from 'lucide-react'
import { transactionConfig } from '../../utils/transactionHelpers'

export const RecentTransactions = () => {
    const transactions = [
        { id: '1', title: 'Investment Profit', date: 'May 4, 2026', amount: '+350.75' },
        { id: '2', title: 'Withdrawal', date: 'May 3, 2026', amount: '-150.00' },
        { id: '3', title: 'Deposit', date: 'May 2, 2026', amount: '+500.00' },
        { id: '4', title: 'Transfer to Collins', date: 'Sep 8, 2025', amount: '-200.00' }
    ]
    return (
        <>
            <div className={container.container}>
                <div className='d-flex justify-content-between align-items-center'>
                    <p className='text-dark' style={{ fontFamily: 'sans-serif', fontSize: '14px' }}>Recent Transactions</p>
                    <NavLink to={'/client/transactions/all'} className={'text-decoration-none'} style={{ fontFamily: 'sans-serif', fontSize: '14px', color: 'var(--primary-color)' }}>View All</NavLink>
                </div>

                {transactions.map((trx) => {
                    const config = transactionConfig[trx.title] || transactionConfig['Default'];
                    const Icon = config.icon;
                    const isPositive = trx.amount.startsWith('+');

                    return (
                        <div className="d-flex justify-content-between align-items-center mt-3">
                            <div className="d-flex align-items-center gap-3">
                                <div>
                                    <div className='rounded text-dark text-center pt-1' style={{ backgroundColor: config.bgColor, width: '40px', height: '40px', flexShrink: 0 }}>
                                        <Icon size={20} />
                                    </div>
                                </div>
                                <div>
                                    <p className='m-0 text-dark' style={{ fontFamily: 'sans-serif', fontSize: '14px' }}>{trx.title}</p>
                                    <p style={{ fontFamily: 'sans-serif', fontSize: '12px', color: 'grey' }}>{trx.date}</p>
                                </div>
                            </div>
                            <div>
                                <p style={{ fontFamily: 'sans-serif', color: isPositive ? 'lightgreen' : 'lightcoral', fontSize: '14px' }}>{trx.amount}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}