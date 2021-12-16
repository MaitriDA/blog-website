import React,{useState,useContext} from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';
import { Context } from "../../context/Context";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

const Login=()=>{
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [open, setOpen] = useState (false);
    const [msg,setMsg]=useState("");
    const { dispatch, isFetching } = useContext(Context);

    const handleSubmit=async (e)=>{
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });
        if(email && password){ 
            try{
                const res=await axios.post("/auth/login",{email,password});
                setMsg(res.data.message);
                setOpen(true);
                dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
            }
            catch(err){
                console.log(err);
                dispatch({ type: "LOGIN_FAILURE" });
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
            <div className="login">
            <span className="loginTitle">LOGIN</span>
                <form className="loginForm" onSubmit={handleSubmit}>
                    <label className="loginFormLabel">Email</label>
                    <input type="text" placeholder="Enter your Email" className="loginInput" onChange={e=>setEmail(e.target.value)}/>
                    <label className="loginFormLabel">Password</label>
                    <input type="password" className="loginInput" placeholder="Enter your Password" onChange={e=>setPassword(e.target.value)}/>
                    <button className="loginButton" type="submit">LOGIN</button>
                    <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                        <Alert severity="warning">{msg}</Alert>
                    </Snackbar>
                </form>
                <button className="loginRegisterButton"><Link to="/register" style={{textDecoration:"None",color:"white"}}>REGISTER</Link></button>
            </div>
        </>
    )
}

export default Login;