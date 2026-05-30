import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { ProfilePicture } from "../../../components/Profile/ProfilePicture";
import { AccountOverview } from "../../../components/Profile/AccountOverview";
import { PersonalInformation } from "../../../components/Profile/Personal-Information";

interface SettingsTitleProps {
    setSubPageTitle: (title: string) => void;
}

export const Profile = () => {
    const { setSubPageTitle } = useOutletContext<SettingsTitleProps>();
    useEffect(() => {
        setSubPageTitle('Profile');
        document.title = `Profile - ${import.meta.env.VITE_APP_NAME}`;
    }, [setSubPageTitle]);
    return (
        <>
            <div className="container-fluid p-0">
                <div className="row">
                    <div className="col-12 col-md-12 col-lg-6 col-xl-6">
                        <ProfilePicture />
                    </div>

                    <div className="col-12 col-md-12 col-lg-6 col-xl-6">
                        <AccountOverview />
                    </div>

                    <div className="col-12 col-md-12 col-lg-12 col-xl-12">
                        <PersonalInformation />
                    </div>
                </div>
            </div>
        </>
    )
}