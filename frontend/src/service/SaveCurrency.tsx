export const SaveCurrency = async(option: string) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_APP_CONTROLLER}client/update/currency`, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                currency: option
            })
        })

        return await response.json()
    }

    catch (e) {
        console.log(e);
        return { success: false, message: 'An error occured while processing your request' };
    }
}