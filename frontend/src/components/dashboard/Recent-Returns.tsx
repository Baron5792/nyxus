import { Activity, TrendingUp, Wallet } from 'lucide-react'
import container from '../../assets/css/client/Container-Design.module.css'
import { useUser } from '../../context/authContext';

export const RecentInvestedAndReturns = () => {
    const { user } = useUser();

    const RecentProperties = [
        { id: '1', title: 'Total Invested', amount: user && user.totalInvestment, increase: '3.25', icon: <Wallet style={{ color: '#0D884B' }} />, background: '#F3FBF6' },
        { id: '2', title: 'Total Returns', amount: user && user.totalReturns, increase: '8.45', icon: <TrendingUp style={{ color: '#5326A9' }} />, background: '#FAF8FB' },
        { id: '3', title: 'Active Investments', amount: '8', increase: null, icon: <Activity style={{ color: '#2763AD' }} />, background: '#F4F7FA' }
    ]
    return (
        <>
            <div className={`container-fluid p-0 mt-4`}>
                <div className="row">
                    {RecentProperties.map((prop) => (
                        <div className="col-12 col-md-6 col-lg-6 col-xl-6 rounded" key={prop.id}>
                            <div className={container.container}>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <div style={{ color: 'black' }}>
                                            <p className="m-0 small">{prop.title}</p>
                                        </div>
                                        <div>
                                            <p className="text-dark fs-4 my-1" style={{ fontFamily: 'sans-serif' }}>{prop.increase ? '$': ''}{prop.amount}</p>
                                        </div>
                                        <div>
                                            <p className="text-secondary mt-0" style={{ fontFamily: 'sans-serif', fontSize: '12px' }}><span style={{ color: 'var(--primary-color)' }}><i className={`bi bi-${prop.increase ? 'caret-up-fill': ''} me-1`}></i>{prop.increase}{prop.increase ? '%': null}</span></p>
                                        </div>
                                    </div>
                                    <div>
                                        <span className='p-2 rounded' style={{ backgroundColor: prop.background }}>
                                            {prop.icon}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    
                </div>
            </div>
        </>
    )
}