import { createContext, type ReactNode, useState, useEffect, useContext } from "react";
import { GetRates } from "../service/getRates";

type Rates = Record<string, number>;
const RateContext = createContext<Rates>({ USD: 1 });

export const RatesProvider = ({ children }: { children: ReactNode }) => {
    const [rates, setRates] = useState<Record<string, number>>({ USD: 1 });

    useEffect(() => {
        const load = () => GetRates().then((r) => {
            console.log('provider got:', r);
            setRates(r);
        });
        load();
        const id = setInterval(load, 6 * 60 * 60 * 1000);
        return () => clearInterval(id);
    }, []);

    return <RateContext.Provider value={rates}>
        {children}
    </RateContext.Provider>;
}

export const useRates = () => useContext(RateContext);