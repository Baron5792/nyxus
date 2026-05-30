import { NavLink } from 'react-router-dom';
import LogoLight from '../../assets/images/logo/logo.png';
import LogoDark from '../../assets/images/logo/logo-dark.png';
import { LinkButtons } from '../ui/LinkButtons';
import React, { useEffect } from 'react';
import { GripVertical } from 'lucide-react';
import { Dropdown } from 'react-bootstrap';
import styles from '../../assets/css/public/Home.module.css';

export const PublicHeader = () => {
    const DesktopLinStyling : React.CSSProperties = {
        fontFamily: 'sans-serif',
        color: '#ffffff',
        fontSize: '14px'
    }

    const HeaderLinks = [
        { id: 'home', title: 'Home', path: '/', effect: false },
        { id: 'about us', title: 'About Us', path: '/about-us', effect: false },
        { id: 'service', title: 'Services', path: '/service', effect: true },
        { id: 'assets plan', title: 'Assets Plan', path: '/assets-plan', effect: false },
        { id: 'faqs', title: 'FAQs', path: '/faqs', effect: false },
        { id: 'get support', title: 'Get Support', path: '/get-support', effect: false },
    ]

    const MobileHeaderLinks = [
        { id: 'home', title: 'Home', path: '/', effect: false },
        { id: 'about us', title: 'About Us', path: '/about-us', effect: false },
        { id: 'service', title: 'Services', path: '/service', effect: true },
        { id: 'assets plan', title: 'Assets Plan', path: '/assets-plan', effect: false },
        { id: 'faqs', title: 'FAQs', path: '/faqs', effect: false },
        { id: 'get support', title: 'Get Support', path: '/get-support', effect: false },
        { id: 'create account', title: 'Create New Account', path: '/auth/register', effect: false },
        { id: 'go to account', title: 'Go to your account', path: '/auth/login', effect: false }
    ]

    const ServiceLinks = [
        { id: 'forex', title: 'Forex', path: '/service/forex' },
        { id: 'Agriculture', title: 'Agriculture', path: '/service/agriculture' },
        { id: 'oil and gas', title: 'Oil and Gas', path: '/service/oil-and-gas' },
        { id: 'real estate', title: 'Real Estate', path: '/service/real-estate' },
        { id: 'retirement and insurance services', title: 'Retirement and Insurance Services', path: '/service/retirement-and-insurance-services' },
        { id: 'gold', title: 'Gold', path: '/service/gold' }
    ]

    const [mobileServiceOpen, setMobileServiceOpen] = React.useState(false);
    const openServicesOnMobile = () => {
        setMobileServiceOpen(!mobileServiceOpen);
    }

    const [scrolled, setScrolled] = React.useState(false);
    
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        }

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [])

    return (
        <>
            <header className={`container-fluid w-100 transition-all ${scrolled ? 'fixed-top bg-white top-30': 'fixed-top bg-transparent'}`} style={{ zIndex: 999 }}>
                <nav className='container'>
                    <div className="row py-2">
                        {/* logo */}
                        <div className='col-8 col-lg-3 col-xl-3'>
                            <div style={{ width: '40%' }} className='border-none'>
                                <NavLink to={'/'}>
                                    <img src={scrolled ? LogoDark : LogoLight} alt={`${import.meta.env.VITE_APP_NAME} logo`} className=' border-none' style={{ width: '100%', height: '40px' }} />
                                </NavLink>
                            </div>
                        </div>

                        {/* nav links for desktop */}
                        <div className='d-none d-md-none d-lg-block d-xl-block col-lg-9 col-xl-9'>
                            <div className={`d-none d-md-none d-lg-flex justify-content-between align-items-center`}>
                                {/* render desktop links */}
                                { HeaderLinks.map((link) => (
                                    <div 
                                        key={link.id} 
                                        className={`${styles['show-dropdown']} position-relative d-lg-inline-block d-xl-inline-block`}
                                    >
                                        <NavLink 
                                            to={link.path}  
                                            className={({ isActive }) => `${isActive ? `text-decoration-none` : `text-decoration-none`}`} style={ scrolled ? {
                                                'color': '#000',
                                                'fontFamily': 'sans-serif',
                                                'fontSize': '14px'
                                            }: DesktopLinStyling }
                                        >
                                            {link.title} 
                                            {link.effect ? (
                                                <span className='bi bi-caret-down-fill ms-1' style={{ fontSize: '10px' }}></span>
                                            ): null}
                                        </NavLink>

                                        {/* dropdown for service link */}
                                        {link.effect && (
                                            <div className={`${styles['dropdown-content']} shadow`}>
                                                {ServiceLinks && (
                                                    ServiceLinks.map((links) => (
                                                        <NavLink to={links.path} className={'d-block text-decoration-none'} key={links.id}>{links.title}</NavLink>
                                                    ))
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )) }

                                {/* create account and go to your account route */}
                                <LinkButtons 
                                    to='/auth/register'
                                    title='Create New Account'
                                    classname='btn btn-success rounded-0'
                                    style={{ fontFamily: 'sans-serif', fontSize: '14px' }}
                                />

                                <LinkButtons 
                                    to='/auth/login'
                                    title='Go to your account'
                                    classname={`btn btn-${scrolled ? 'outline-dark text-dark' : 'light'} border rounded-0 border-dark`}
                                    style={{ fontFamily: 'sans-serif', color: '#000', fontSize: '14px' }}
                                />
                            </div>
                        </div>

                        {/* mobile menu button */}
                        <div className="col-3 d-lg-none d-xl-none d-lg-none d-md-block">
                            <Dropdown>
                                <Dropdown.Toggle variant='normal' className={`padding-0 mt-2 text-${scrolled ? 'dark' : 'light'} ${styles['dropdown-toggle']} float-end`} style={{ padding: '0px' }}>
                                    <GripVertical strokeWidth={2} />
                                </Dropdown.Toggle>
                                <Dropdown.Menu className={`${styles['full-width-menu']} shadow-none ${styles['dropdown-animate']}`} renderOnMount={true}>
                                    { MobileHeaderLinks && (
                                        MobileHeaderLinks.map((link) => (
                                            <div key={link.id}>
                                                <div className={`d-flex align-items-center justify-content-around ${styles['sub_mobile_title']}`}>
                                                    <NavLink to={link.path} className={({ isActive }) => `d-block text-decoration-none ${isActive ? styles['activeMobileLink']: styles['notActiveMobileLink']}`}>
                                                        {link.title} 
                                                    </NavLink>
                                                    {link.effect && link.title === 'Services' && (
                                                        <span className={`bi bi-${mobileServiceOpen ? `caret-up`: `caret-down`} ms-2 small mt-1`} style={{ cursor: 'pointer' }} onClick={(event) => {
                                                            if (link.title === 'Services') {
                                                                event.preventDefault();
                                                                openServicesOnMobile();
                                                            }
                                                        }}></span>
                                                    )}
                                                    
                                                </div>
                                                
                                                {mobileServiceOpen && link.title === 'Services' && (
                                                    <div className={`${styles['sub_mobile_services']}`}>
                                                        {ServiceLinks && (
                                                            ServiceLinks.map((links) => (
                                                                <NavLink to={links.path} className={'d-block text-decoration-none'} key={links.id}>- {links.title}</NavLink>
                                                            ))
                                                        )}  
                                                    </div>
                                                )}
                                            </div>
                                        ))
                                    )}
                                    
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    )
}