import React,{useState,useEffect} from 'react';
import Header from '../header/Header';
import Posts from '../posts/Posts';
import Sidebar from '../sidebar/Sidebar';
import './Home.css';
import axios from 'axios';
import {useLocation} from 'react-router';
import Profile from '../profile/Profile';

const Home=()=>{
    const [posts,setPosts]=useState([]);
    const {search}=useLocation();
    useEffect(()=>{
        const fetchPosts=async()=>{
            const res=await axios.get("/post/"+search)
            setPosts(res.data);
        }
        console.log(search)
        fetchPosts();
    },[search])
    return(
        <>
            <Header/>
            <div className="home">
                <Sidebar/>
                <Posts posts={posts}/>
            </div>
        </>
    )
}

export default Home