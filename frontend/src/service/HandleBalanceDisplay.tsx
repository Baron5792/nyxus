export const HandleBalanceDisplay = async(value: boolean) => {
    try {
        const response = await fetch (`${import.meta.env.VITE_APP_CONTROLLER}user/balance-display`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                value: value
            })
        })

        return await response.json();
    }

    catch (error) {
        return ({ success: false, message: 'Something went wrong' });
    }
}