import React from 'react';
import logo_img from './logo_image.png'


export default function Logo(){
    return (
        <div className='logo_container'>
            <h2 className='logo_heading'>Remove Image Background</h2>
            <div className='logo_img'>
                <img src={logo_img} alt='' />
            </div>
        </div>
    )
};