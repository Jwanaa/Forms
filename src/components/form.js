import { useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer,toast } from "react-toastify";
export default function Form ()  {
    const[username,setUsername]=useState("");
    const[email,setEmail]=useState("");
    const[job,setJob]=useState("");
    
  
    const submit = (e)=>
    {
     
        e.preventDefault();
        const map={ username,email,job};
        if (!username || !email || !job) {
            toast.warn("Please fill in all fields."); 
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.warn("Please enter a valid email address.");
      return;
    }

        fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(map),
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((body) => {
            console.log(body);
            setUsername("");
            setEmail("");
            setJob("");
            toast.success("Your post has been submitted successfully.");
           
        })
        .catch((error) => {
            console.error("There was a problem with the fetch operation:", error);
            toast.error("There was an error submitting your post."); // Notify user of error
      
        });
    
      
     
     
    }
     
    return ( 
<div>

<h1 >This is Form Page</h1>

<form onSubmit={submit}>
    

                
    <label htmlFor="username">UserName:</label>
    <input type="text" 
    id="username"
    value={username}
    placeholder="UserName"
    onChange={(e)=>{
       setUsername(e.target.value);
    }
    }
    />
    <br/>
    <label htmlFor="email">Email:</label>
    <input type="email" 
    id="email"
    value={email}
    placeholder="E-Mail"
     onChange={(e)=>{
setEmail(e.target.value);
    }
}
    />
    <br/>
    <label htmlFor="job">Job:</label>
    <select
    value={job}
    id="job"
    onChange={(e)=>{
 setJob(e.target.value);
   }
} 
    >
        <option   value="">Select Your Job</option>
        <option value="Frontend">FrontEnd Developer</option>
        <option value="Backend">Backend Developer</option>
        <option value="Fullstack">Fullstack Developer</option>

    </select>
    <br />
    <button type="submit">Submit</button>

</form>
<ToastContainer
position="bottom-left"
autoClose={4000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"

/>{/* Render ToastContainer for notifications */}
</div>

    );
}
