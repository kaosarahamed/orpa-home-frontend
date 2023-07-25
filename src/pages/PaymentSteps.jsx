import Style from '../styles/PaymentSteps.module.css';
import { RiCloseLine } from "react-icons/ri";
import Accordion from './Accordion';
import { FaLock } from "react-icons/fa";
import { AccordionTwo, AccordionThree, AccordionFour, AccordionFive, AccordionSix, AccordionSeven, AccordionEight, AccordionNine} from "../assets/Accordion";
import { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import axios from 'axios';
import { ToastContainer , toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const PaymentSteps = (props) => {
    

    const [isShowone, setIsshowOne] = useState(false);
    const [isShowtow, setIsshowtow] = useState(false);
    const [isShowthree, setIsshowthree] = useState(false);
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(false);
    const [payId, setPayId] = useState();
    const [step, setStep] = useState(0);
    const [inputList, setinputList] = useState([{
      fee: "",
      ammount: "",
      note: ""
    }]);
    
    const [data, setData] = useState({
      rentCost: "",
      montOfRent: "",
      collectRent: {startDate: "", endDate: ""},
      securityDeposit: {secAmmount: "", secNote: ""},
      protectRent: {protAmmount: "", protNote: ""},
      moveinCost: [...inputList],
      relentedCost: "",
      rentID: "",
    });
    const {rentCost, montOfRent, relentedCost, collectRent, securityDeposit, protectRent, moveinCost} = data;
    const {startDate, endDate} = collectRent;
    const {secAmmount, secNote} = securityDeposit;
    const {protAmmount, protNote} = protectRent;
    useEffect(() => {
      setData((prevData) => ({
        ...prevData,
        moveinCost: [...inputList]
      }));
    }, [inputList]);
    useEffect(() => {
      setData(prevData => ({
        ...prevData,
        rentID: payId
      }));
    }, [payId]);

    useEffect(() => {
      const updateRentData = async () => {
        const id = localStorage.getItem("rentId");
        await axios.put(`http://localhost:4000/rent/${id}`, data);
      };
      if (payId) {
        updateRentData();
      }
    }, [data, payId]);


    const getConnectURL = async () => {
      setResponse(true);
      try {
        const res = await axios.get("http://localhost:4000/connect");
        setPayId(res.data.id);
        setTimeout(() => {
          window.location.href = res.data.url;
          setResponse(false);
        }, 3000);
      } catch (error) {
        console.error(error);
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      if(relentedCost.length === 0){
        toast.error("Please add due cost", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
      }else{
        setLoading(true);
      await axios.post("http://localhost:4000/rent", data).then((res) => {
        localStorage.setItem("rentId", res.data.rentData._id)
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
        setStep(8)
        setLoading(false)
      }).catch((err) => {
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
        setLoading(false)
      })
      }
      
    }
    

    const onClick = () => {
      if(step === 1){
        if(rentCost.length === 0){
          toast.error("Please fill the form", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
        }else{
          setStep(curr => curr + 1)
        }
      }
      else if(step === 2){
        if(montOfRent.length === 0){
          toast.error("Please fill the form", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
        }else{
          setStep(curr => curr + 1)
        }
      }
      else if(step === 3){
        if(startDate.length === 0 || endDate.length === 0){
          toast.error("Please fill the form", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
        }else{
          setStep(curr => curr + 1)
        }
      }else if(step === 6){
        if(moveinCost.length === 0){
          toast.error("Please fill the form", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
        }else{
          setStep(curr => curr + 1)
        }
      }else{
        setStep(curr => curr + 1)
      }
    }
    const handleButtonClick = () =>{
      setStep(curr => curr + 1)
    }
    const backClick = () => {
        if(step > 0){
          setStep(curr => curr - 1)
        }
    }
    const addItem = () => {
      setinputList([...inputList, {fee: "", ammount: "", note: ""}])
    }

    const removeItem = (index) => {
      const list = [...inputList];
      list.splice(index, 1);
      setinputList(list)
    }
    const moveinCostChange = (e, index) => {
      const {name, value} = e.target;
      const list = [...inputList];
      list[index][name] = value;
      setinputList(list)
    } 


    

const handleChange = (e) => {
  const { name, value } = e.target;
  if (name === 'startDate' || name === 'endDate') {
    setData(prevData => ({
      ...prevData,
      collectRent: {
        ...prevData.collectRent,
        [name]: value
      }
    }));
  }else if(name === 'secAmmount' || name === 'secNote'){
    setData(prevData => ({
      ...prevData,
      securityDeposit: {
        ...prevData.securityDeposit,
        [name]: value
      }
    }));
  }else if(name === 'protAmmount' || name === 'protNote'){
    setData(prevData => ({
      ...prevData,
      protectRent: {
        ...prevData.protectRent,
        [name]: value
      }
    }));
  }else{
    setData({
      ...data, [e.target.name] : e.target.value,
      
    })
  }
  
}

    return (
        <div className={`${Style.rentSection} ${
          props.isShow ? `${Style.active}` : `${Style.inactive}`
        }`}>
          <ToastContainer />
          
    <div className={Style.rentContainer} >
      <div className={Style.rentHeader}>
        {step === 8 ? "" : <h4 onClick={backClick}>BACK</h4>}
        <h3>payment setup</h3>
        <RiCloseLine onClick={() => props.setisShow(!props.isShow)}/>
      </div>
      <form onSubmit={handleSubmit}>
      {step === 0 && (
        <div className={Style.CostInfo}>
        <h2 className={Style.heading}>Here&apos;s what you&apos;ll need</h2>
        <ul>
          <li>Bank account info for what you&apos;d like to recive payments</li>
          <li>Amounts for the monthly rent and any move in charges</li>
          <li>Basic details about your renter</li>
          <li>Your social security number and/or employer idententification number (EN), plus a physical mailing address
          </li>
        </ul>
      </div>
      )}
      {
        step === 1 && (
            <div className={Style.rentInfo}>
        <h2>How much is the monthly rent?</h2>
        <label htmlFor="rentCost">Monthly rent</label>
        <input type="number" name="rentCost" id="rentCost" required placeholder="Enter amount" value={rentCost} onChange={(e) => handleChange(e)}/>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde minus voluptatibus minima ducimus aliquam enim
          nobis cumque laudantium temporibus.</p>
        <Accordion widgets={AccordionTwo} />
      </div>
        )
      }
      {
        step === 2 && (
            <div className={Style.CostInfo}>
        <h2>When should your tanant send their rent each month?</h2>
        <label htmlFor="montOfRent">Monthly rent</label>
        <select name="montOfRent" id="montOfRent" value={montOfRent} onChange={(e) => handleChange(e)}>
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
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde minus voluptatibus minima ducimus aliquam enim
          nobis cumque laudantium temporibus.</p>
          <Accordion widgets={AccordionThree} />
      </div>
        )
      }
      {
        step === 3 && (
            <div className={Style.CostInfo}>
        <h2>How long will you be collecting rent?</h2>
        <label htmlFor="startDate">First full rent payment starts</label>
        <input type="date" name="startDate" id="startDate" value={startDate} onChange={(e) => handleChange(e)}/>
        <label htmlFor="endDate">Payment period ends</label>
        <input type="date" name="endDate" id="endDate" value={endDate} onChange={(e) => handleChange(e)}/>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde minus voluptatibus minima ducimus aliquam enim
          nobis cumque laudantium temporibus.</p>
          <Accordion widgets={AccordionFour} />
      </div>
        )
      }
      {
        step === 4 && (
            <div className={Style.CostInfo}>
        <h2>Would you like to collect security deposit?</h2>
        <div className={Style.checking}>
        <h3 onClick={() => setIsshowOne(!isShowone)} className={isShowone ? Style.buttonActive : Style.buttonnoActive}>Yes</h3>
          <h3 onClick={() => setIsshowOne(false)} className={isShowone ? Style.buttonnoActive : Style.buttonActive}>No</h3>
        </div>
        <div className={isShowone ? Style.conActive : Style.conDeactive}>
        <label htmlFor="secAmmount">Ammount</label>
        <input type="number" name="secAmmount" id="secAmmount" value={secAmmount} placeholder="Enter ammount" onChange={(e) => handleChange(e)}/>
        <label htmlFor="secNote">Note(Optopnal)</label>
        <input type="text" name="secNote" id="secNote" value={secNote} placeholder="Enter your additional info" onChange={(e) => handleChange(e)}/>
        </div>
        <Accordion widgets={AccordionFive} />
      </div>
        )
      }
      {
        step === 5 && (
            <div className={Style.CostInfo}>
        <h2>Would you like to collect protected rent?</h2>
        <div className={Style.checking}>
        <h3 onClick={() => setIsshowtow(!isShowtow)} className={isShowtow ? Style.buttonActive : Style.buttonnoActive}>Yes</h3>
          <h3 onClick={() => setIsshowtow(false)} className={isShowtow ? Style.buttonnoActive : Style.buttonActive}>No</h3>
        </div>
        <div className={isShowtow ? Style.conActive : Style.conDeactive}>
        <label htmlFor="protAmmount">Ammount</label>
            <input type="number" name="protAmmount" id="protAmmount" value={protAmmount} placeholder="Enter ammount" onChange={(e) => handleChange(e)}/>
            <label htmlFor="protNote">Note(Optopnal)</label>
            <input type="text" name="protNote" id="protNote" value={protNote} placeholder="Enter your additional info" onChange={(e) => handleChange(e)}/>
        </div>
            <Accordion widgets={AccordionSix} />
      </div>
        )
      }
      {
        step === 6 && (
            <div className={Style.CostInfo}>
        <h2>Would you like to collect any move-in cost?</h2>
        <div className={Style.checking}>
        <h3 onClick={() => setIsshowthree(!isShowthree)} className={isShowthree ? Style.buttonActive : Style.buttonnoActive}>Yes</h3>
          <h3 onClick={() => setIsshowthree(false)} className={isShowthree ? Style.buttonnoActive : Style.buttonActive}>No</h3>
        </div>
        <div className={isShowthree ? Style.conActive : Style.conDeactive}>
            {
              inputList && inputList.map((item, index) => {
                return (
                  <div key={index} className={Style.singleItem}>
              <h2 onClick={(index) => removeItem(index)}>Delete</h2>
              <label htmlFor="fee">For</label>
              <input type="number" name="fee" id="fee" placeholder="Elevator fee" value={item.fee} onChange={(e) => moveinCostChange(e, index)}/>
              <label htmlFor="ammount">Ammount</label>
              <input type="number" name="ammount" id="ammount" placeholder="Enter ammount" value={item.ammount} onChange={(e) => moveinCostChange(e, index)}/>
              <label htmlFor="note">Note(Optopnal)</label>
              <input type="text" name="note" id="note" placeholder="Enter your additional info" value={item.note} onChange={(e) => moveinCostChange(e, index)}/>
            </div>
                )
              })
            }
            <span className={Style.addButton} onClick={addItem}>Add new Item</span>

        </div>
            
            <Accordion widgets={AccordionSeven} />
      </div>
        )
      }
      {
        step === 7 && (
            <div className={Style.CostInfo}>
        <h2>When are your move-in related costs due?</h2>
        <label htmlFor="relentedCost">Due Date</label>
        <input type="date" name="relentedCost" id="relentedCost" value={relentedCost} onChange={(e) => handleChange(e)}/>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde minus voluptatibus minima ducimus aliquam enim
          nobis cumque laudantium temporibus.</p>
          <Accordion widgets={AccordionEight} />
      </div>
        )
      }
      {
        step === 8 && (
            <div className={Style.CostInfo}>
        <h6>Deposit Account</h6>
        <h3>Link a checking accoutn to revive your payments.</h3>
        <h4 onClick={getConnectURL} className={Style.button}><FaLock /> {response ? "Loading..." : "Link My Bank Account"}</h4>
        <p>(Fastet)you need only your bank login info.</p>
        <h4 className={Style.manualButton}>Manualy enter account information</h4>
        <Accordion widgets={AccordionNine} />
      </div>
        )
      }
      {step === 0 ? (<h4 type="submit" onClick={handleButtonClick} className={Style.button}>Ok, Got it</h4> ) : step === 7 ? (<button type="submit" className={Style.button}>Submit</button> ) : step === 8 ? "" : (<h4 className={Style.button} onClick={onClick}>{loading ? "Loading..." : "Next"}</h4> )}
      
      </form>
    </div>
  </div>
    );
};
PaymentSteps.propTypes = {
  isShow: PropTypes.bool,
  setisShow : PropTypes.any
}
export default PaymentSteps;