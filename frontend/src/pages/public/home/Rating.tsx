import { CheckCircle, Fingerprint, Globe } from 'lucide-react';
import ClientRating from '../../../assets/images/rating/client.svg';
import CommunicationRating from '../../../assets/images/rating/communication.svg';
import ScrollFadeIn from '../../../components/ui/FadeIn';
import { NyxusHeading } from '../../../components/ui/NyxusTitle';

export const Rating = () => {
    const RatingItems = [
        { id: 'client rating', title: 'Clients Rating', icon: ClientRating },
        { id: 'communication rating', title: 'Communication Rating', icon: CommunicationRating },
        { id: 'payment experience rating', title: 'Payment Experience Rating', icon: ClientRating }
    ]

    const Steps = [
        { id: 'million users', title: '150m+ users globally', icon: <Globe strokeWidth={1} size={30} />, subText: `Trusted by investors around the world since ${import.meta.env.VITE_APP_START_DATE}` },
        { id: 'sign up', title: 'Sign up in minutes', icon: <CheckCircle strokeWidth={1} size={30} />, subText: `Set up your account and begin trading in a few steps` },
        { id: 'zero fee', title: 'Zero-fee deposits', icon: <Fingerprint strokeWidth={1} size={30} />, subText: 'Fund your wallet at no cost' }
    ]
    return (    
        <>
            <div className={`container-fluid py-5`}>
                <div className="container">
                    <div className="rating-title text-center">
                        {/* <p className="fw-bold" style={{ fontFamily: 'sans-serif', fontSize: '30px' }}></p> */}
                        <ScrollFadeIn>
                            <NyxusHeading 
                                title='Built for wealth, made for everyone'
                                align='center'
                            />
                        </ScrollFadeIn>
                    </div>
                    <div className="row">
                        {RatingItems && (
                            RatingItems.map((item) => (
                                <div className="col-12 col-md-12 col-lg-4 col-xl-4 mt-3 mb-4 text-center" key={item.id}>
                                    <div className="d-flex align-items-center">
                                        <img src={item.icon} alt="" />
                                        <p style={{ fontFamily: 'sans-serif', fontWeight: 'lighter', fontSize: '20px' }} className='ms-4'>{item.title}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
                <div className="container my-4">
                    {Steps && (
                        <ScrollFadeIn>
                            <div className="row">
                                {Steps.map((steps) => (
                                    <div className="col-12 col-md-6 col-lg-4 col-xl-4 mb-2" key={steps.id}>
                                        <div className="p-5 rounded shadow">
                                            <div>
                                                {steps.icon}
                                            </div>
                                            <div style={{ fontFamily: 'sans-serif', fontSize: '27px', fontWeight: '600' }} className='mt-3'>
                                                {steps.title}
                                            </div>
                                            <div className='mt-5 text-secondary' style={{ fontFamily: 'sans-serif' }}>
                                                {steps.subText}.
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollFadeIn>
                    )}
                </div>
            </div>


            
        </>
    )   
}