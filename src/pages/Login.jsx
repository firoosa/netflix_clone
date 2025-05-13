// import React, { useState } from "react";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../firebase";
// import { useNavigate } from "react-router-dom";
// import bg1 from "../assets/bg1.jpg"

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       navigate("/");
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   return (
//     <div
//       className="login-page"
//       style={{
//         backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.65)), url(${bg1})`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         height: '100vh',
//       }}
//     >
//       <div className="login-box">
//         <h2>Sign In</h2>
//         <form onSubmit={handleLogin}>
//           <input type="email" placeholder="Email"onChange={e => setEmail(e.target.value)} />
//           <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
//           <button type="submit">Sign In</button>
//         </form>
//         <p>
//           New to Netflix? <a href="/register">Sign up now</a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;


// import React, { useState } from "react";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../firebase";
// import { useNavigate } from "react-router-dom";
// import bg3 from "../assets/bg3.jpg";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       navigate("/");
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   return (
    
//     <div
//       className="login-page"
//       style={{
//         backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.65)), url(${bg3})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         height: "100vh",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       <div className="login-box">
//         <h2>Sign In</h2>
//         <form onSubmit={handleLogin}>
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             required
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             required
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <button type="submit">Sign In</button>
//         </form>

//         <div className="login-or">OR</div>

//         <div className="login-links">
//           <a href="#">Forgot password?</a>
//         </div>

//         <p className="signup-link">
//           New to Netflix? <a href="/register">Sign up now.</a>
//         </p>

//         <div className="recaptcha-text">
//           This page is protected by Google reCAPTCHA to ensure you're not a bot.
//           <a href="#" target="_blank" rel="noopener noreferrer"> Learn more.</a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import bg1 from "../assets/bg1.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div
      className="login-page"
      style={{
        backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.65)), url(${bg1})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        // position: "relative",
      }}
    >
      {/* Netflix Logo Top-Left */}
      <img
        className="register-logo"
        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
        alt="Netflix logo"
        width={150}
        style={{
          margin:"20px 160px"
          // position: "absolute",
          // top: "20px",
          // left: "30px",
          // zIndex: 10,
        }}
      />

      <div
        className="login-box"
        style={{
          maxWidth: "350px",
          margin: "0 auto",
          marginTop: "40px",
          backgroundColor: "rgba(0, 0, 0, 0.75)",
          padding: "60px 40px",
          borderRadius: "4px",
          color: "white",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>Sign In</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          />
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "red",
              border: "none",
              color: "white",
              fontWeight: "bold",
              marginTop: "10px",
              cursor: "pointer",
            }}
          >
            Sign In
          </button>
        </form>

        <div style={{ marginTop: "10px", textAlign: "center" }}>OR</div>
        <div style={{ marginTop: "10px", textAlign: "center" }}>
          <a href="#">Forgot password?</a>
        </div>

        <p style={{ marginTop: "20px", fontSize: "14px" }}>
          New to Netflix? <a href="/register">Sign up now.</a>
        </p>

        <div style={{ fontSize: "12px", marginTop: "20px", color: "#999" }}>
          This page is protected by Google reCAPTCHA to ensure you're not a bot.{" "}
          <a href="#">Learn more.</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
