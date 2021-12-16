import React,{useState} from 'react';
import './Register.css';
import { Link } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

const Register=()=>{
    const [username,setUsername]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [cpassword,setCpassword]=useState("");
    const [open, setOpen] = useState (false);
    const [msg,setMsg]=useState("");

    const handleSubmit=async (e)=>{
        e.preventDefault();
        if(username && email && password && cpassword){
            if(password!==cpassword){
                setOpen(true);
                setMsg("Password not matching")
            }
            try{
                const res=await axios.post("/auth/register",{username,email,password});
                console.log(res.data.message)
                setMsg(res.data.message);
                setOpen(true);
            }
            catch(err){
                console.log(err);
            }
        }
        else{
            setOpen(true);
            setMsg("Enter all credentials")
        }
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen (false);
      };
    return(
        <>
            <div className="register">
            <span className="registerTitle">REGISTER</span>
                <form className="registerForm" onSubmit={handleSubmit}>
                    <label className="registerFormLabel">Username</label>
                    <input type="text" placeholder="Enter your username" className="registerInput" onChange={e=>setUsername(e.target.value)}/>
                    <label className="registerFormLabel">Email</label>
                    <input type="text" placeholder="Enter your Email" className="registerInput" onChange={e=>setEmail(e.target.value)}/>
                    <label className="registerFormLabel">Password</label>
                    <input type="password" className="registerInput" placeholder="Enter your Password" onChange={e=>setPassword(e.target.value)}/>
                    <label className="registerFormLabel">Confirm Password</label>
                    <input type="password" placeholder="Enter your Password" className="registerInput" onChange={e=>setCpassword(e.target.value)}/>
                    <button className="registerButton" type="submit">REGISTER</button>
                    <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                        <Alert severity="warning">{msg}</Alert>
                    </Snackbar>
                </form>
                <button className="registerLoginButton"><Link to="/login" style={{textDecoration:"None",color:"white"}}>LOGIN</Link></button>
            </div>
        </>
    )
}

export default Register;