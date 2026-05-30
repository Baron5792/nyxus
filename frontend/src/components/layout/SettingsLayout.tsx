import { Bell, Shield, SlidersHorizontal, User } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, Outlet, useOutletContext } from "react-router-dom"
import styles from '../../assets/css/client/SettingsLayout.module.css';

interface SettingsTitleProps {
    setPageTitle: (title: string) => void;
}

interface subPageTitleProps {
    subPageTitle: any;
}

export const SettingsLayout = () => {
    const { setPageTitle } = useOutletContext<SettingsTitleProps>();
    const [subPageTitle, setSubPageTitle] = useState<subPageTitleProps | null>(null);
    useEffect(() => {
        setPageTitle(`${subPageTitle}`);
    }, [setPageTitle, subPageTitle]);

    const SettingsLinks = [
        { id: '1', title: 'Profile', icon: <User strokeWidth={2} size={20} />, to: '/client/settings' },
        { id: '2', title: 'Security', icon: <Shield strokeWidth={2} size={20} />, to: '/client/settings/security' },
        { id: '3', title: 'Preference', icon: <SlidersHorizontal strokeWidth={2} size={20} />, to: '/client/settings/preference' },
        { id: '4', title: 'Notification', icon: <Bell strokeWidth={2} size={20} />, to: '/client/settings/notifications' }
    ]

    return (
        <>
            <div className="container-fluid">
                <div className="row">   
                    <div className="col-12 col-md-12 col-lg-3 col-xl-2 mt-2">
                        <div className="nav d-flex flex-row flex-lg-column justify-content-between">
                            { SettingsLinks && (
                                SettingsLinks.map((prop) => (
                                    <NavLink to={prop.to} key={prop.id} className={({ isActive }) => `d-flex align-items-center py-2 text-decoration-none  ps-3 pe-3 ${isActive ? `${styles['active']}`: `text-secondary`}`} style={{ fontFamily: 'sans-serif', fontSize: '14px' }}>{prop.icon} <span className="d-none d-lg-inline">{prop.title}</span></NavLink>
                                ))
                            ) }
                        </div>
                    </div>
                    <div className="col-12 col-md-12 col-lg-9 col-xl-10 mt-2">
                        <Outlet context={{ setSubPageTitle }} />
                    </div>
                </div>
            </div>
        </>
    )
}