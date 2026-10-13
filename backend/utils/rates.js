let cache = {
    rates: null,
    fetchedAt: 0
}

const SIX_HOURS = 6 * 60 * 60 * 1000;

export const getRates = async(req, res) => {
    if (cache.rates && Date.now() - cache.fetchedAt < SIX_HOURS) return cache.rates;

    try {
        const response = await fetch('https://api.frankfurter.dev/v1/latest?base=USD&symbols=EUR,GBP,JPY');
        if (!response.ok) {
            throw new Error(`Server responded with ${response.status}`);
        }
        const data = await response.json();
        console.log('Data: ', data);
        cache = { 
            rates: {
                USD: 1, 
                ...data.rates 
            }, 
            fetchedAt: Date.now() 
        };
    }

    catch (e) {
        console.log(e);
        if (!cache.rates) return {  USD: 1 }
    }
}