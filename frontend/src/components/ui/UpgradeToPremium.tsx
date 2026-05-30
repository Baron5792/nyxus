import styles from '../../assets/css/client/UpgradeToPremium.module.css';
import { AppButton } from './Button';
import { Crown } from 'lucide-react';

const UpgradeToPremium = () => {
    return (
        <>
            <div className={`position-absolute`} style={{ bottom: '10px', width: '70%' }}>
                <div className="m-auto">
                    <div className={`${styles['upgrade-to-premium']} d-flex justify-content-between p-3 rounded`}>
                        <div>
                            <p className="m-0" style={{ fontFamily: 'sans-serif', fontSize: '13px', color: 'white' }}>Upgrade to</p>
                            <p style={{ fontFamily: 'sans-serif', color: 'white', fontSize: '16px' }}>Premium</p>
                            <div>
                                <p className="small text-white" style={{ fontFamily: 'sans-serif', fontWeight: 'lighter' }}>Unlock higher limits and exclusive perks.</p>
                            </div>
                            <div>
                                <AppButton type="button" title="Upgrade Now" className="btn btn-outline-success form-control" />
                            </div>
                        </div>
                        
                        <div>
                            <Crown style={{ color: 'gold' }} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpgradeToPremium;