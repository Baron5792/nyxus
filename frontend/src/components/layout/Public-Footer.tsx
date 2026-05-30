import { NavLink } from 'react-router-dom';
import LogoLight from '../../assets/images/logo/logo.png';
import { Mail, Phone, MapPin } from 'lucide-react';    
import styles from '../../assets/css/public/PublicFooter.module.css';

export const PublicFooter = () => {
    const MediaLinks = [
        { id: '1', icon: 'facebook', url: `${import.meta.env.VITE_APP_FACEBOOK_URL}` },
        { id: '2', icon: 'twitter', url: `${import.meta.env.VITE_APP_TWITTER_URL}` },
        { id: '3', icon: 'linkedin', url: `${import.meta.env.VITE_APP_LINKEDIN_URL}` },
        { id: '4', icon: 'instagram', url: `${import.meta.env.VITE_APP_INSTAGRAM_URL}` },
    ]

    const FooterLinks = [
        { id: 'home', title: 'Home', path: '/', effect: false },
        { id: 'about us', title: 'About Us', path: '/about-us', effect: false },
        { id: 'service', title: 'Services', path: '/service', effect: true },
        { id: 'assets plan', title: 'Assets Plan', path: '/assets-plan', effect: false },
        { id: 'faqs', title: 'FAQs', path: '/faqs', effect: false },
        { id: 'get support', title: 'Get Support', path: '/get-support', effect: false },
    ]

    const ServiceLinks = [
        { id: 'forex', title: 'Forex', path: '/service/forex' },
        { id: 'Agriculture', title: 'Agriculture', path: '/service/agriculture' },
        { id: 'oil and gas', title: 'Oil and Gas', path: '/service/oil-and-gas' },
        { id: 'real estate', title: 'Real Estate', path: '/service/real-estate' },
        { id: 'retirement and insurance services', title: 'Retirement and Insurance Services', path: '/service/retirement-and-insurance-services' },
        { id: 'gold', title: 'Gold', path: '/service/gold' }
    ]
    return (
        <>
            <footer className={styles.footer}>
                <div className="container">
                    <div className="row gy-4">
                        {/* Brand & Mission */}
                        <div className="col-lg-4 col-md-6">
                            <NavLink to="/">
                                <img src={LogoLight} alt={`${import.meta.env.VITE_APP_NAME} Logo`} className={styles.footerLogo} />
                            </NavLink>
                            <p className={styles.brandText}>
                                Empowering investors with secure, transparent, and innovative asset management solutions across global markets.
                            </p>
                            <div className={styles.socialLinks}>
                                {MediaLinks.map((link) => (
                                    <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer">
                                        <i className={`bi bi-${link.icon}`}></i>
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="col-lg-2 col-md-6">
                            <h5 className={styles.footerHeading}>Platform</h5>
                            <ul className={styles.footerLinks}>
                                {FooterLinks.map((link) => (
                                    <li key={link.id}>
                                        <NavLink to={link.path}>{link.title}</NavLink>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Services */}
                        <div className="col-lg-3 col-md-6">
                            <h5 className={styles.footerHeading}>Services</h5>
                            <ul className={styles.footerLinks}>
                                {ServiceLinks.map((link) => (
                                    <li key={link.id}>
                                        <NavLink to={link.path}>{link.title}</NavLink>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div className="col-lg-3 col-md-6">
                            <h5 className={styles.footerHeading}>Contact Us</h5>
                            <ul className={styles.contactList}>
                                <li><Mail size={16} /> {import.meta.env.VITE_APP_SUPPORT_EMAIL}</li>
                                <li><Phone size={16} /> {import.meta.env.VITE_APP_PHONE_NUMBER}</li>
                                <li><MapPin size={16} /> {import.meta.env.VITE_APP_ADDRESS}</li>
                            </ul>
                        </div>
                    </div>

                    <hr className={styles.divider} />

                    {/* Legal & Copyright */}
                    <div className={styles.footerBottom}>
                        <div className="row align-items-center">
                            <div className="col-md-6 text-center text-md-start">
                                <p className="mb-0">© {new Date().getFullYear()} {import.meta.env.VITE_APP_NAME}. All rights reserved.</p>
                            </div>
                            <div className="col-md-6 text-center text-md-end">
                                <ul className={styles.legalLinks}>
                                    <li><NavLink to="/privacy-policy">Privacy Policy</NavLink></li>
                                    <li><NavLink to="/terms-of-service">Terms of Service</NavLink></li>
                                </ul>
                            </div>
                        </div>
                        {/* Financial Disclaimer - Crucial for Nyxus */}
                        <div className={styles.disclaimer}>
                            <p>
                                <strong className='fw-bold me-1'>FRAUD ALERT:</strong> Beware of fraudulent platforms and social media groups impersonating NYXUS. We do not operate through third-party agents. To guarantee the safety of your assets, only perform transactions directly within your official {import.meta.env.VITE_APP_NAME} account dashboard.
                            </p>
                        </div>
                    </div>

                    <div className='text-center mt-4'>
                        <p className='small text-secondary'>v{import.meta.env.VITE_APP_VERSION}</p>
                    </div>
                </div>
            </footer>
        </>
    )
}