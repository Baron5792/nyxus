import { Navigate, NavLink, Outlet } from "react-router-dom"
import styles from '../../assets/css/public/ClientLayout.module.css'
import Logo from '../../assets/images/logo/logo-dark.png'
import DarkThemeLogo from '../../assets/images/logo/logo.png'
import { ArrowRightLeft, Bell, TrendingUp, ClipboardList, CreditCard, HelpCircle, LayoutDashboard, MenuIcon, Search, Settings, UserPlus, UserRound, X, Eye, Wallet, EyeOff, BadgeCheck, User, Shield, SlidersHorizontal, LogOut, PiggyBank, HandCoins } from "lucide-react"
import ScrollFadeIn from "../ui/FadeIn"
// import UpgradeToPremium from "../ui/UpgradeToPremium"
import { AppButton } from "../ui/Button"
import { Dropdown } from "react-bootstrap"
import DefaultAvatar from '../../assets/images/avatar/bandmember.jpg'
import { useEffect, useState } from "react"
import { MobileFixedFooter } from "./Mobile-Fixed-Footer"
import { toast } from "sonner"
import { useUser } from "../../context/authContext"
import { HandleBalanceDisplay } from "../../service/HandleBalanceDisplay"
import ContainerCustom from '../../assets/css/client/Container-Design.module.css'
import { useTheme } from '../../context/ThemeContext'
import Skeleton from "./Skeleton"
import { CurrencyFormat } from "../ui/CurrencyFormat"
// import { icon } from "@fortawesome/fontawesome-svg-core"

export const ClientLayout = () => {
    const { user, refreshUser, loading } = useUser();
    /**
     * Main NavLinks for mobile and desktop
     */
    const NavLinks = [
        { id: '1', title: 'Dashboard', to: '/client/dashboard', icon: <LayoutDashboard size={18} strokeWidth={1} /> },
        { id: '2', title: 'Accounts', to: '/client/accounts', icon: <UserRound size={18} strokeWidth={1} /> },
        { id: '3', title: 'Investments', to: '/client/investments', icon: <TrendingUp size={18} strokeWidth={1} /> },
        { id: '10', title: 'Deposit', to: '/client/deposit', icon: <PiggyBank size={18} strokeWidth={1} />,},
        { id: '4', title: 'Transactions', to: '/client/transactions', icon: <ArrowRightLeft size={18} strokeWidth={1} /> },
        { id: '11', title: 'Withdraw', to: '/client/withdraw', icon: <HandCoins size={18} strokeWidth={1} /> },
        { id: '5', title: 'Virtual Card', to: '/client/virtual-card', icon: <CreditCard size={18} strokeWidth={1} /> },
        { id: '6', title: 'Beneficiaries', to: '/client/beneficiaries', icon: <UserPlus size={18} strokeWidth={1} /> },
        { id: '7', title: 'Reports', to: '/client/reports', icon: <ClipboardList size={18} strokeWidth={1} /> },
        { id: '8', title: 'Settings', to: '/client/settings', icon: <Settings size={18} strokeWidth={1} /> },
        { id: '9', title: 'Support', to: '/client/support', icon: <HelpCircle size={18} strokeWidth={1} /> },
    ]

    const [pageTitle, setPageTitle] = useState(null);
    const [mobileMenu, setMobileMenu] = useState(false);

    const openMobileMenu = () => {
        setMobileMenu(true);
    }

    const ProfileContent = [
        { id: '1', title: 'Profile Settings', to: '/client/settings', function: null, icon: <User strokeWidth={2} size={17} /> },
        { id: '2', title: 'Security', to: '/client/settings/security', function: null, icon: <Shield strokeWidth={2} size={17} /> },
        { id: '3', title: 'Preferences', to: '/client/settings/preference', function: null, icon: <SlidersHorizontal strokeWidth={2} size={17} /> },
    ]

    /**
     * @param value 
     * @returns 
     */
    const handleBalance = async(value: boolean) => {
        try {
            const request = await HandleBalanceDisplay(value);
            if (request.success === false) {
                toast.error(request.message || 'Something went wrong', {id: 'something-error'});
                return false;
            }
            refreshUser();
        }

        catch (error) {
            // toast.error('Something went wrong', {id: 'network-error'});
            console.log(error);
        }
    }

    const { theme } = useTheme();
    useEffect(() => {
        refreshUser();
    }, [])
    // const navigate = useNavigate();
    /**
     * Validate authorization access
     */
    if (loading) {
        return (
            <Skeleton width="100%" height="100px" />
        )
    }

    if (!user) return <Navigate to={'/auth/login'} replace />

    return (
        <>
            <div className={theme === 'dark' ? `${styles['dark-mode']} container-fluid` : `light-mode ${styles['client-layout-container']} container-fluid`}>
                <div className="row">
                    {/* NavLinks tab for desktop view */}
                    {/* Left header nav */}
                    <section className="d-none d-md-none d-lg-block d-xl-block col-lg-3 col-xl-3">
                        <div className={`p-2 ${styles['client-layout']}`}>
                            <div className={styles['left-sidenav-container']}>
                                {/* app logo */}
                                <div style={{ width: '30%' }}>
                                    <NavLink to={'/'}>
                                        <img src={theme === 'dark' ? DarkThemeLogo : Logo} alt={`${import.meta.env.VITE_APP_NAME} logo`} className="w-100" />
                                    </NavLink>
                                </div>

                                {/* desktop nav links here */}
                                <div className={`${styles['desktop-nav-links-container']} px-3`}>
                                    <ScrollFadeIn>
                                        {NavLinks && (
                                            NavLinks.map((link) => (
                                                <NavLink to={link.to} key={link.id} className={({ isActive }) => `d-block text-decoration-none rounded ${isActive ? `${styles['active-link']}`: `${styles['inactive-link']}`}`}>
                                                    {link.icon}
                                                    <span className="ms-2">{link.title}</span>
                                                </NavLink>
                                            ))
                                        )}
                                    </ScrollFadeIn>
                                </div>

                                {/* upgrade to premium */}
                                {/* <UpgradeToPremium /> */}
                            </div>
                        </div>
                    </section>
                    
                    <section className="col-12 col-md-12 col-lg-9 col-xl-9">
                        <section className="position-sticky top-0" style={{ zIndex: 1000, backgroundColor: theme === 'dark' ? 'var(--dark-background-color)' : 'white' }}>
                            <div className={`${styles['content-header-container']} d-flex justify-content-between align-items-center`}>
                                {/* PAGE TITLE */}
                                <div className="d-none d-md-none d-lg-block d-xl-block">
                                    <p style={{ fontFamily: 'sans-serif', fontSize: '18px' }} className="text-dark m-0">{pageTitle || null}</p>
                                </div>
                                
                                {/* OPEN MENU BUTTON */}
                                <div className="d-block d-md-block d-lg-none d-xl-none text-secondary">
                                    <MenuIcon onClick={openMobileMenu} strokeWidth={2} />
                                </div>

                                {/* OTHER REQUIRED (SEARCH TAB, NOTIFICATION, AVATAR, FULL NAME) */}
                                <div className={`float-end ${styles['other-required-tab']}`}>
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-0 col-md-0 col-lg-6 col-xl-6 d-none d-md-none d-lg-block">
                                                <div className={`${styles['search-container']} form-group`}>
                                                    <div className="input-group">
                                                        <input type="search" name="" placeholder="Search anything..." id="" className="form-control border-none border-end-0 shadow-none px-3" style={{ fontFamily: 'sans-serif', fontSize: '14px', color: 'grey' }} />

                                                        <AppButton type="button" className="btn btn-normal text-secondary border-start-0 border-top border-end border-bottom border-muted px-2" title={<Search size={13} />} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-12 col-lg-6 col-xl-6 d-block d-md-block p-0">
                                                <div className="d-flex align-items-center justify-content-between">
                                                    {/* NOTIFICATION DROPDOWN */}
                                                    <Dropdown>
                                                        <Dropdown.Toggle variant="normal" className={`${styles['bell-toggle']} position-relative text-secondary`}>
                                                            <Bell size={17} />

                                                            {/* NOTIFICATION BADGE */}
                                                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success" 
                                                            style={{ fontSize: '10px', padding: '3px 6px' }}>
                                                                1
                                                            <span className="visually-hidden">unread messages</span>
                                                            </span>
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu>
                                                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, optio modi? Reprehenderit debitis laboriosam, impedit nam incidunt reiciendis harum necessitatibus at accusantium nemo asperiores odio nesciunt pariatur consequuntur iusto blanditiis.</p>
                                                        </Dropdown.Menu>
                                                    </Dropdown>

                                                    {/* DISPLAY AVATAR AND FULL NAME */}
                                                    <Dropdown>
                                                        <Dropdown.Toggle variant="normal" className={`${styles['avatar-toggle']} text-white`}>
                                                            <div className="d-flex align-items-center justify-content-between">
                                                                <div className={styles['avatar-container']}>
                                                                    {user ? (
                                                                        user && user.avatar && user.avatar.length > 0 ? (
                                                                        <img src={user.avatar.startsWith('https') ? user.avatar : `${import.meta.env.VITE_APP_AVATAR_URL}${user.avatar}`} alt={`${import.meta.env.VITE_APP_NAME} avatar`} />
                                                                    ): (
                                                                        <img src={DefaultAvatar} alt={`${import.meta.env.VITE_APP_NAME} avatar`} />
                                                                    )
                                                                    ): (
                                                                        <Skeleton height="30px" width="30px" borderRadius="50%" />
                                                                    )}
                                                                </div>
                                                                <div className="d-none d-md-none d-lg-block d-xl-block ms-2 text-secondary" style={{ fontFamily: 'sans-serif', fontSize: '13px', width: '130px' }}>
                                                                    <p className="m-0 text-truncate" style={{ textTransform: 'capitalize' }}>{user && user.fullname} <span className="bi bi-chevron-down small"></span></p>
                                                                </div>
                                                            </div>
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu className={`${styles['profile-content-dropdown']} ${ContainerCustom.container}`}>
                                                            <div className="py-0 px-2">
                                                                <div className="d-flex align-items-center">
                                                                    <div style={{ width: '35px', height: '35px' }} className="m-0">
                                                                        {user && user.avatar && user.avatar.length > 0 ? (
                                                                            <img src={user.avatar.startsWith('https') ? user.avatar : `${import.meta.env.VITE_APP_AVATAR_URL}${user.avatar}`} alt={`avatar - ${import.meta.env.VITE_APP_NAME}`} className="w-100 rounded-circle" style={{ height: '100%' }} />
                                                                        ): (
                                                                            <img src={DefaultAvatar} alt={`avatar - ${import.meta.env.VITE_APP_NAME}`} className="w-100 rounded-circle" />
                                                                        )}
                                                                    </div>
                                                                    <div style={{ overflow: 'hidden', fontFamily: 'sans-serif' }} className="ms-2 mt-0">
                                                                        <p style={{ fontSize: '13px', fontWeight: 'bold' }} className="mb-0">NYX-{user && user.accountId}</p>
                                                                        <p style={{ fontSize: '12px' }} className="text-secondary">{user && user.email}</p>
                                                                    </div>
                                                                </div>
                                                                {/* Member type */}
                                                                <div className="my-2 border py-2 ps-3">
                                                                    <span className="" style={{ fontFamily: 'sans-serif', fontSize: '14px', color: 'var(--primary-color)' }}><BadgeCheck className="text-warning" /> Premium Member</span>
                                                                </div>
                                                                {ProfileContent && (
                                                                    ProfileContent.map((link) => (
                                                                        <div>
                                                                            <NavLink to={link.to} className={'d-block py-2 px-3 text-decoration-none'} style={{ fontFamily: 'sans-serif', fontSize: '14px', color: 'grey' }} onClick={() => link.function} key={link.id}>{link.icon} {link.title}</NavLink>
                                                                        </div>
                                                                    ))
                                                                )}
                                                                {/* Help center */}
                                                                <div className="border border-start-0 border-end-0 py-2 my-2">
                                                                    <NavLink className={'text-decoration-none px-3'} to={'/client/support'} style={{ fontFamily: 'sans-serif', fontSize: '14px', color: 'grey' }}><HelpCircle strokeWidth={2} size={17} /> Help Center</NavLink>
                                                                </div>

                                                                <div className="py-2 my-2">
                                                                    <NavLink className={'text-decoration-none px-3'} to={'/client/support'} style={{ fontFamily: 'sans-serif', fontSize: '14px', color: 'lightcoral' }}><LogOut strokeWidth={2} size={17} /> Sign Out</NavLink>
                                                                </div>
                                                            </div>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <div className="container-fluid">
                            <div className="my-4 pb-5">
                                <Outlet context={{ setPageTitle }} />
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            <MobileFixedFooter />
            

            {/* MOBILE MENU SIDEBAR */}
            <section className={`${mobileMenu ? `position-fixed`: `d-none`} top-0 left-0 d-lg-none d-xl-none`} style={{ zIndex: 1100, width: '250px', height: '100vh', backgroundColor: theme === 'dark' ? 'var(--dark-background-color)' : 'white', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.04)' }}>
                <div className="py-2 px-3">
                    {/* INTRO OF LOGO AND CLOSE BUTTON */}
                    <section className="d-flex justify-content-between align-items-center mb-1">
                        <div style={{ width: '100px' }}>
                            <img src={theme === 'dark' ? DarkThemeLogo : Logo} alt="" className="w-100" />
                        </div>
                        <div>
                            <X className="text-secondary" size={20} onClick={() => setMobileMenu(false)} />
                        </div>
                    </section>

                    {/* AVATAR, NAME AND SUBSCRIPTION */}
                    <div className="d-flex align-items-center">
                        <div className={styles['avatar-container']}>
                            {user && user.avatar && user.avatar.length > 0 ? (
                                <img style={{ border: '2px solid var(--primary-color)' }} src={user.avatar.startsWith('https') ? user.avatar : `${import.meta.env.VITE_APP_AVATAR_URL}${user.avatar}`} alt={`${import.meta.env.VITE_APP_NAME} avatar`} />
                            ): (
                                <img style={{ border: '2px solid var(--primary-color)' }} src={DefaultAvatar} alt={`${import.meta.env.VITE_APP_NAME} avatar`} />
                            )}
                        </div>
                        <div className="d-flex flex-column justify-content-center ms-2">
                            <p className="m-0 text-dark" style={{ fontFamily: 'sans-serif', fontSize: '13px', textTransform: 'capitalize' }}>{ user && user.fullname }</p>
                            <NavLink to={'/client/upgrade-to-premium'} className={'small text-decoration-none fw-lighter text-success'}>Basic user</NavLink>
                        </div>
                    </div>

                    <div className="d-flex mt-2 p-3 rounded justify-content-between " style={{ border: '1px solid var(--container-border)' }}>
                        <div>
                            <div className="d-flex align-items-center" style={{ color: 'black' }}>
                                <p className="m-0 small">Total Balance</p>
                                { user && user.displayBalance === false ? (
                                    <button type="button" className={`btn btn-normal text-${theme === 'dark' ? 'light' : 'dark'} p-0 ms-2`} onClick={() => handleBalance(true)}><Eye size={18} /></button>
                                ): (
                                    <button type="button" onClick={() => handleBalance(false)} className={`btn btn-normal text-${theme === 'dark' ? 'light' : 'dark'} p-0 ms-2`}><EyeOff size={18} /></button>
                                ) }
                            </div>
                            {/* AMOUNT DISPLAY */}
                            <div>
                                <p className="text-grey fs-3 my-1" style={{ fontFamily: 'sans-serif' }}>{ <CurrencyFormat amount={user?.balance} hidden={!user?.displayBalance} /> }</p>
                            </div>
                            <div>
                                <p className="text-secondary mt-0" style={{ fontFamily: 'sans-serif', fontSize: '11px' }}><span style={{ color: 'var(--primary-color)' }}><i className="bi bi-caret-up-fill me-1"></i>2.4%</span> from last month</p>
                            </div>
                        </div>
                        <div>
                            <Wallet style={{ color: 'var(--primary-color)' }} />
                        </div>
                    </div>

                                
                    {/* NAV LINKS FOR MOBILE MENU */}
                    <div className={`d-flex flex-column mt-2 ${styles['mobile-nav-links']}`} style={{ borderTop: '1px solid var(--container-border)', borderBottom: '1px solid var(--container-border)' }}>
                        {NavLinks && (
                            NavLinks.map((link) => (
                                <NavLink 
                                    to={link.to} 
                                    key={link.id} 
                                    className={({ isActive }) => `d-block text-decoration-none rounded mt-3 p-2 ${isActive ? `${styles['active-link']}`: `${styles['inactive-link']}`}`}
                                    onClick={() => setMobileMenu(false)}
                                >
                                    {link.icon}
                                    <span className="ms-2">{link.title}</span>
                                </NavLink>
                            ))
                        )}
                    </div>

                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0E695C" fill-opacity="1" d="M0,256L13.3,229.3C26.7,203,53,149,80,144C106.7,139,133,181,160,208C186.7,235,213,245,240,245.3C266.7,245,293,235,320,229.3C346.7,224,373,224,400,218.7C426.7,213,453,203,480,197.3C506.7,192,533,192,560,208C586.7,224,613,256,640,256C666.7,256,693,224,720,218.7C746.7,213,773,235,800,208C826.7,181,853,107,880,106.7C906.7,107,933,181,960,224C986.7,267,1013,277,1040,256C1066.7,235,1093,181,1120,138.7C1146.7,96,1173,64,1200,85.3C1226.7,107,1253,181,1280,224C1306.7,267,1333,277,1360,282.7C1386.7,288,1413,288,1427,288L1440,288L1440,320L1426.7,320C1413.3,320,1387,320,1360,320C1333.3,320,1307,320,1280,320C1253.3,320,1227,320,1200,320C1173.3,320,1147,320,1120,320C1093.3,320,1067,320,1040,320C1013.3,320,987,320,960,320C933.3,320,907,320,880,320C853.3,320,827,320,800,320C773.3,320,747,320,720,320C693.3,320,667,320,640,320C613.3,320,587,320,560,320C533.3,320,507,320,480,320C453.3,320,427,320,400,320C373.3,320,347,320,320,320C293.3,320,267,320,240,320C213.3,320,187,320,160,320C133.3,320,107,320,80,320C53.3,320,27,320,13,320L0,320Z"></path></svg>
                    </div>
                </div>
            </section>
        </>
    )
}