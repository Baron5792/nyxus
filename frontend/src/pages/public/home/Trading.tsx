import FeaturedImg from '../../../assets/images/featured/man holding laptop with chart.png';
import TradingWidget from './Trading-Widget';

export const Trading = () => {
    return (
        <>
            <div className="container-fluid">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-12 col-lg-7 my-5">
                            <div className="featured-imgage-container">
                                <img src={FeaturedImg} alt={`Man holding a laptop with chart`} className='w-100' />
                            </div>
                        </div>
                        <div className="col-12 col-md-12 col-lg-5 my-5">
                            <TradingWidget />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}