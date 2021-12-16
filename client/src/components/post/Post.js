import React, { useState,useEffect } from 'react';
import './Post.css';
import tech from '../../images/tech.jpg';
import {Link} from 'react-router-dom';

const Post=({post})=>{
    const [cat,setCat]=useState([]);

    useEffect(()=>{
        const getCategory=()=>{
            setCat(post.category);
        }
    },[])

    const PF="http://localhost:5000/images/";
    return(
        <div className="post">
        {post.photo && (
            <img src={PF+post.photo} className="postImage" alt="blogimage"/>
            
        )}
            <div className="postInfo">
                <div className="postCats">
                {cat.map(c=>{
                    <span className="postCat">{c}</span>
                })}
                    
                    
                </div>
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