import React, { useState,useEffect } from 'react';
import './Post.css';
import tech from '../../images/tech.jpg';
import {Link} from 'react-router-dom';
import blogImage from '../../images/blog.jpg';
import axios from 'axios'

const Post=({post})=>{
    const [cat,setCat]=useState([]);

    useEffect(()=>{
        setCat(post.category);  
    })

    const PF="http://localhost:5000/images/";
    return(
        <div className="post">
        {post.photo ? (
            <img src={PF+post.photo} className="postImage" alt="blogimage"/> 
        ):(
            <img src={blogImage} className="postImage" alt="blogimage"/> 
        )}
            <div className="postInfo">
                <div className="postCats">
                {/* <span className="postCat">category</span> */}
                {cat.map((c)=>(
                    <span className="postCat">{c}</span>
                ))}</div>
                <Link to={`/post/${post._id}`} className="link">

                <span className="postTitle">{post.title}</span>
                </Link>
                <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
            </div>
            <p className="postDescription">{post.description}</p>
        </div>
    )
}

export default Post;