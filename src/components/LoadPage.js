import React from 'react'
import ReactWOW from 'react-wow';
import '../styles/LoadPage.scss';

export default function loadPage() {
    return (
        <div className="loadPage">
            <ReactWOW 
                animation='bounceInLeft' duration="2s" >
                    <span className="letter">S</span>
            </ReactWOW>
            <ReactWOW 
                animation='bounceInRight' duration="2s" delay="0.5s">
                    <span className="letter">t</span>
            </ReactWOW>
            <ReactWOW 
                animation='bounceInUp' duration="2s" delay="0.5s">
                    <span className="letter">u</span>
            </ReactWOW>
            <ReactWOW 
                animation='bounceInDown' duration="2s">
                    <span className="letter">d</span>
            </ReactWOW>
            <ReactWOW 
                animation='bounceInLeft' duration="2s"  delay="1.5s">
                    <span className="letter">y</span>
            </ReactWOW>
            <ReactWOW 
                animation='bounceInRight' duration="2s" delay="1s">
                    <span className="letter">L</span>
            </ReactWOW>
            <ReactWOW 
                animation='bounceInUp' duration="2s" delay="1.5s">
                    <span className="letter">i</span>
            </ReactWOW>
            <ReactWOW 
                animation='bounceInDown' duration="2s" delay="1.5s">
                    <span className="letter">n</span>
            </ReactWOW>
            <ReactWOW 
                animation='bounceInLeft' duration="2s"delay="1s">
                    <span className="letter">k</span>
            </ReactWOW>
        </div>
    )
}
