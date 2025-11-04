import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ()=>{
    const [formData,setFormData] = useState({email:'',password:''});
    const navigate = useNavigate();
    const changeHandle = (e)=>{
        const {name,value} = e.target;
        setFormData((prev)=>({...prev,[name]:value}));
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
       try{
        const response = await fetch("http://localhost:5000/login",{
            method : "POST",
            headers: { 'Content-Type': 'application/json' },
            body:JSON.stringify(formData)
        })
        const data = await response.json();
        if (response.ok){
            localStorage.setItem("token",data.token);
            localStorage.setItem("role",data.role);
            if(data.role=="admin"){
                navigate("/admin-dashboard");
                navigate(0); 
            }else if (data.role=="client"){
                navigate("/client-dashboard");
                navigate(0); 
            }
            else{
                navigate("/user-dashboard");
                navigate(0); 
            }
            
        }else{
            alert(data.error || "Login failed");
        }
       }catch (err){
            console.log(err);
       }
    }
    return(
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" onChange={changeHandle} value={formData.email} required/>
                <br/>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password"  onChange={changeHandle} value={formData.password} required/>
                <br/>
                <button type="submit">Submit</button>
            </form>

        </div>
    )
}

export default Login;