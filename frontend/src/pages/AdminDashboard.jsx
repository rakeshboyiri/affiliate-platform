import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UpdateForm from "./UpdateForm";
const AdminDashboard = ()=>{
    const navigate = useNavigate();
    const [clientsData,setClientsData] = useState();
    const [productsData,setProductsData] = useState();
    const [addClient,setAddClient] = useState(false);
    const token = localStorage.getItem("token");
    const role =  localStorage.getItem("role");
    const [addClientData,setAddClientData] = useState({name:'',email:'',password:''});
    const [isEditing,setIsEditing] = useState(true);
    const [editClient, setEditClient] = useState(null);
    const [updatedData, setUpdatedData] = useState({id:"", name: "", email: "" });


    const fetchData = async()=>{
        try{
            const response = await fetch("http://localhost:5000/admin/clients",{
                method:"POST",
                headers: { 'Content-Type': 'application/json' },
                body:JSON.stringify({token,role})
            })
            const clients = await response.json();
            setClientsData(clients.clients);
            // console.log(clients.clients);
        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{

    fetchData();
    },[]);

    const submitAddClient = async(e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/admin/add-client",{
            method:"POST",
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(addClientData)
        })
        const data = await response.json()
        console.log(data);
        if(response.ok){
            setAddClient(!addClient);
            navigate(0);
        }
    }

    const handleAddClient = (e)=>{
        const {name,value} = e.target;
        // console.log(name,value);
        setAddClientData((prev)=>({...prev,[name]:value}));
    }

    const handlClientChange =(e)=>{
        const {name,value} = e.target;
        setUpdatedData((prev)=>({...prev,[name]:value}));
        // console.log(name,value);

    }

    const handleEditClick = (client)=>{
        // console.log(client);
        setEditClient(client.id);
        setUpdatedData({id:client.id, email:client.email,name:client.name});
        // console.log(updatedData);
    }

    const handleCancelEdit = (e)=>{
        setEditClient(null);
    }

    const handleSave =async(e)=>{
        // console.log(updatedData);
        try{
        const response = await fetch("http://localhost:5000/admin/client-update",{
            method:"PUT",
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(updatedData)
        })
        console.log(await response.json());
        setEditClient(null);
        fetchData();
        }catch(err){
            console.log(err);
        }       
    }

    const handleDelete = async(client)=>{
        const id = client.id;
        try{
            const response = await fetch("http://localhost:5000/admin/client-delete",{
                method:"DELETE",
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({id})
            })
            const data = await response.json();
            console.log(data);
            fetchData();
        }catch(err){
            console.log(err);
        }
    }
    
    return (
        <div className="m-4">
            <h1>Admin Dashboard</h1>
            <br/>
           <h2><button className="bg-green-500 rounded" onClick={()=>{setAddClient(!addClient)}}>Add Client</button></h2>
           {
            addClient &&(
                <form>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" onChange={handleAddClient} value={addClientData.name}/>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" onChange={handleAddClient} value={addClientData.email}/>
                    <label htmlFor="name">Password</label>
                    <input type="password" id="password" name="password" onChange={handleAddClient} value={addClientData.password}/>
                    <button type="submit" onClick={submitAddClient}>Add</button>
                </form>
            )
           }
           <br/><br/>   

           <h1>Clients Data</h1>
           <table className="border min-w-full border-gray-700 center">
            <thead className="bg-gray-300">
                <tr>
                <th className="border border-gray-400 px-4 py-2 ">SL.No</th>
                    <th className="border border-gray-400 px-4 py-2 ">Name</th>
                    <th className="border border-gray-400 px-4 py-2 ">Email</th>
                    <th className="border border-gray-400 px-4 py-2  text-center">Id</th>
                    <th className="border border-gray-400 px-4 py-2  text-center">Options</th>
                </tr>
            </thead>
            <tbody>         
            {
            clientsData && clientsData.map((client,index) => (

                <tr key={client.id}>
                <td className="border border-gray-400 px-4 py-2  text-center">{index+1}</td>
                {
                    editClient===client.id ? (
                         
                       <td><input type="text" id="name" name="name" value ={updatedData.name} onChange={handlClientChange}/></td> 
                    ):(
                        <td className="border border-gray-400 px-4 py-2  text-center">{client.name}</td>
                    )
                }
                
                <td className="border border-gray-400 px-4 py-2  text-center">{client.email}</td>
                <td className="border border-gray-400 px-4 py-2  text-center">{client.id}</td>  
                <td>
                    {editClient===client.id ? (
                        <span>
                        <button onClick={(e)=>{handleSave(client)}} className="p-2">Save</button>
                        <button onClick={(e)=>{handleCancelEdit(client)}} className="p-2">Cancel</button>
                        </span>
                    ):(
                        <span>
                        <button onClick={(e)=>{handleEditClick(client)}} className="p-2">Update</button>
                        <button onClick={(e)=>{handleDelete(client)}} className="p-2">Delete</button>
                        </span>
                    )                    
                    }
                    
                    {/* <button>Delete</button>
                    <button>Hold/Grant</button> */}
                </td>              
                </tr>
            ))
            }
            </tbody>
            </table>

        </div>
    )
}

export default AdminDashboard;