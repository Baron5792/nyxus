import { GoogleLogin } from '@react-oauth/google';
import { GoogleButtonService } from '../../service/OAuth';
import { toast } from 'sonner';
// import { useEffect } from 'react';

export const GoogleButton = () => {
    const handleGoogleLogin  = async (credentials: any) => {
        const data = await GoogleButtonService(credentials);
        console.log("Data: ", data);

        if (!data.success) {
            toast.error(data.message || 'Failed to authenticate with Google.', {id: 'error'});
            return false;
        }

        window.location.href = '/client/dashboard';
    }

    return (
        <GoogleLogin onSuccess={handleGoogleLogin} onError={() => console.error('Google login error')} />
    );
};