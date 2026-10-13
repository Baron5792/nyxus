import { getRates } from "../../utils/rates.js"

const GetRates = async(req, res) => {
    const rates = await getRates();
    return res.status(200).json({ success: true, rates })
}

const fetchController = { GetRates }
export default fetchController;