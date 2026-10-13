export const GetRates = async() : Promise<Record<string, number>> => {
    try {
        const response = await fetch(`${import.meta.env.VITE_APP_CONTROLLER}client/fetch/rates`, {
            credentials: 'include'
        });

        const data = await response.json();
        console.log(data);
        return data.success ? data.rates : { USD: 1 }
    }

    catch (e) {
        console.log(e);
        return { USD: 1 };
    }
}