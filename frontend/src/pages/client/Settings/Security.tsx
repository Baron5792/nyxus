import { useEffect } from "react"
import { useOutletContext } from "react-router-dom";
import { SecurityOverview } from "../../../components/security/Security-Overview";
import { ChangePassword } from "../../../components/security/Password";

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
                    <div className="col-12 col-md-12 col-lg-12">
                        <ChangePassword />
                    </div>
                </div>
            </div>
        </>
    )
}