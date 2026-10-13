import css from './../../assets/css/client/Container-Design.module.css'
import { AppButton } from '../ui/Button'
import { Smartphone } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

export const TwoFactorAuth = () => {
    const { theme } = useTheme();
    return (
        <>
            <div className={theme === 'dark' ? css['dark-no_margin'] : css.no_margin}>
                <div className="d-flex d-lg-flex justify-content-between align-items-center">
                    {/* icon and description */}
                    <div className='d-flex align-items-center'>
                        <div>
                            <span className='d-flex align-items-center justify-content-center rounded-circle bg-success' style={{ width: '40px', height: '40px' }}>
                                <Smartphone className='text-white' size={24} />
                            </span>
                        </div>
                        <div className='ms-2'>
                            <p className='m-0' style={{ fontFamily: 'sans-serif', fontSize: '14px' }}>Two-Factor Authentication</p>
                            <p className='m-0 text-secondary' style={{ fontFamily: 'sans-serif', fontSize: '12px' }}>Add an extra layer of security to your account.</p>
                        </div>
                    </div>
                    {/* status and button */}
                    <div className='d-flex align-items-center'>
                        <span style={{ fontFamily: 'sans-serif', fontSize: '12px' }} className='text-muted me-3'></span>
                        <AppButton type='button' className='btn btn-outline-success btn-sm px-2' title="Manage" />
                    </div>
                </div>
            </div>
        </>
    )
}