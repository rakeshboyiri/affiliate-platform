import {useNavigate, Link } from "react-router-dom";
import { useState,useEffect } from "react";

const Nav = () =>{
    const [isLogin,setIsLogin] = useState(false);
    const [role,setRole] = useState(null);
    const navigate = useNavigate();
    useEffect(()=>{
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");
        // console.log(role);
        setRole(role);
        setIsLogin(!!token);
    },[])

    const handleLogout = ()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        window.location.reload();
        navigate('/login');
    }
    return (
        <div className="bg-gray-300 w-full p-5">
            <div className="float-left w-1/5 text-center">Rakesh Deal's</div>
            <div className="float-left w-3/5 text-center">
            <ul className="flex justify-center space-x-7">
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/products'>Products</Link></li>
                <li><Link to='/blogs'>Blogs</Link></li>
                <li><Link to='/trenz'>Trendz</Link></li>
            </ul>
            </div>
            <div className="float-left w-1/5 text-center">
            {
                 isLogin ? (<><span className="mr-3"><Link to= {`/${role}-dashboard` }>Dashboard</Link></span><button onClick={handleLogout}>Logout</button></>):
                 (<h1>
                    <a href="/login">Login</a>
                 </h1>)
            }
            </div>
            <div className="clear-both"></div>
        </div>

    )
}

export default Nav;