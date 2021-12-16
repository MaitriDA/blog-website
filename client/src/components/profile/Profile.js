import React,{useState,useEffect} from 'react';
import axios from 'axios';
import './Profile.css';
import Post from '../post/Post';
import {useLocation} from 'react-router';

const Profile=()=>{
    const [posts,setPosts]=useState([]);
    const {search}=useLocation();
    useEffect(()=>{
        const fetchPosts=async()=>{
            const res=await axios.get(`/post/?user=${"demo"}`)
            setPosts(res.data);
        }
        console.log(search)
        fetchPosts();
    },[search])
    return(
        <div className="profile">
            <div className="profileUserInfo">
                <div className="profileUserName">Hello, Name !!</div>
                <div className="profileUserEmail">Email</div>
            </div>
            <div className="profilePosts">
            <div className="yourPosts">Your Posts,</div>
            <div className="postArea">
            {posts.map((p)=>(
                <Post post={p}/>
            ))}
            </div>
            
            </div>
        </div>
    )
}

export default Profile;