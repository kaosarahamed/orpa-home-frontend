import { useEffect, useState } from 'react';
import Style from '../styles/Global.module.css';
import {Link, useNavigate} from "react-router-dom";
import axios from 'axios';
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { ToastContainer , toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const UserSingUp = () => {


    const token = localStorage.getItem("token");
    const navigate =  useNavigate()
  
    useEffect(() => {
        if(token){
            navigate("/")
        }
    },[token, navigate])

    

    const [users, setUsers] = useState({
        userName : "",
        email: "",
        password : "",
        ConfirmPassword: ""
    });
const { userName, email, password, ConfirmPassword} = users;
const [loading, setLoading] = useState(false);


    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        if(password.length < 8){
            toast.error('Password must be minimum 8 charachter', {
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
            setUsers({
                userName : "",
                email: "",
                password : "",
                ConfirmPassword: ""
            })
        }else if(password !== ConfirmPassword){
            toast.error('Password must matched', {
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
            setUsers({
                userName : "",
                email: "",
                password : "",
                ConfirmPassword: ""
            })
        }else{
            await axios.post("http://localhost:4000/user", users).then((res) => {
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
                setTimeout(() => {
                    navigate("/user/log-in")
                }, 4000);
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
            });
            setUsers({
                userName : "",
                email: "",
                password : "",
                ConfirmPassword: ""
            })
        }
    }


    const handleChange = (e) => {
        setUsers({...users, [e.target.name] : e.target.value})
    }
    return (
    
    <section>
        <ToastContainer />
    <div className={Style.container}>
          <Link to="/" className={Style.logo}>RN</Link>
        <h1>Create Tenant Account</h1>
        <form onSubmit={handleSubmit}>
            <span>
                <FaUser />
                <input required value={userName} type="text" name="userName" placeholder="Enter userName" id="userName" onChange={(e) => handleChange(e)}/>
            </span>
            <span>
                <FaEnvelope />
                <input required value={email} type="email" name="email" placeholder="Enter email" id="email" onChange={(e) => handleChange(e)}/>
            </span>
            <span>
                <FaLock />
                <input required value={password} type="password" name="password" id="password" placeholder="Enter password" onChange={(e) => handleChange(e)}/>
            </span>
            <span>
                <FaLock />
                <input required value={ConfirmPassword} type="password" name="ConfirmPassword" id="ConfirmPassword" placeholder="Enter confirm password" onChange={(e) => handleChange(e)}/>
            </span>
            <button type="submit">{loading ? "Loading..." : "SingUp"}</button>
        </form>
        <div className={Style.formFooter}>
            <span>
            <h2>Already have an account?</h2>
            <Link to="/user/log-in">Login</Link>
            </span>
            <Link to="/auth/sing-up">Create landlord account</Link>
        </div>
    </div>
</section>
    );
};

export default UserSingUp;