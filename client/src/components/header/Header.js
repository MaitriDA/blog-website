import React from 'react';
import './header.css';
import image from '../../images/coffee.jpg';

const Header=()=>{
    return(
        <div className="header">
            <div className="headerTitle">
                <span className="headerBig">Blog</span>
            </div>
            <img className="headerImage" src={image}/>
        </div>
    )
}

export default Header;