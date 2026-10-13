import { useEffect } from "react"
import { Outlet, useOutletContext } from "react-router-dom"

interface Props {
    setPageTitle: (title: string) => void;
}
export const DepositLayout = () => {
    const { setPageTitle } = useOutletContext<Props>();
    useEffect(() => {
        setPageTitle('Deposit Funds');
        document.title = `Deposit Funds - ${import.meta.env.VITE_APP_NAME}`;
    }, [setPageTitle]);
    return (
        <>
            {/* Set the page then title name then create an outlet for the components */}
            <Outlet />
        </>
    )
}