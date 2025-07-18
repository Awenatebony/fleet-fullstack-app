import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
const LoginForm = () => {
    // const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const  onSubmitForm = async (e) =>{
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/api/users/login", {
                method:"Post",
                headers: {"Content-Type":"application/json"},
                body:JSON.stringify({ email, password})
            });
            if(!response.ok){
                alert("Error Fetching Data from api")
                return
            }

            const data = await(response.json())
            console.log(data)
            alert(` you are  Welcome`)

        } catch (error) {
            console.error("Error Occurred, after data fetched", error.message)
        }

        setEmail('')
        setPassword('')


    }

    
  return (
    <div>
        <form onSubmit={onSubmitForm}>

            {/* Email Section  */}

            <label>Email</label>
            <input type="email" 
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            placeholder='Enter email here: '
            />

            {/* Password Section */}
            <br/>

            <label>Password</label>
            <input type="password" 
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            placeholder='Enter password here: '
            />

            <br/>

            <button type='submit'>Submit</button>
        </form>
        
        
        <div>
            <p>Don't Have an account <Link to="/register" >register</Link> </p>
        </div>
    </div>
  )
}

export default LoginForm