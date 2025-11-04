import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = ()=>{
    const [formData,setFormData] = useState({
        email:"",
        password:"",
        name:""
    });
    const navigate = useNavigate();

    const handleChange = (e)=>{
        const {name,value} = e.target;
        setFormData((prev)=>({...prev,[name]:value}))

    }
    const sendData =async (e)=>{
        e.preventDefault();
        try{
       const response = await fetch("http://localhost:5000/signin",{
        method:"POST",
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify(formData)
       });
       if(response.status==200){
            navigate("/login");
       }
       const data = await response.json();
    }catch(err){
        console.log(err);
    }
    }

    return (
        <div>
            <h1>Registartion Form</h1>
            <form onSubmit={sendData}>
                <label htmlFor="name">Enter Name : </label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required/>
                <br/>
                <label htmlFor="email">Enter Email : </label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required/>
                <br/>
                <label htmlFor="password">Enter Password : </label>
                <input type="password" id="password" name="password"  value={formData.password} onChange={handleChange} required/>
                <button type="submit">Submit</button>
            </form>
           
        </div>
    );
}

export default Register;