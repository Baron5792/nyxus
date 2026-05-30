import { Outlet, useNavigate, NavLink } from "react-router-dom"
import styles from '../../assets/css/public/Account.module.css'
import Logo from '../../assets/images/logo/logo-dark.png';
import ScrollFadeIn from "../ui/FadeIn";
import { GoogleButton } from "../ui/GoogleSignIn";
import { toast } from "sonner";

export const AccountLayout = () => {
    const navigate = useNavigate();
    const navigateToPrevious = () => {
        navigate(-1);
    }

    const NavLinks = [
        { id: '1', title: 'About Us', to: '/about-us' },
        { id: '2', title: 'FAQs', to: '/faqs' },
        { id: '3', title: 'Get Support', to: '/get-support' }
    ] 

    const handleGoogleSignIn = () => {
        toast.info('Google Sign-In is currently unavailable. Please try again later.', {
            description: 'We are working to integrate Google Sign-In. Stay tuned for updates!',
            id: 'google-sign-in-unavailable'
        });
    }
    return (
        <>
            {/* Intro section */}
            <div className="container-fluid p-4">
                <div className="row g-0">
                    <section className="col-12 col-md-12 col-lg-8 col-xl-8">
                        <div className={`d-flex flex-column ${styles['account-layout']}`}>
                            <div className="sticky-top">
                                {/* back button here */}
                                <button type="button" className="btn btn-outline-light text-dark btn-md" style={{ fontFamily: 'sans-serif', fontSize: '14px' }} onClick={navigateToPrevious}>
                                    ← Back
                                </button>
                            </div>

                            <div className="d-none d-md-none d-lg-flex flex-grow-1 d-flex flex-column justify-content-center py-5">
                                <div className={styles['logo']}>
                                    <NavLink to={'/'}>
                                        <img src={Logo} alt={`${import.meta.env.VITE_APP_NAME} Logo`} className="w-100" />
                                    </NavLink>
                                </div>
                                <div className="w-50 text-secondary">
                                    <ScrollFadeIn>
                                        <p>Empowering your investment journey with transparent asset management and innovative trading solutions. Enter your credentials to continue to your secure dashboard.</p>
                                    </ScrollFadeIn>
                                </div>
                            </div>

                            <div className="d-none d-md-none d-lg-block sticky-bottom">
                                <div>
                                    {NavLinks.map((link) => (
                                        <NavLink key={link.id} className={'text-decoration-none me-3 text-secondary'} style={{ fontFamily: 'sans-serif', fontSize: '13px' }} to={link.to}>
                                            {link.title}
                                        </NavLink>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Form section */}
                    <section className="col-12 col-md-12 col-lg-4 col-xl-4 justify-content-center my-4">
                        {/* login or register title intro */}
                        <div>
                            <p className="fw-bold fs-3 text-center" style={{ fontFamily: 'sans-serif' }}>Register or Login</p>
                            <p className="text-center text-muted small" style={{ fontFamily: 'sans-serif' }}>Enter your credentials to continue to your secure dashboard.</p>
                        </div>

                        <div>
                            <GoogleButton onClick={handleGoogleSignIn} />
                        </div>

                        <div className={styles.dividerContainer}>
                            <span>OR</span>
                        </div>
                        <ScrollFadeIn>
                            <Outlet />
                        </ScrollFadeIn>
                    </section>
                </div>
            </div>

        </>
    )
}