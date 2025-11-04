import { useNavigate } from "react-router-dom";

const ClientDashboard = ()=>{
    const navigate = useNavigate();
    const handleLogout = ()=>{
        localStorage.removeItem("token");
        navigate("/login");
        navigate(0);
    }
    return (
        <div>
            <h1>Client Dashboard</h1>
            <br/>
           <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default ClientDashboard;