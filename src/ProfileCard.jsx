import React from "react";
import { useState } from "react";
import mage from "../src/assets/36213417.jpg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faGithub, faInstagram, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";


function ProfileCard () {
    const [card, setCard] = useState();

    return(
        <div style={{width:"500px", borderRadius:"10px", boxShadow:"10px", backgroundColor:"grey", padding:"10px", height:"300px", margin:"auto", display:"flex", flexDirection:"column",  marginTop:"50px"}}>
            <div className="top" style={{display:"flex", gap:"40px"}}>
                <img src={mage} style={{width:"130px", height:"130px", borderRadius:"50%"}} />
                <div className="text" style={{color:"white"}}>
                    <h1>Oyinlola AbdulMuiz</h1>
                    <h3>Frontend Developer</h3>
                </div>
            </div>
            <div className="butt" style={{color:"white"}}>
                <p>I am a frontend web developer who builds websites, web applications using REACT.js.</p>
                <h1>Socials</h1>
                <div className="socials" style={{display:"flex", gap:"5px"}}>
                    <a href="https://www.facebook.com/profile.php?id=100076106060063" style={{textDecoration:"none"}}><FontAwesomeIcon icon={faFacebook} size="2x"></FontAwesomeIcon></a>
                    <a href="https://www.instagram.com/oyinlolaabdulmuiz/" style={{textDecoration:"none"}}><FontAwesomeIcon icon={faInstagram} size="2x"></FontAwesomeIcon></a>
                    <a href="https://github.com/Abdulmuiz00" style={{textDecoration:"none"}}><FontAwesomeIcon icon={faGithub} size="2x"></FontAwesomeIcon></a>
                    <a href="https://www.linkedin.com/in/abdulmuiz-oyinlola-64815a2b6/" style={{textDecoration:"none"}}><FontAwesomeIcon icon={faLinkedinIn} size="2x"></FontAwesomeIcon></a>

                </div>
            </div>
        </div>
    )
}

export default ProfileCard;