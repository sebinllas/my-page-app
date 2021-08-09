import React from 'react';
import './css/Profile.css'

export default function Profile(props) {
    return (
        <div className="Profile">
            <div className="profilePhoto">
                <img src={props.profilePhoto}  alt="ProfilePhoto"/> 
            </div>
           
           <h4 className='name'>{props.name}</h4>
        </div>
    )
}

