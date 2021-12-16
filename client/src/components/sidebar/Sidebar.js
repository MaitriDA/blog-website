import React,{useState,useEffect} from 'react';
import './Sidebar.css';
import axios from 'axios';
import {Link} from 'react-router-dom'

const Sidebar=()=>{
    const [cat,setCat]=useState([]);

    useEffect(()=>{
        const getCats=async()=>{
            const res=await axios.get('/category');
            setCat(res.data);
        }
        getCats();
    },[])
    return(
        <div className="sidebar">
            <div className="sidebarItem">
                <span className="sidebarTitle">CATEGORIES</span>
                <ul className="sidebarList">
                    {cat.map(c=>(
                    <Link to={`/?cat=${c.name}`} className="link"><li className="sidebarListItem">{c.name}</li></Link>
                    ))}
                    
                </ul>
            </div>
        </div>
    )
}

export default Sidebar;