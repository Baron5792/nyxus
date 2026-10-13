import { CircleArrowDown, SendHorizonal, TrendingUp, CircleArrowUp } from 'lucide-react';
import container from '../../assets/css/client/Container-Design.module.css';
import { NavLink } from 'react-router-dom';
import ScrollFadeIn from '../ui/FadeIn';
import { useTheme } from '../../context/ThemeContext';

export const QuickActions = () => {
    const { theme } = useTheme();

    const ActionIcons = [
        { id: '1', title: 'Deposit', icon: <CircleArrowDown size={15} />, to: '/client/deposit', iconColor: '#0D884B', background: theme === 'dark' ? '#AEB7C4' : '#F3FBF6' },
        { id: '2', title: 'Withdraw', icon: <CircleArrowUp size={15} />, to: '/client/withdraw', iconColor: '#5326A9', background: theme === 'dark' ? '#AEB7C4' : '#FAF8FB' },
        { id: '3', title: 'Invest', icon: <TrendingUp size={15} />, to: '/client/investment', iconColor: '#2763AD', background: theme === 'dark' ? '#AEB7C4' : '#F4F7FA' },
        { id: '4', title: 'Transfer', icon: <SendHorizonal size={15} />, to: '/client/transfer', iconColor: '#995C0E', background: theme === 'dark' ? '#AEB7C4' : '#FEFAF6' }
    ];
    return (
        <>
            <div className={theme === 'dark' ?container['dark-container'] : container.container}>
                <div>
                    <p style={{ fontSize: '14px', fontFamily: 'Arial, sans-serif' }} className="text-dark">Quick Actions</p>
                </div>
                <div className="container-fluid">
                    <div className="row">
                        {ActionIcons.map((item) => (
                            <div className={`col-6 col-md-6 col-lg-3 col-xl-3 mb-2`} key={item.id}>
                                <NavLink to={item.to} className={`text-decoration-none d-flex flex-column align-items-center justify-content-center`}>
                                    <div className="d-flex flex-column align-items-center">
                                        <ScrollFadeIn>
                                            <div style={{ backgroundColor: item.background }} className='p-3 rounded'>
                                                <span style={{ backgroundColor: item.iconColor, color: 'white', padding: '2px 6px 6px 6px', borderRadius: '50%'}} className="">{item.icon}</span>
                                            </div>
                                        </ScrollFadeIn>
                                        <p className="text-center mt-1" style={{ fontSize: '12px', color: 'grey' }}>{item.title}</p>
                                    </div>
                                </NavLink>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}