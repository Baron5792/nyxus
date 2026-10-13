export const GoogleButtonService = async(credentialResponse: any) => {
    try {
        const response = await fetch (`${import.meta.env.VITE_APP_CONTROLLER}auth/google`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: credentialResponse.credential
            })
        })

        const data = await response.json();

        if (!response.ok) {
            return { success: false, message: data.message || 'Failed to authenticate with Google.' }
        }

        return data;
    }

    catch (error) {
        return { success: false, message: 'An error occurred while processing the Google login.' }
    }
}