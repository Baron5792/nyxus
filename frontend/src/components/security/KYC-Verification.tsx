import { BadgeCheck } from 'lucide-react'
import css from './../../assets/css/client/Container-Design.module.css'
import { AppButton } from '../ui/Button'
import { useTheme } from '../../context/ThemeContext'
export const Verification = () => {
    const { theme } = useTheme();   
    return (
        <>
            <div className={theme === 'dark' ? css['dark-no_margin']: css.no_margin}>
                <div className="d-block d-lg-flex d-block align-items-center justify-content-between">
                    {/* icon and description */}
                    <div className='d-flex align-items-center'>
                        <div>
                            <span className='d-flex align-items-center justify-content-center rounded-circle bg-success' style={{ width: '40px', height: '40px' }}>
                                <BadgeCheck className='text-white' size={24} />
                            </span>
                        </div>
                        <div className='ms-2'>
                            <p className='m-0' style={{ fontFamily: 'sans-serif', fontSize: '14px', fontWeight: '' }}>KYC Verification</p>
                            <p className='m-0 text-secondary' style={{ fontFamily: 'sans-serif', fontSize: '12px' }}>Verify your identity to keep your account secure and unlock all Nyxus features.</p>
                        </div>
                    </div>
                    {/* status and button */}
                    <div className='d-flex align-items-center '>
                        <AppButton type='button' className='btn btn-outline-success btn-sm px-2' title="Verify Account" />
                    </div>
                </div>
            </div>
        </>
    )
}