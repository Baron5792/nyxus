import { toast } from "sonner";

export const ProfileUpdateService = async (formData: any) => {
    console.log(formData);
    try {
        const response = await fetch(`${import.meta.env.VITE_APP_CONTROLLER}user/update-profile`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })

        return await response.json();
    }

    catch (error) {
        return { success: false, message: 'Network error. Please try again later' };
    }
}