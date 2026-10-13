import { CheckCheck, Copy } from 'lucide-react';
import styles from '../../assets/css/client/Container-Design.module.css';
import { useUser } from '../../context/authContext';
import { useTheme } from '../../context/ThemeContext';
import { toast } from 'sonner';
import { useState } from 'react';

export const Referral = () => {
    const { theme } = useTheme();
    const { user } = useUser();

    const [copied, setCopied] = useState(false);
    const copyReferralCode = async() => {
        const refLink = `${import.meta.env.VITE_APP_DOMAIN_URL}/auth/register?referralid=${user.referralCode}`
        try {
            await navigator.clipboard.writeText(refLink);
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
            }, 2000);
        }

        catch (e) {
            toast.error('Copy failed. Try again or select the link and copy it manually.', {id: 'something-error'});
        }
    }
    return (
        <>
            <div className={theme === 'dark' ? styles['dark-container'] : styles['container']}>
                <div>
                    <p style={{ fontSize: '14px', fontFamily: 'Arial, sans-serif' }} className="text-dark">Refer and earn from your referral's deposits.</p>
                </div>
                <div className='d-flex align-items-center'>
                    <p className='text-dark fs-4'>{`${import.meta.env.VITE_APP_DOMAIN_URL}/auth/register?referralid=${user.referralCode}`}</p>
                    <button type="button" className='btn btn-normal' onClick={copyReferralCode}>
                        {copied ? <CheckCheck color='green' /> : <Copy /> }
                    </button>
                </div>
            </div>
        </>
    )
}