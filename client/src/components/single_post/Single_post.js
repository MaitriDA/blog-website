import React,{useEffect,useState,useContext} from 'react';
import './Single_post.css';
import image from '../../images/tech.jpg';
import { useLocation } from 'react-router';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {Context} from '../../context/Context.js';

const Single_post=()=>{
    const location=useLocation();
    const path=location.pathname.split("/")[2];
    const [post,setPost]=useState({});
    const PF="http://localhost:5000/images/";
    const{user}=useContext(Context);
    const [title,setTitle]=useState("");
    const [description,setDescritpion]=useState("");
    const [update,setUpdate]=useState(false);

    const handleDelete=async()=>{
        try{
            const res=await axios.delete(`/post/${post._id}`,{data:{username:user.username}})
            window.location.replace("/");
        }
        catch(err){
            console.log("error")
        } 
    }

    const handlePostUpdate=async()=>{
        try{
            const res=await axios.put(`/post/${post._id}`,{
                username:user.username,
                title:title,
                description:description,
            })
            setUpdate(false);
        }
        catch(err){
            console.log(err);
        }
    }
    
    useEffect(()=>{
        const getPost=async()=>{
            const res=await axios.get("/post/"+path);
            setPost(res.data);
            setTitle(res.data.title);
            setDescritpion(res.data.description);
        }
        getPost();
    },[path])
    return(
        <>
            
            {update?(<div className="write">
                <div className="writeForm">
                <div className="writeHeading">Update you Story..</div>
                    <div className="imageContainer">
                        <img src={PF+post.photo} className="writeImg" alt="blogimage"/>
                    </div>
                    <div className="writeFormGroup">
                        <div className="addImg">
                            <label htmlFor="fileInput">
                            <i className="addIcon fas fa-plus-circle"></i>    
                            </label>
                            <input type="file" id="fileInput" style={{display:"none"}}/>
                            <textarea type="text" placeholder="Title" rows="1" className="writeInput writeText" value={title} onChange={e=>setTitle(e.target.value)}></textarea>  
                        </div>
                        <textarea placeholder="Tell your story" type="text" className="writeInput writeText" rows="6" value={description} onChange={e=>setDescritpion(e.target.value)}></textarea>
                    </div>

                    <button className="writeSubmit" onClick={handlePostUpdate}>Update</button>
                </div>
            </div>):(<div className="single">
            <div className="singlePost">
                {post.photo && (
                    <img src={PF+post.photo} className="singlePostImg" alt="blogImage"/>
                )}
                        <div className="singlePostTop">
                            <div className="singlePostTitle">{post.title}</div>
                            {post.username===user?.username && (
                                <div className="singlePostIcon">
                                <div className="singlePostEdit"><i className="fas fa-edit singlePostEditIcon" onClick={e=>setUpdate(true)}></i></div>
                                <div className="singlePostDelete" ><i className="far fa-trash-alt singlePostDeleteIcon" onClick={handleDelete}></i></div>
                            </div>
                            )}
                        </div>
                        <div className="singlePostInfo">
                        <div className="singlePostAuthorDate">
                            <span className="singlePostAuthor">Author:<Link to={`/?user=${post.username}`} className="link">
                            <b>{post.username}</b>
                            </Link> </span>
                            <span className="singlePostDate">{new Date(post.createdAt).toDateString()}</span>
                        </div>
                            <p className="singlePostDescription">{post.description}</p>
                        </div>
                    </div>
                    </div>)}
        </>
    )
}

export default Single_post;