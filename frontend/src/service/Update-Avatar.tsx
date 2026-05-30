export const UpdateAvatarService = async(formData: FormData) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_APP_CONTROLLER}api/update-avatar`, {
            method: 'POST',
            credentials: 'include',
            body: formData,
            // headers: {
            //     'Content-Type': 'application/json'
            // }
        });
        
        return await response.json();
    }

    catch (e) {
        console.log(e);
        return { success: false, message: 'An error occurred while updating your avatar. Please try again later.' }
    }
}