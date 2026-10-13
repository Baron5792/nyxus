import ContainerCss from '../../assets/css/client/Container-Design.module.css';
import { TokenBTC } from '@web3icons/react';
import { useTheme } from '../../context/ThemeContext';
export const Deposit = () => {
    const { theme } = useTheme();
    return (
        <>
            <div className="row">
                <div className="col-12 col-lg-8">
                    <div className={ContainerCss['container']}>
                        <div className="mx-3" style={{ fontFamily: 'sans-serif' }}>
                            <p style={{ fontSize: '18px', color: theme === 'dark' ? 'white' : 'black' }} className="mb-0">Choose a payment method</p>
                            <p className="mt-0 text-secondary" style={{ fontSize: '13px' }}>Select a cryptocurrency to fund your account. You can use one method per transaction.</p>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-lg-4">

                </div>
            </div>
        </>
    )
}