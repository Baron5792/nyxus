import { LayoutDashboard, TrendingUp, CreditCard, UserRound } from "lucide-react";
import { NavLink } from "react-router-dom";
import styles from '../../assets/css/client/MobileFixedFooter.module.css';

export const MobileFixedFooter = () => {
    const BottomLinks = [
        { id: '1', title: 'Home', to: '/client/dashboard', icon: <LayoutDashboard size={20} strokeWidth={1} /> },
        { id: '2', title: 'Investments', to: '/client/investments', icon: <TrendingUp size={20} strokeWidth={1} /> },
        { id: '3', title: 'Card', to: '/client/virtual-card', icon: <CreditCard size={20} strokeWidth={1} /> },
        { id: '4', title: 'Profile', to: '/client/accounts', icon: <UserRound size={20} strokeWidth={1} /> },
    ]

    return (
        <>
            <div className="d-block d-md-none d-lg-none d-xl-none">
                <div className="fixed-bottom p-2 d-flex justify-content-around rounded-pill" style={{ backgroundColor: 'var(--light-background)' }}>
                    {BottomLinks.map((link) => (
                        <NavLink key={link.id} to={link.to} className={({ isActive }) => `text-decoration-none ${isActive ? `${styles.active}` : 'text-secondary'}`}>
                            <div className="d-flex flex-column align-items-center">
                                {link.icon}
                                <span style={{ fontSize: '12px' }}>{link.title}</span>
                            </div>
                        </NavLink>
                    ))}
                </div>
            </div>
        </> 
    )
}