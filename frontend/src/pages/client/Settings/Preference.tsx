import { useEffect } from "react";
import { Language } from "../../../components/preference/language"
import { useOutletContext } from "react-router-dom"
import { Currency } from "../../../components/preference/Currency";
import { Theme } from "../../../components/preference/Theme";
import { motion } from "motion/react";

interface SettingsTitleProps {
    setSubPageTitle: (title: string) => void;
}

export const Preference = () => {
    const { setSubPageTitle } = useOutletContext<SettingsTitleProps>();
    useEffect(() => {   
        setSubPageTitle('Preference');
        document.title = `Preference - ${import.meta.env.VITE_APP_NAME}`;
    }, [setSubPageTitle])
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <div className="col-12 col-lg-12">
                            <Language />
                        </div>

                        <div className="col-12 col-lg-12">
                            <Currency />
                        </div>

                        <div className="col-12 col-lg-12">
                            <Theme />
                        </div>
                    </motion.div>
                </div>
            </div>
        </>
    )
}