import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react';
const Home = lazy(() => import('./pages/public/Home').then(module => ({ default: module.Home })));
const PublicLayout = lazy(() => import('./components/layout/PublicLayout').then(module => ({ default: module.PublicLayout })));
const AccountLayout = lazy(() => import('./components/layout/Account').then(module => ({ default: module.AccountLayout })));
const Login = lazy(() => import('./pages/auth/Login').then(module => ({ default: module.Login })));
import { Toaster } from 'sonner';
const Register = lazy(() => import('./pages/auth/Register').then(module => ({ default: module.Register })));
const ClientLayout = lazy(() => import('./components/layout/ClientLayout').then(module => ({ default: module.ClientLayout })));
const Dashboard =   lazy(() => import('./pages/client/Dashboard').then(module => ({ default: module.Dashboard })));
const SettingsLayout = lazy(() => import('./components/layout/SettingsLayout').then(module => ({ default: module.SettingsLayout })));
const Profile = lazy(() => import('./pages/client/Settings/Profile').then(module => ({ default: module.Profile })));
const Security = lazy(() => import('./pages/client/Settings/Security').then(module => ({ default: module.Security })));
const Preference = lazy(() => import('./pages/client/Settings/Preference').then(module => ({ default: module.Preference })));
const Account = lazy(() => import('./pages/client/Account').then(module => ({ default: module.Account })));
const DepositLayout = lazy(() => import('./components/layout/DepositLayout').then(module => ({ default: module.DepositLayout })));
const Deposit = lazy(() => import('./pages/client/Deposit').then(module => ({ default: module.Deposit })));


export const App = () => {
    return (
        <>
            <Suspense>
                <Routes>
                    {/* unauthenticated routes */}
                    <Route element={<PublicLayout />} path='/'>
                        <Route element={<Home />} index />
                    </Route>

                    {/* Account layaouts */}
                    <Route element={<AccountLayout />} path='auth'>
                        <Route element={<Login />} path='login' />
                        <Route element={<Register />} path='register' />
                    </Route>

                    {/* Authenticated users */}
                    <Route element={<ClientLayout />} path='client'>
                        <Route element={<Dashboard />} path='dashboard' />
                        <Route element={<Account />} path='accounts' />

                        {/* Route for settings */}
                        <Route element={<SettingsLayout />} path='settings'>
                            <Route index element={<Profile />} />
                            <Route element={<Security />} path='security' />
                            <Route element={<Preference />} path='preference' />
                        </Route>

                        {/* Deposit Route */}
                        <Route element={<DepositLayout />} path='deposit'>
                            <Route element={<Deposit />} index />
                        </Route>
                    </Route>
                </Routes>
            </Suspense>

            <Toaster position='bottom-center' richColors />
        </>
    )
}