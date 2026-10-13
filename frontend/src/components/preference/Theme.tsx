import css from './../../assets/css/client/Container-Design.module.css'
import { useTheme } from '../../context/ThemeContext'

export const Theme = () => {
    const { theme, toggleTheme } = useTheme();
    return (
        <>
            <div className={theme === 'dark' ? css['dark-no_margin'] : css.no_margin}>
                <div className="d-block d-lg-flex justify-content-between align-items-center">
                    {/* icon and description */}
                    <div className='d-flex align-items-center'>
                        <div className='ms-2'>
                            <p className='m-0' style={{ fontFamily: 'sans-serif', fontSize: '14px' }}>Theme</p>
                            <p className='m-0 text-secondary' style={{ fontFamily: 'sans-serif', fontSize: '12px' }}>Choose your preferred theme.</p>
                        </div>
                    </div>
                    {/* status and button */}
                    <div className='d-block align-items-center'>
                        <span style={{ fontFamily: 'sans-serif', fontSize: '12px' }} className='text-muted me-3'></span>
                        <button onClick={toggleTheme} className='btn btn-normal btn-sm text-secondary'>
                            {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}