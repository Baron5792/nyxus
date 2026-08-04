import { Fingerprint } from 'lucide-react'
import css from './../../assets/css/client/Container-Design.module.css'

export const ChangePassword = () => {
    return (
        <>
            <div className={css.no_margin}>
                <div className="d-lg-flex d-block align-items-center-justify-content-between">
                    {/* icon and description */}
                    <div className='d-flex align-items-center'>
                        <div>
                            <p>
                                <Fingerprint className='text-success' size={24} />
                            </p>
                        </div>
                        <div className='ms-2'>
                            <p className='m-0' style={{ fontFamily: 'sans-serif', fontSize: '15px', fontWeight: 'bold' }}>Password</p>
                            <p className='m-0' style={{ fontFamily: 'sans-serif', fontSize: '14px' }}>Update your password regularly to keep your account secure.</p>
                        </div>
                    </div>
                    {/* status and button */}
                    <div className='d-flex align-items-center '>
                        <span>lorem</span>
                    </div>
                </div>
            </div>
        </>
    )
}