import React,{useState,useEffect} from 'react';
import axios from 'axios';
import './Profile.css';
import Post from '../post/Post';
import {useLocation} from 'react-router';
import {Context} from '../../context/Context';
import { useContext } from "react";

const Profile=()=>{
    const { user } = useContext(Context);
    const [posts,setPosts]=useState([]);
    const {search}=useLocation();
    useEffect(()=>{
        const fetchPosts=async()=>{
            console.log(user);
            const res=await axios.get(`/post/?user=${user.username}`)
            setPosts(res.data);
        }
        console.log(search)
        fetchPosts();
    },[search])
    return(
        <div className="profile">
            <div className="profileUserInfo">
                <div className="profileUserName">Hello, {user.username} !!</div>
                <div className="profileUserEmail">{user.email}</div>
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