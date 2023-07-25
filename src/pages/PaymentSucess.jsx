import { FaCheckDouble } from "react-icons/fa";
import Style from "../styles/Paymentsucess.module.css";
import { Link } from "react-router-dom";
const PaymentSucess = () => {
    return (
        <div className={Style.paymentSucess}>
            <h2>Payment Sucessfull</h2>
            <FaCheckDouble />
            <Link to={"/"}>Back</Link>
        </div>
    );
};

export default PaymentSucess;