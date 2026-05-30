import { Outlet } from "react-router-dom"
import { PublicHeader } from "./Public-Header"
import { PublicFooter } from "./Public-Footer"

export const PublicLayout = () => {
    return (
        <>
            <PublicHeader />
            <Outlet />
            <PublicFooter />
        </>
    )
}