import React from 'react';
import { Link } from 'react-router-dom';
import './Topbar.css';
import { useContext } from "react";
import { Context } from "../../context/Context.js";


const Topbar=()=>{
    const { user,dispatch } = useContext(Context);
    const handleLogout=()=>{
        dispatch({type:"LOGOUT"})
    }
    return(
        <div className="top">
            <div className="topLeft"><i className="leftIcon fas fa-blog"></i></div>
            <div className="topCenter">
                <ul className="topList">
                    <li className="topListItem"><Link to="/" style={{textDecoration:"none",color:"inherit"}}>
                    HOME
                    </Link></li>
                    <li className="topListItem"><Link to="/contactus" style={{textDecoration:"none",color:"inherit"}}>
                    ABOUT US
                    </Link></li>
                    <li className="topListItem"><Link to="/contactus" style={{textDecoration:"none",color:"inherit"}}>
                    CONTACT US
                    </Link></li>
                    <li className="topListItem"><Link to="/write" style={{textDecoration:"none",color:"inherit"}}>
                    WRITE
                    </Link></li>
                    {user ? 
                    (<li className="topListItem" onClick={handleLogout}>LOGOUT</li>):
                    (<div></div>)
                    }
                    
                </ul>
            </div>
            {user ? (<div className="topRight">
                <Link  to="/profile">
                <i className="imgIcon far fa-user-circle"></i>
                </Link>
                
                <i className="searchIcon fas fa-search"></i>
            </div>):(<div className="loginReg">
            <ul className="topList">

                        <Link  to="/login" className="linkToLoginReg">
                        <li className="topListItem">LOGIN</li>
                        </Link>
                        <Link to="/register" className="linkToLoginReg">

                        <li className="topListItem">REGISTER</li>
                        </Link>
            </ul>
                    </div>)}
            
        </div>
    )
}

export default Topbar;