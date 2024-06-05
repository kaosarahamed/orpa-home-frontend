import Style from "../styles/PaymentSteps.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import custom from "../styles/EditRent.module.css";
import { useLocation } from "react-router-dom";
const EditRent = () => {
  const [isShowone, setIsshowOne] = useState(true);
  const [isShowtow, setIsshowtow] = useState(true);
  const [isShowthree, setIsshowthree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [payId, setPayId] = useState();
  const [inputList, setinputList] = useState([
    {
      fee: "",
      ammount: "",
      note: "",
    },
  ]);
  const location = useLocation();
  const newdata = location.state;
  const [data, setData] = useState({
    rentCost: "",
    montOfRent: "",
    collectRent: { startDate: "", endDate: "" },
    securityDeposit: { secAmmount: "", secNote: "" },
    protectRent: { protAmmount: "", protNote: "" },
    moveinCost: [...inputList],
    relentedCost: "",
    rentID: "",
  });
  const {
    rentCost,
    montOfRent,
    relentedCost,
    collectRent,
    securityDeposit,
    protectRent,
  } = data;
  const { startDate, endDate } = collectRent;
  const { secAmmount, secNote } = securityDeposit;
  const { protAmmount, protNote } = protectRent;
  useEffect(() => {
    setData((prevData) => ({
      ...prevData,
      moveinCost: [...inputList],
    }));
  }, [inputList]);
  useEffect(() => {
    setData((prevData) => ({
      ...prevData,
      rentID: payId,
    }));
  }, [payId]);

  useEffect(() => {
    setData(newdata);
    setPayId(newdata.rentID);
  }, [newdata]);

  useEffect(() => {
    const updateRentData = async () => {
      const id = localStorage.getItem("rentId");
      await axios.put(`https://orpa-home-backend.onrender.com/${id}`, data);
    };
    if (payId) {
      updateRentData();
    }
  }, [data, payId]);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    await axios
      .put(`https://orpa-home-backend.onrender.com/${newdata._id}`, data)
      .then((res) => {
        toast.success(res.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setLoading(false);
      });
  };

  const addItem = () => {
    setinputList([...inputList, { fee: "", ammount: "", note: "" }]);
  };

  const removeItem = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setinputList(list);
  };
  const moveinCostChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setinputList(list);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "startDate" || name === "endDate") {
      setData((prevData) => ({
        ...prevData,
        collectRent: {
          ...prevData.collectRent,
          [name]: value,
        },
      }));
    } else if (name === "secAmmount" || name === "secNote") {
      setData((prevData) => ({
        ...prevData,
        securityDeposit: {
          ...prevData.securityDeposit,
          [name]: value,
        },
      }));
    } else if (name === "protAmmount" || name === "protNote") {
      setData((prevData) => ({
        ...prevData,
        protectRent: {
          ...prevData.protectRent,
          [name]: value,
        },
      }));
    } else {
      setData({
        ...data,
        [e.target.name]: e.target.value,
      });
    }
  };
  return (
    <div className={Style.rentSection}>
      <ToastContainer />
      <upRent />
      <div className={custom.rentCont}>
        <div className={Style.rentHeader}>
          <h4>Edit payment</h4>
        </div>
        <form onSubmit={handleSubmit} className={custom.form}>
          <div className={Style.rentInfo}>
            <h2>How much is the monthly rent?</h2>
            <label htmlFor="rentCost">Monthly rent</label>
            <input
              type="number"
              name="rentCost"
              id="rentCost"
              placeholder="Enter amount"
              value={rentCost}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className={Style.CostInfo}>
            <h2>When should your tanant send their rent each month?</h2>
            <label htmlFor="montOfRent">Monthly rent</label>
            <select
              name="montOfRent"
              id="montOfRent"
              value={montOfRent}
              onChange={(e) => handleChange(e)}
            >
              <option value="">Select</option>
              <option value="1st of the month">1st of the month</option>
              <option value="2nf of the month">2nd of the month</option>
              <option value="3rd of the month">3rd of the month</option>
              <option value="4th of the month">4th of the month</option>
              <option value="5th of the month">5th of the month</option>
              <option value="6th of the month">6th of the month</option>
              <option value="7th of the month">7th of the month</option>
              <option value="8th of the month">8th of the month</option>
              <option value="9th of the month">9th of the month</option>
              <option value="10th of the month">10th of the month</option>
              <option value="11th of the month">11th of the month</option>
              <option value="12th of the month">12th of the month</option>
              <option value="13th of the month">13th of the month</option>
              <option value="14th of the month">14th of the month</option>
              <option value="15th of the month">15th of the month</option>
              <option value="16th of the month">16th of the month</option>
              <option value="17th of the month">17th of the month</option>
              <option value="18th of the month">18th of the month</option>
              <option value="19th of the month">19th of the month</option>
              <option value="20th of the month">20th of the month</option>
              <option value="21th of the month">21th of the month</option>
              <option value="22th of the month">22th of the month</option>
              <option value="23th of the month">23th of the month</option>
              <option value="24th of the month">24th of the month</option>
              <option value="25th of the month">25th of the month</option>
              <option value="26th of the month">26th of the month</option>
              <option value="27th of the month">27th of the month</option>
              <option value="28th of the month">28th of the month</option>
              <option value="29th of the month">29th of the month</option>
              <option value="30th of the month">30th of the month</option>
            </select>
          </div>
          <div className={Style.CostInfo}>
            <h2>How long will you be collecting rent?</h2>
            <label htmlFor="startDate">First full rent payment starts</label>
            <input
              type="date"
              name="startDate"
              id="startDate"
              value={startDate}
              onChange={(e) => handleChange(e)}
            />
            <label htmlFor="endDate">Payment period ends</label>
            <input
              type="date"
              name="endDate"
              id="endDate"
              value={endDate}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className={Style.CostInfo}>
            <h2>Would you like to collect security deposit?</h2>
            <div className={Style.checking}>
              <h3
                onClick={() => setIsshowOne(!isShowone)}
                className={
                  isShowone ? Style.buttonActive : Style.buttonnoActive
                }
              >
                Yes
              </h3>
              <h3
                onClick={() => setIsshowOne(false)}
                className={
                  isShowone ? Style.buttonnoActive : Style.buttonActive
                }
              >
                No
              </h3>
            </div>
            <div className={isShowone ? Style.conActive : Style.conDeactive}>
              <label htmlFor="secAmmount">Ammount</label>
              <input
                type="number"
                name="secAmmount"
                id="secAmmount"
                value={secAmmount}
                placeholder="Enter ammount"
                onChange={(e) => handleChange(e)}
              />
              <label htmlFor="secNote">Note(Optopnal)</label>
              <input
                type="text"
                name="secNote"
                id="secNote"
                value={secNote}
                placeholder="Enter your additional info"
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
          <div className={Style.CostInfo}>
            <h2>Would you like to collect protected rent?</h2>
            <div className={Style.checking}>
              <h3
                onClick={() => setIsshowtow(!isShowtow)}
                className={
                  isShowtow ? Style.buttonActive : Style.buttonnoActive
                }
              >
                Yes
              </h3>
              <h3
                onClick={() => setIsshowtow(false)}
                className={
                  isShowtow ? Style.buttonnoActive : Style.buttonActive
                }
              >
                No
              </h3>
            </div>
            <div className={isShowtow ? Style.conActive : Style.conDeactive}>
              <label htmlFor="protAmmount">Ammount</label>
              <input
                type="number"
                name="protAmmount"
                id="protAmmount"
                value={protAmmount}
                placeholder="Enter ammount"
                onChange={(e) => handleChange(e)}
              />
              <label htmlFor="protNote">Note(Optopnal)</label>
              <input
                type="text"
                name="protNote"
                id="protNote"
                value={protNote}
                placeholder="Enter your additional info"
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
          <div className={Style.CostInfo}>
            <h2>Would you like to collect any move-in cost?</h2>
            <div className={Style.checking}>
              <h3
                onClick={() => setIsshowthree(!isShowthree)}
                className={
                  isShowthree ? Style.buttonActive : Style.buttonnoActive
                }
              >
                Yes
              </h3>
              <h3
                onClick={() => setIsshowthree(false)}
                className={
                  isShowthree ? Style.buttonnoActive : Style.buttonActive
                }
              >
                No
              </h3>
            </div>
            <div className={isShowthree ? Style.conActive : Style.conDeactive}>
              {inputList &&
                inputList.map((item, index) => {
                  return (
                    <div key={index} className={Style.singleItem}>
                      <h2 onClick={(index) => removeItem(index)}>Delete</h2>
                      <label htmlFor="fee">For</label>
                      <input
                        type="number"
                        name="fee"
                        id="fee"
                        placeholder="Elevator fee"
                        value={item.fee}
                        onChange={(e) => moveinCostChange(e, index)}
                      />
                      <label htmlFor="ammount">Ammount</label>
                      <input
                        type="number"
                        name="ammount"
                        id="ammount"
                        placeholder="Enter ammount"
                        value={item.ammount}
                        onChange={(e) => moveinCostChange(e, index)}
                      />
                      <label htmlFor="note">Note(Optopnal)</label>
                      <input
                        type="text"
                        name="note"
                        id="note"
                        placeholder="Enter your additional info"
                        value={item.note}
                        onChange={(e) => moveinCostChange(e, index)}
                      />
                    </div>
                  );
                })}
              <span className={Style.addButton} onClick={addItem}>
                Add new Item
              </span>
            </div>
          </div>
          <div className={Style.CostInfo}>
            <h2>When are your move-in related costs due?</h2>
            <label htmlFor="relentedCost">Due Date</label>
            <input
              type="date"
              name="relentedCost"
              id="relentedCost"
              value={relentedCost}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <button type="submit" className={Style.button}>
            {loading ? "Loading..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};
export default EditRent;
