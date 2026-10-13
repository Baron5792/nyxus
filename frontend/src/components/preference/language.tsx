import { useTheme } from '../../context/ThemeContext'
import GoogleTranslateCustom from '../../utils/Translator'
import css from './../../assets/css/client/Container-Design.module.css'

export const Language = () => {
    const { theme } = useTheme();
    return (
        <>
            <div className={theme === 'dark' ? css['dark-no_margin'] : css.no_margin}>
                <div className="d-block d-lg-flex justify-content-between align-items-center">
                    {/* icon and description */}
                    <div className='d-flex align-items-center'>
                        <div className='ms-2'>
                            <p className='m-0' style={{ fontFamily: 'sans-serif', fontSize: '14px' }}>Language</p>
                            <p className='m-0 text-secondary' style={{ fontFamily: 'sans-serif', fontSize: '12px' }}>Manage your preferred language settings for the platform.</p>
                        </div>
                    </div>
                    {/* status and button */}
                    <div className='d-block align-items-center'>
                        <span style={{ fontFamily: 'sans-serif', fontSize: '12px' }} className='text-muted me-3'></span>
                        <GoogleTranslateCustom textColor={true} />
                    </div>
                </div>
            </div>
        </>
    )
}