import { CalendarDays, Fingerprint, Lock, ShieldCheck, UserCheck } from 'lucide-react'
import containerCss from '../../assets/css/client/Container-Design.module.css'
import { useUser } from '../../context/authContext';

export const AccountOverview = () => {
    const { user } = useUser();
    return (
        <>
            <div className={containerCss['container']}>
                {/* title */}
                <div style={{ fontFamily: 'sans-serif', fontSize: '14px' }} className='fw-bold'>
                    <p>Account Overview</p>
                </div>
                <div>
                    <div className="d-flex text-secondary mb-1">
                        <span>
                            <Lock size={18} />
                        </span>
                        <div style={{ fontFamily: 'sans-serif', fontSize: '14px' }} className='ms-2'>
                            <p className='mb-0'>Account Type</p>
                            <p className='m-0'>{user && user.accountType} Member</p>
                        </div>
                    </div>

                    <div className="d-flex align-items-center text-secondary mb-1">
                        <span>
                            <UserCheck size={18} />
                        </span>
                        <div style={{ fontFamily: 'sans-serif', fontSize: '14px' }} className='ms-2'>
                            <span className='mb-0'>Account Type</span>
                            <span className={`ms-2 p-1 small ${user && user.status === 'active' ? 'bg-success': 'bd-danger'} text-white rounded`}>{user && user.status}</span>
                        </div>
                    </div>

                    <div className="d-flex align-items-center text-secondary mb-1">
                        <span>
                            <ShieldCheck size={18} />
                        </span>
                        <div style={{ fontFamily: 'sans-serif', fontSize: '14px' }} className='ms-2'>
                            <span className='mb-0'>KYC status</span>
                            <span className={`ms-2 p-1 small ${user && user.kycStatus === 'verified' ? 'bg-success': 'bd-danger'} text-white rounded`}>{user && user.status}</span>
                        </div>
                    </div>

                    <div className="d-flex text-secondary mb-1">
                        <span>
                            <CalendarDays size={18} />
                        </span>
                        <div style={{ fontFamily: 'sans-serif', fontSize: '14px' }} className='ms-2'>
                            <p className='mb-0'>Member since</p>
                            <p className='m-0'>{new Date(user?.createdAt).toLocaleDateString()}</p>
                        </div>
                    </div>

                    <div className="d-flex text-secondary mb-1">
                        <span>
                            <Fingerprint size={18} />
                        </span>
                        <div style={{ fontFamily: 'sans-serif', fontSize: '14px' }} className='ms-2'>
                            <p className='mb-0'>Account ID</p>
                            <p className='m-0'>{`${import.meta.env.VITE_APP_NAME}-${user && user.accountId}`}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}