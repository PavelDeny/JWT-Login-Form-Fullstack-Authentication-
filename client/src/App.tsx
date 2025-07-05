import {useState}

from "react";
import "./index.css";

function App() {
   const [email,
   setEmail]=useState("");
   const [password,
   setPassword]=useState("");
   const [token,
   setToken]=useState("");

   const handleLogin=async (e: React.FormEvent)=> {
      e.preventDefault();

      try {
         const res=await fetch("http://localhost:5000/login", {

               method: "POST",
               headers: {
                  "Content-Type": "application/json"
               }

               ,
               body: JSON.stringify( {
                     email, password
                  }

               )
            }

         );

         const data=await res.json();

         if (res.ok) {
            setToken(data.token);
         }

         else {
            alert(data.message || "Login failed");
         }
      }

      catch (err) {
         console.error("Login error:", err);
         alert("Error logging in");
      }
   }

   ;

   return (<div style= {
            {
            padding: "2rem"
         }
      }

      > <h1>JWT Login</h1> <form onSubmit= {
         handleLogin
      }

      > <div> <label>Email:</label> <input value= {
         email
      }

      onChange= {
         (e)=> setEmail(e.target.value)
      }

      type="email"

      required /> </div> <div> <label>Password:</label> <input value= {
         password
      }

      onChange= {
         (e)=> setPassword(e.target.value)
      }

      type="password"

      required /> </div> <button type="submit">Login</button> </form> {
         token && (<div> <h2>JWT Token:</h2> <pre> {
               token
            }

            </pre> </div>)
      }

      </div>);
}

export default App;