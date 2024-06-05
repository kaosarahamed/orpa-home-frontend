import Style from "../styles/SingleListing.module.css";
import Image from "../assets/properties.jpg";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const SingleListing = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const item = location.state;
  const handleSubmit = async (rentID) => {
    setLoading(true);
    const id = {
      id: rentID,
    };
    await axios
      .post(
        "https://orpa-home-backend.onrender.com/create-checkout-session",
        id
      )
      .then((res) => {
        setLoading(false);
        window.location.href = res.data.sessionId;
      })
      .catch((err) => {
        setError(err.response.data.message);
        setLoading(false);
      });
  };

  return (
    <div className={Style.singleListing}>
      <div className={Style.singleContainer}>
        <div className={Style.pageHeader}>
          <img src={Image} alt="" className={error} />
          <span>
            <h2>This is single listing title</h2>
            <h3>This is single listing description</h3>
          </span>
        </div>
        <div className={Style.pageBody}>
          <div className={Style.leftBar}>
            <span>
              <h2>Rent Cost</h2>
              <h3>
                Amount: <p>{item.rentCost}</p>
              </h3>
            </span>
            <span>
              <h2>Rent of month</h2>
              <h3>{item.montOfRent}</h3>
            </span>
            <span>
              <h2>Rent duration</h2>
              <h3>
                Start Date: <p>{item.collectRent.startDate}</p>
              </h3>
              <h3>
                End Date: <p>{item.collectRent.endDate}</p>
              </h3>
            </span>
            <span>
              <h2>Deposit</h2>
              <h3>
                Ammount: <p>${item.securityDeposit.secAmmount}</p>
              </h3>
              <h3>
                Note: <p>{item.securityDeposit.secNote}</p>
              </h3>
            </span>
            <span>
              <h2>Protected Rent</h2>
              <h3>
                Ammount: <p>${item.protectRent.protAmmount}</p>
              </h3>
              <h3>
                Note: <p>{item.protectRent.protNote}</p>
              </h3>
            </span>
            {item.moveinCost.map((res, index) => {
              return (
                <span key={index}>
                  <h2>Move In cost</h2>
                  <h3>
                    Ammount: <p>${res.ammount}</p>
                  </h3>
                  <h3>
                    Fee: <p>${res.fee}</p>
                  </h3>
                  <h3>
                    Note: <p>{res.note}</p>
                  </h3>
                </span>
              );
            })}
            <span>
              <h2>Due Date</h2>
              <h3>{item.relentedCost}</h3>
            </span>
          </div>
          <div className={Style.rightBar}>
            <h2>Rent Price: ${item.rentCost}</h2>
            <h3>Rent Duration: {item.montOfRent}</h3>
            <h4>Rent Short Details</h4>
            <button onClick={() => handleSubmit(item.rentID)}>
              {loading ? "Loading..." : "Pay Now"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleListing;
