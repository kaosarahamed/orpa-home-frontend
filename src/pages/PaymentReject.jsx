import { RiCloseLine } from "react-icons/ri";
import Style from "../styles/Paymentsucess.module.css";
import { Link } from "react-router-dom";

const PaymentReject = () => {
    return (
        <div className={Style.paymentSucess}>
            <h2>Payment Rejected</h2>
            <RiCloseLine />
            <Link to={"/"}>Back</Link>
        </div>
    );
};

export default PaymentReject;