import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/public/Home'
import { PublicLayout } from './components/layout/PublicLayout'
import { AccountLayout } from './components/layout/Account'
import { Login } from './pages/auth/Login'
import { Toaster } from 'sonner';
import { Register } from './pages/auth/Register'
import { ClientLayout } from './components/layout/ClientLayout'
import { Dashboard } from './pages/client/Dashboard'
import { SettingsLayout } from './components/layout/SettingsLayout'
import { Profile } from './pages/client/Settings/Profile'

export const App = () => {
    return (
        <>
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

                    {/* Route for settings */}
                    <Route element={<SettingsLayout />} path='settings'>
                        <Route index element={<Profile />} />
                    </Route>
                </Route>
            </Routes>

            <Toaster richColors position='top-right' />
        </>
    )
}