import { useState } from 'react';
import Dropdown from '../ui/Dropdown'
import css from './../../assets/css/client/Container-Design.module.css'
import { useTheme } from '../../context/ThemeContext';
import { useUser } from '../../context/authContext';

export const Currency = () => {
    const CurrencyOptions = [
        { label: 'USD', value: 'USD', flag: 'us' },
        { label: 'EUR', value: 'EUR', flag: 'eu' },
        { label: 'GBP', value: 'GBP', flag: 'gb' },
        { label: 'JPY', value: 'JPY', flag: 'jp' },
    ];

    const { theme } = useTheme();
    const { user } = useUser();
    const [select, setSelect] = useState("");   
    return (
        <>
            <div className={theme === 'dark' ? css['dark-no_margin'] : css.no_margin}>
                <div className="d-block d-lg-flex justify-content-between align-items-center">
                    {/* icon and description */}
                    <div className='d-flex align-items-center'>
                        <div className='ms-2'>
                            <p className='m-0' style={{ fontFamily: 'sans-serif', fontSize: '14px' }}>Currency</p>
                            <p className='m-0 text-secondary' style={{ fontFamily: 'sans-serif', fontSize: '12px' }}>Choose your preferred currency for transactions and reports.</p>
                        </div>
                    </div>
                    {/* status and button */}
                    <div className='d-block align-items-center'>
                        <span style={{ fontFamily: 'sans-serif', fontSize: '12px' }} className='text-muted me-3'></span>
                        <Dropdown options={CurrencyOptions} placeholder='Select Currency' value={user?.Currency || 'USD'} onChange={setSelect} />
                    </div>
                </div>
            </div>
        </>
    )
}