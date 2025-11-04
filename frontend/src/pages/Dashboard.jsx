import { useNavigate } from "react-router-dom";

const Dashboard = () =>{
    const navigate = useNavigate();
    const handleLogout = ()=>{
        localStorage.removeItem("token");
        navigate("/login");
        navigate(0);
    }
    console.log(localStorage.getItem("role"));
    return (
        <div>
            <h1>Dashboard</h1>
           <br/>
           <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Dashboard;