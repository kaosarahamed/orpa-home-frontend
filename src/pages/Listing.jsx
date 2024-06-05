import Style from "../styles/Listing.module.css";
import Image from "../assets/properties.jpg";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaChevronCircleRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Listing = () => {
  const navigate = useNavigate();
  const lantoken = localStorage.getItem("latoken");
  const usertoken = localStorage.getItem("token");
  useEffect(() => {
    if (lantoken) {
      navigate("/");
    } else if (usertoken) {
      navigate("/");
    } else {
      navigate("/auth/log-in");
    }
  }, [lantoken, usertoken, navigate]);

  const [rent, setRent] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("https://orpa-home-backend.onrender.com/rent/")
      .then((res) => {
        setRent(res.data);
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("laid");
    localStorage.removeItem("latoken");
    localStorage.removeItem("lausername");
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("id");
    navigate("/auth/log-in");
  };

  return (
    <div className={Style.properties}>
      <h2>{error}</h2>
      <div className={Style.propeContainer}>
        <div className={Style.propeHeader}>
          <h2>properties</h2>
          <span>
            {lantoken && <Link to="/dashboard">Add a properties</Link>}
            <button onClick={logout}>Logout</button>
          </span>
        </div>
        <div className={Style.listings}>
          {rent &&
            rent.map((item, index) => {
              return (
                <div key={index} className={Style.item}>
                  <div className={Style.itemHead}>
                    <img src={Image} alt="" />
                    <p>Listed For Rent</p>
                    <span>
                      <h2>123 Main Street</h2>
                      <h3>Seattke, Wa 45678</h3>
                    </span>
                  </div>
                  <div className={Style.itembody}>
                    <span>
                      <h2>Find Tenants</h2>
                      <Link to={`/single/${item._id}`} state={item}>
                        Listing Inquiries, application <FaChevronCircleRight />
                      </Link>
                    </span>
                    <h3>New Application</h3>
                  </div>
                  <div className={Style.itemfooter}>
                    <span>
                      <h2>Manage tenants</h2>
                      <Link to={`/edit/${item._id}`} state={item}>
                        Leases, Payments <FaChevronCircleRight />
                      </Link>
                    </span>
                    <h3>Get your next tenant on boarded</h3>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Listing;
