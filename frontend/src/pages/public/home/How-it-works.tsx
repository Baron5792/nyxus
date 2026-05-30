import { LineChart, TrendingUp, UserPlus, Wallet } from "lucide-react"
import { NyxusHeading } from "../../../components/ui/NyxusTitle"
import styles from './../../../assets/css/public/How-it-works.module.css'
import ScrollFadeIn from "../../../components/ui/FadeIn"

export const HowItWorks = () => {
    const steps = [
        { id: 'create account', title: 'Create your Account', icon: <UserPlus strokeWidth={2} size={35} />, desc: 'Sign up in minutes and set up your secure Nyxus account to begin your investment journey.' },
        { id: 'fund wallet', title: 'Fund your Wallet', icon: <Wallet strokeWidth={2} size={35} />, desc: 'Deposit funds and securely using trusted payment methods to power your investments.' },
        { id: 'Start Investing', title: 'Start Investing', icon: <TrendingUp strokeWidth={2} size={35} />, desc: 'Explore smart investment opportunities and put your capital to work with confidence.' },
        { id: 'track growth', title: 'Track your Growth', icon: <LineChart strokeWidth={2} size={35} />, desc: 'Monitor your portfolio performance in real-time and watch your wealth grow over time.' },
    ]

    return (
        <>
            <NyxusHeading
                title="How it Works"
                align="center"
            />

            <div className={`container-fluid py-5 my-5 ${styles['bg-color']}`}>
                <div className="container-fluid">
                    <div className="row g-4">
                        {steps && (
                            steps.map((step, index) => (
                                <div className={`col-12 col-md-6 col-lg-3 col-xl-3`} key={step.id}>
                                    <div className={`rounded p-5 mt-${index + 2}`} style={{ backgroundColor: '#0D172B', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
                                        <div>
                                            <span style={{ color: '#343E50' }}>{step.icon}</span>
                                        </div>
                                        <div className="mt-3">
                                            <p className="fs-4 text-white" style={{ fontFamily: 'sans-serif' }}>{step.title}</p>
                                        </div>
                                        <div>
                                            <ScrollFadeIn>
                                                <p className="text-secondary" style={{ fontFamily: 'sans-serif', fontSize: '14px' }}>{step.desc}</p>
                                            </ScrollFadeIn>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}