import { useEffect } from "react"
import { useOutletContext } from "react-router-dom";
import { SecurityOverview } from "../../../components/security/Security-Overview";
import { ChangePassword } from "../../../components/security/Password";
import { TwoFactorAuth } from "../../../components/security/2FA";
import { EmailVerification } from "../../../components/security/Email-Verification";
import { TrustedDevices } from "../../../components/security/Trusted-Devices";
import { Verification } from "../../../components/security/KYC-Verification";
import { motion } from "motion/react";

interface SettingsTitleProps {
    setSubPageTitle: (title: string) => void;
}

export const Security = () => {
    const { setSubPageTitle } = useOutletContext<SettingsTitleProps>();

    useEffect(() => {
        setSubPageTitle('Security');
        document.title = `Security - ${import.meta.env.VITE_APP_NAME}`;
    }, [setSubPageTitle]);
    return (
        <>
            <div className="container-fluid p-0">
                <div className="row">
                    {/* overview */}
                    <div className="col-12 col-md-12 col-lg-12">
                        <SecurityOverview />
                    </div>

                    {/* Password */}
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                        <div className="col-12 col-md-12 col-lg-12">
                            <ChangePassword />
                        </div>

                        <div className="col-12 col-md-12 col-lg-12">
                            <TwoFactorAuth />
                        </div>

                        <div className="col-12 col-md-12 col-lg-12">
                            <Verification />
                        </div>

                        <div className="col-12 col-md-12 col-lg-12">
                            <EmailVerification />
                        </div>

                        <div className="col-12 col-md-12 col-lg-12">
                            <TrustedDevices />
                        </div>
                    </motion.div>
                </div>
            </div>
        </>
    )
}