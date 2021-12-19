import React,{useState} from 'react';
import './ContactUs.css';
import axios from 'axios';

const ContactUs=()=>{
    const [username,setUsername]=useState("");
    const [email,setEmail]=useState("");
    const [phone,setPhone]=useState("");
    const [message,setMessage]=useState("");

    const handleSubmit=async()=>{
        try{
            const res=await axios.post("/contactus",{username,email,phone,message});
        }
        catch(err){
            console.log(err);
        }
    }
    
    return(
        <div className="profile">
            <div className="profileUserInfo">
                <div className="profileUserName">Contact Us</div>
            </div>
            <div className=" registerForm contactusForm">
                    <label className="registerFormLabel">Username</label>
                    <input type="text" placeholder="Enter your username" className="registerInput contactUsInput" onChange={e=>setUsername(e.target.value)}/>
                    <label className="registerFormLabel">Email</label>
                    <input type="text" placeholder="Enter your Email" className="registerInput contactUsInput" onChange={e=>setEmail(e.target.value)}/>
                    <label className="registerFormLabel">contact</label>
                    <input type="number" className="registerInput contactUsInput" placeholder="Enter your Contact" onChange={e=>setPhone(e.target.value)}/>
                    <label className="registerFormLabel">Message</label>
                    <textarea type="text" placeholder="Type your message here..." rows="6" className="contactUsInput registerInput" onChange={e=>setMessage(e.target.value)}/>
                    <button className="registerButton" onClick={handleSubmit}>Submit</button>
                
            </div>
            
        </div>
    )
}

export default ContactUs;