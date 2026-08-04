import { useEffect } from "react";
import { useOutletContext } from "react-router-dom"
import { BalanceOverview } from "../../components/dashboard/BalanceOverview";
import { VirtualCard } from "../../components/dashboard/VirtualCard";
import { QuickActions } from "../../components/dashboard/QuickActions";
import { RecentInvestedAndReturns } from "../../components/dashboard/Recent-Returns";
import InvestmentGraph from "../../components/dashboard/InvestmentPerformance";
import { RecentTransactions } from "../../components/dashboard/Recent-Transactions";
import IntroImg from '../../assets/images/dashboard/intro.png'
import TradingWidget from "../public/home/Trading-Widget";
import { useUser } from "../../context/authContext";

interface DashboardOutletProps {
    setPageTitle: (title: string) => void;
}

export const Dashboard = () => {
    const { setPageTitle } = useOutletContext<DashboardOutletProps>();
    useEffect(() => {
        setPageTitle('Dashboard');
        document.title = `Dashboard - ${import.meta.env.VITE_APP_NAME}`;
    }, [setPageTitle]);

    const myData = [
        { timestamp: '2026-01-01', type: 'DEPOSIT', amount: 5000.00 },
        { timestamp: '2026-01-15', type: 'EARNINGS', amount: 300.00 },
        { timestamp: '2026-02-01', type: 'WITHDRAWAL', amount: 1000.00 },
    ];

    const { user } = useUser();

    return (
        <>
            <div className="row">
                {/* first row */}
                <div className="col-12 col-md-12 col-lg-6 col-xl-6">
                    <div className="row">
                        {/* balance overview */}
                        <div className="col-12 col-md-12 col-lg-12 col-xl-12">
                            <BalanceOverview />
                        </div>
                        

                        {/* Quick Actions */}
                        <div className="col-12 col-md-12 col-lg-12 col-xl-12 d-none d-md-none d-lg-block d-xl-block">
                            <QuickActions />
                        </div>

                        <div className="col-12 col-md-12 col-lg-12 col-xl-12 d-block d-md-block d-lg-none d-xl-none">
                            <VirtualCard 
                                cardHolderName={user && user.fullname} 
                                cardNumber={user && user.cardNumber}
                                cvcNumber={user && user.cvcNumber}
                                expiryDate={user && user.expiryDate}
                                cardType={user && user.cardType}
                            />
                        </div>
                        
                        {/* Quick Actions for mobile */}
                        <div className="col-12 col-md-12 col-lg-12 col-xl-12 d-block d-md-block d-lg-none d-xl-none">
                            <QuickActions />
                        </div>

                        {/* Investment Performance */}
                        <div className="col-12 col-md-12 col-lg-12 col-xl-12">
                            <InvestmentGraph transactions={myData} />
                        </div>

                        {/* Trading Widget */}
                        <TradingWidget />
                    </div>
                </div>


                {/* second row */}
                <div className="col-12 col-md-12 col-xl-6 col-lg-6">
                    <div className="row">
                        {/* virtual card display */}
                        <div className="col-12 col-md-12 col-lg-10 col-xl-10 d-none d-md-none d-lg-block d-xl-block">
                            <VirtualCard 
                                cardHolderName={user && user.fullname} 
                                cardNumber={user && user.cardNumber}
                                cvcNumber={user && user.cvcNumber}
                                expiryDate={user && user.expiryDate}
                                cardType={user && user.cardType}
                            />
                        </div>

                        {/* Total Enquiries */}
                        <div className="col-12 col-md-12 col-lg-12 col-xl-12">
                            <RecentInvestedAndReturns />
                        </div>

                        {/* Recent Transactions */}
                        <div className="col-12 col-md-12 col-lg-12 col-xl-">
                            <RecentTransactions />
                        </div>

                        {/* Image ending dashboard */}
                        <div className="col-12 col-md-12 col-lg-12 col-xl-12">
                            <img src={IntroImg} alt={`Invest on - ${import.meta.env.VITE_APP_NAME}`} className="w-100" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}