import { ChevronRight, Cog, CreditCard, Shield, ShieldCheck, ShieldPlus, User } from "lucide-react"
import { CustomIcons } from "../../components/ui/CustomIcons"
import { useNavigate, useOutletContext } from "react-router-dom"
import { useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import ContainerCss from '../../assets/css/client/Container-Design.module.css';
import { motion } from 'motion/react';

export const Account = () => {
    const { setPageTitle }: any = useOutletContext();
    useEffect(() => {
        setPageTitle('Accounts');
        document.title = `Accounts - ${import.meta.env.VITE_APP_NAME}`;
        return () => setPageTitle(null);
    }, [setPageTitle]) 
    const { theme } = useTheme();
    const ServicesList = [
        { id: 1, title: 'Profile', subContent: 'Update your information, contact details and profile photo.', icon: <User />, backGround: '#006B61', color: '#19E6D2', to: '/client/settings' },
        { id: 2, title: 'Security', subContent: 'Change your password, enable 2FA and manage your active sessions.', icon: <Shield />, backGround: '#0755C9', color: '#A8D5FF', to: '/client/settings/security' },
        { id: 3, title: 'Preferences', subContent: 'Set your display mode, currency, language and notification settings.', icon: <Cog />, backGround: '#4B3BB5', color: '#C4B5FD', to: '/client/settings/preference' },
        { id: 4, title: 'KYC Verification', subContent: 'Complete your identity verification to unlock more features.', icon: <ShieldCheck />, backGround: '#008F70', color: '#6EE7B7', to: '/client/settings/security' },
        { id: 5, title: 'Withdrawal Methods', subContent: 'Manage your linked bank accounts and withdrawal options.', icon: <CreditCard />, backGround: '#0755C9', color: '#A8D5FF', to: '/client/withdrawal-methods' }
    ];

    const navigate = useNavigate();

    return (
        <>
            <div className="row">
                <div className="col-12 col-lg-6">
                    <div className="d-flex align-items-center">
                        <CustomIcons icon={<User />} className={'rounded'} BackgroundColor={'var(--primary-color)'} iconColor="var(--border)" />
                        <div className="mx-3" style={{ fontFamily: 'sans-serif' }}>
                            <p style={{ fontSize: '18px', color: theme === 'dark' ? 'white' : 'black' }} className="mb-0">Account</p>
                            <p className="mt-0 text-secondary" style={{ fontSize: '13px' }}>Manage your account, security, preferences and more. Keep your information safe and up to date.</p>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-lg-6">
                    <div className={`d-flex justify-content-between align-items-center ${ContainerCss['gradient-border']}`}>
                        <div>
                            <p className="m-0" style={{ fontSize: '17px', color: theme === 'dark' ? 'grey' : 'white', fontFamily: 'sans-serif' }}>Your account,</p>
                            <p className="m-0" style={{ fontSize: '17px', color: theme === 'dark' ? 'grey' : 'white', fontFamily: 'sans-serif' }}>your control.</p>
                            <small style={{ fontFamily: 'sans-serif', fontSize: '12px', color: 'silver' }}>Manage everything in one place for a safer and smoother experience.</small>
                        </div>
                        <div>
                            <ShieldPlus size={80} color={'var(--primary-color)'} />
                        </div>
                    </div>
                </div>
            </div>


            {/* Services rendered */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                <div className="row mt-5">
                    {
                        ServicesList && (
                            ServicesList.map((item) => (
                                <div className="col-12 col-lg-6" key={item.id} onClick={() => navigate(item.to)}>
                                    <div className={`p-4 ${ContainerCss['container-pointer']} ${theme === 'dark' ? ContainerCss['dark-container']: ContainerCss['container']}`}>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <CustomIcons icon={item.icon} BackgroundColor={item.backGround} iconColor={item.color} className={'rounded-circle'} />
                                            <div className="ms-3 me-3">
                                                <p className="mb-0" style={{ fontFamily: 'sans-serif' }}>{item.title}</p>
                                                <p style={{ fontFamily: 'sans-serif', fontSize: '12px', color: 'grey' }}>{item.subContent}</p>
                                            </div>
                                            <ChevronRight color="grey" />
                                        </div>
                                    </div>
                                </div>
                            ))
                        )
                    }
                </div>
            </motion.div>
        </>
    )
}