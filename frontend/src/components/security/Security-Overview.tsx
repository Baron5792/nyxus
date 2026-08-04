import { ShieldCheck } from 'lucide-react'
import ContainerCss from '../../assets/css/client/Container-Design.module.css'
import { ProgressBar } from '../../utils/Progress-Bar'

export const SecurityOverview = () => {
    return (
        <>
            <div className={`${ContainerCss.container}`}>
                <div className="container-fluid p-0">
                    <div className="row">
                        <div className="col-12 col-md-12 col-lg-8 col-xl-9">
                            <div>
                                {/* overview title */}
                                <div>
                                    <p className='fw-bold mb-0' style={{ fontFamily: 'sans-serif', fontSize: '14px' }}>Security Overview</p>
                                    <p className='m-0 small text-secondary'>Keep your account secure and protected</p>
                                </div>
                                {/* strength indicator */}
                                <div className='mt-3'>
                                    <p className='m-0 small text-secondary' style={{ fontFamily: 'sans-serif', fontSize: '14px' }}>Password Strength: <span className='fw-bold text-success'>Strong</span></p>
                                </div>
                                <ProgressBar level={70} />

                                {/* Security Tips */}
                                <div className='mt-3'>
                                    <p className='m-0 small text-secondary' style={{ fontFamily: 'sans-serif', fontSize: '13px' }}>Last updated: October 10, 2023</p>
                                </div>
                            </div>
                        </div>

                        {/* security check icon */}
                        <div className="col-12 col-md-12 col-lg-4 col-xl-3 mt-2">
                            <div className='text-center'>
                                <ShieldCheck size={100} className='text-success' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}