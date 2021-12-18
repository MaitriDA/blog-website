import React,{useState,useContext} from 'react';
import './Write.css';
import axios from 'axios';
import {Context} from '../../context/Context.js'

const Write=()=>{

    const [title,setTitle]=useState("");
    const [description,setDescription]=useState("");
    const [file,setFile]=useState(null);
    const {user}=useContext(Context)

    const handleSubmit=async (e)=>{
        console.log("inside dubmit");
        e.preventDefault();
        const newPost={
            username:user.username,
            title:title,
            description:description,
        };
        if(file){
            const data=new FormData();
            const filename=Date.now()+file.name;
            data.append('name',filename)
            data.append('file',file);
            newPost.photo=filename;
            try{
                await axios.post("/upload",data);
            }
            catch(err){
                console.log("error");
            }
            
        }
        try{
            const res=await axios.post("/post",newPost);
            window.location.replace("/post/"+res.data._id);
        }
        catch(err){
            console.log("error")
        }
        
    }
    return(
        <>
            <div className="write">
                <form className="writeForm" onSubmit={handleSubmit}>
                    <div className="writeHeading">Write you Story..</div>
                    <div className="imageContainer">
                    {file && (
                        <img className="writeImg"
                        src={URL.createObjectURL(file)} alt=""/>
                    )}
                        
                    </div>
                    <div className="writeFormGroup">
                        <div className="addImg">
                            <label htmlFor="fileInput">
                            <i className="addIcon fas fa-plus-circle"></i>    
                            </label>
                            <input type="file" id="fileInput" style={{display:"none"}} onChange={e=>setFile(e.target.files[0])}/>
                            <input type="text" placeholder="Title" className="writeInput" onChange={e=>setTitle(e.target.value)}/>  
                        </div>
                        <textarea placeholder="Tell your story" type="text" className="writeInput writeText" rows="6" onChange={e=>setDescription(e.target.value)}></textarea>
                    </div>

                    <button className="writeSubmit" type="submit">Publish</button>
                </form>
            </div>
        </>
    )
}

export default Write;