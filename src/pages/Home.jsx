import React, { useEffect, useState } from 'react';
import Style from '../styles/Home.module.css';
import { RiMoneyDollarBoxLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import PaymentSteps from './PaymentSteps';
const Home = () => {
  const navigate = useNavigate();
  const [isShow, setisShow] = useState(false);
  const token = localStorage.getItem("latoken");
  useEffect(() => {
    if(!token){
      navigate("/")
    }
  },[navigate, token])
    return (
        <React.Fragment>
          <section>
    <div className={Style.container}>
      <h2>Payment</h2>
      <div className={Style.info}>
        <RiMoneyDollarBoxLine />
        <h1>Say Hello to Online Payment</h1>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea mollitia quae modi fuga incidunt deserunt quam
          nihil rem tempora ad ratione fugiat, ipsam cum voluptates laboriosam voluptatibus aspernatur sunt consequatur!
        </p>
        <button onClick={() => setisShow(!isShow)}>Start collecting payments</button>
        <h5>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad explicabo consectetur reprehenderit quas
          doloremque expedita hic fuga, nihil pariatur natus alias ea totam voluptate, fugiat, excepturi consequuntur in
          repudiandae ut.</h5>
      </div>
    </div>
    
  </section>
  <PaymentSteps isShow={isShow} setisShow={setisShow}/>
        </React.Fragment>
    );
};

export default Home;