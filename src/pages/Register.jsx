// import React, { useState } from "react";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../firebase";
// import { useNavigate } from "react-router-dom";

// const Register = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     try {
//       await createUserWithEmailAndPassword(auth, email, password);
//       navigate("/");
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   return (
//     <div>
//       <h2>Register</h2>
//       <form onSubmit={handleRegister}>
//         <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
//         <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
//         <button type="submit">Sign Up</button>
//       </form>
//     </div>
//   );
// };

// export default Register;


import { createUserWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const handleLogin = () => {
     navigate("/login")
  }
  const handlesubmit = async (e) => {
    e.preventDefault();
    try{
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/")
    }catch(error){
      const errorMessage = error.message;
    }
    
  }
  return (
    // <div>
    //   <form onSubmit={handlesubmit}>
    //     <input value={email} type="email" placeholder='enter email' onChange={(e) => setEmail(e.target.value)} />
    //     <input type="password" placeholder='pasword' onChange={e => setPassword(e.target.value)} />
    //     <button type="submit">Sign Up</button>
    //   </form>
    // </div>
    <div className='custom-container'>
      <div className="sign-up-heade d-flex justify-content-between">
        <picture>
          <source media="(max-width: 960px)" srcSet="https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/227_Netflix_logo-512.png" width={45} />
          <img
            className="register-logo"
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            alt="Netflix logo"
            width={150}
          />
        </picture>

        <div className="d-flex gap-3">
          <div className="dropdown">
            <button className="custom-btn btn text-white bg-transparent dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{width:121}}>
            <svg className='me-1 mb-1' xmlns="http://www.w3.org/2000/svg" fill="none" role="img" viewBox="0 0 16 16" width="16" height="16" data-icon="LanguagesSmall" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M10.7668 5.33333L10.5038 5.99715L9.33974 8.9355L8.76866 10.377L7.33333 14H9.10751L9.83505 12.0326H13.4217L14.162 14H16L12.5665 5.33333H10.8278H10.7668ZM10.6186 9.93479L10.3839 10.5632H11.1036H12.8856L11.6348 7.2136L10.6186 9.93479ZM9.52722 4.84224C9.55393 4.77481 9.58574 4.71045 9.62211 4.64954H6.41909V2H4.926V4.64954H0.540802V5.99715H4.31466C3.35062 7.79015 1.75173 9.51463 0 10.4283C0.329184 10.7138 0.811203 11.2391 1.04633 11.5931C2.55118 10.6795 3.90318 9.22912 4.926 7.57316V12.6667H6.41909V7.51606C6.81951 8.15256 7.26748 8.76169 7.7521 9.32292L8.31996 7.88955C7.80191 7.29052 7.34631 6.64699 6.9834 5.99715H9.06968L9.52722 4.84224Z" fill="currentColor"></path></svg>
              English
            </button>
            <ul class="dropdown-menu">
              <li><a className="dropdown-item" href="#">English</a></li>
              <li><a className="dropdown-item" href="#">हिन्दी</a></li>
            </ul>
          </div>

          <div>
            <button onClick={handleLogin} style={{width:76}} className='bg-white text-black custom-btn'>Sign In</button>
          </div>
        </div>
        
      </div>

      <div className="sign-up-div hero-bg">
        
        <div className='sign-up' style={{marginTop:"100px"}}>
          <h1 className='sign-up-title-h1'>Unlimited movies, TV shows and more</h1>
          <p className='sign-up-title-p'>Starts at ₹149. Cancel at any time.</p>
          <h3 className='sign-up-title-h3'>Ready to watch? Enter your email to create or restart your membership.</h3>
          <form onSubmit={handlesubmit}>
            <div className="sign-up-form">
              <input className='sign-up-btns ' style={{marginLeft:"46px"}} value={email} type="email" placeholder='enter email' onChange={(e) => setEmail(e.target.value)} />
              <input className='sign-up-btns' style={{width:229,marginLeft:"10px"}} type="password" placeholder='pasword' onChange={e => setPassword(e.target.value)} />
            </div>
            <button className='sign-up-btns sign-up-button' style={{backgroundColor:"red",margin:"23px 165px"}} type="submit">Sign Up</button>
          </form>
        </div>
        
     
        
      <div>
    </div>

      </div>
      <div className="sign-up-trendingNow">

      </div>

    </div>
  )
}

export default Register
