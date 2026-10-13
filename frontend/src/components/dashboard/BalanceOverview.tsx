import { Eye, EyeOff, Wallet } from 'lucide-react';
import styles from '../../assets/css/client/Container-Design.module.css';
import { useUser } from '../../context/authContext';
import { FormatBalance } from '../../utils/Balance';
import { HandleBalanceDisplay } from '../../service/HandleBalanceDisplay';
import { toast } from 'sonner';
import { useTheme } from '../../context/ThemeContext';
import { CurrencyFormat } from '../ui/CurrencyFormat';

export const BalanceOverview = () => {
    const { user, refreshUser } = useUser();

    const handleBalanceview = async(value: boolean) => {
        try {
            const request = await HandleBalanceDisplay(value);
            if (request.success === false) {
                toast.error(request.message || 'Something went wrong', {id: 'request-error'});
                return false;
            }
            refreshUser();
        }

        catch (error) {
            toast.error('Something went wrong', {id: 'something-error'});
        }
    }

    const { theme } = useTheme();
    return (
        <>
            <div className={theme === 'dark' ? styles['dark-container'] : styles['container']}>
                <div className="d-flex align-items-center justify-content-between">
                    <div>
                        <div className="d-flex align-items-center" style={{ color: 'black' }}>
                            <p className="m-0 small">Total Balance</p>
                            {user && user.displayBalance === false ? (
                                <button type="button" className="btn btn-normal text-secondary p-0 ms-2" onClick={() => handleBalanceview(true)}><Eye size={18} /></button>
                            ): (
                                <button type="button" className="btn btn-normal text-secondary p-0 ms-2" onClick={() => handleBalanceview(false)}><EyeOff size={18} /></button>
                            )}
                        </div>
                        <div>
                            <p className="text-dark fs-2 my-1" style={{ fontFamily: 'sans-serif' }}>{<CurrencyFormat amount={user?.balance} hidden={!user?.displayBalance} />}</p>
                        </div>
                        <div>
                            <p className="text-secondary mt-0" style={{ fontFamily: 'sans-serif', fontSize: '13px' }}><span style={{ color: 'var(--primary-color)' }}><i className="bi bi-caret-up-fill me-1"></i>2.4%</span> from last month</p>
                        </div>
                    </div>
                    <div>
                        <Wallet style={{ color: 'var(--primary-color)' }} />
                    </div>
                </div>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0E695C" fill-opacity="1" d="M0,0L8.3,26.7C16.6,53,33,107,50,117.3C66.2,128,83,96,99,96C115.9,96,132,128,149,128C165.5,128,182,96,199,80C215.2,64,232,64,248,53.3C264.8,43,281,21,298,21.3C314.5,21,331,43,348,48C364.1,53,381,43,397,53.3C413.8,64,430,96,447,128C463.4,160,480,192,497,170.7C513.1,149,530,75,546,42.7C562.8,11,579,21,596,37.3C612.4,53,629,75,646,112C662.1,149,679,203,695,224C711.7,245,728,235,745,234.7C761.4,235,778,245,794,256C811,267,828,277,844,282.7C860.7,288,877,288,894,250.7C910.3,213,927,139,943,128C960,117,977,171,993,160C1009.7,149,1026,75,1043,90.7C1059.3,107,1076,213,1092,261.3C1109,309,1126,299,1142,277.3C1158.6,256,1175,224,1192,181.3C1208.3,139,1225,85,1241,85.3C1257.9,85,1274,139,1291,170.7C1307.6,203,1324,213,1341,186.7C1357.2,160,1374,96,1390,106.7C1406.9,117,1423,203,1432,245.3L1440,288L1440,320L1431.7,320C1423.4,320,1407,320,1390,320C1373.8,320,1357,320,1341,320C1324.1,320,1308,320,1291,320C1274.5,320,1258,320,1241,320C1224.8,320,1208,320,1192,320C1175.2,320,1159,320,1142,320C1125.5,320,1109,320,1092,320C1075.9,320,1059,320,1043,320C1026.2,320,1010,320,993,320C976.6,320,960,320,943,320C926.9,320,910,320,894,320C877.2,320,861,320,844,320C827.6,320,811,320,794,320C777.9,320,761,320,745,320C728.3,320,712,320,695,320C678.6,320,662,320,646,320C629,320,612,320,596,320C579.3,320,563,320,546,320C529.7,320,513,320,497,320C480,320,463,320,447,320C430.3,320,414,320,397,320C380.7,320,364,320,348,320C331,320,314,320,298,320C281.4,320,265,320,248,320C231.7,320,215,320,199,320C182.1,320,166,320,149,320C132.4,320,116,320,99,320C82.8,320,66,320,50,320C33.1,320,17,320,8,320L0,320Z"></path></svg>
                </div>
            </div>
        </>
    )
}