import React,{useEffect, useState} from "react";
import { createUser } from "../api/mockData";
import axios from "axios";

const UserList = () => {
    const [users,setUsers] = useState([]);
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [editingUserId,setEditingUserId] = useState(null);

    const baseURL = 'http://localhost:3001/users';


//Read (Fetch Users)
    useEffect(() => {
        const fetchUsers = async () => {
            const response = await axios.get(baseURL);
            setUsers(response.data);
        };
        fetchUsers();
    },[]);

//Create or Update
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(editingUserId){
            //Update existing User
            const response = await axios.put(`${baseURL}/${editingUserId}`,{name,email});
            setUsers(users.map(user => user.id === editingUserId ? response.data : user));
        }
        else{
            //Create new user
            const response = await axios.post(baseURL,{name,email});
            setUsers([...users,response.data]);
        }
        setName('');
        setEmail('');
        setEditingUserId(null);
    };
    
    //Delete
    const handleDelete = async (id) => {
        await axios.delete(`${baseURL}/${id}`);
        setUsers(users.filter(user => user.id !== id));
    };

    //Set user data for editing
    const handleEdit = (user) => {
        setName(user.name);
        setEmail(user.email);
        setEditingUserId(user.id);
    };

    return(
        <div>
            <h1>User List</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required></input>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setName(e.target.value)} required></input>
                <button type="submit">{editingUserId ? 'Update User' : 'Create User'}</button>
            </form>
            <ul>
                {users.map(user => (
                <li key={user.id}>
                    {user.name} ({user.email})
                    <button onClick={() => handleEdit(user)}>Edit</button>
                    <button onClick={() => handleDelete(user.id)}>Delete</button>
                </li>))}
            </ul>
        </div>
    );
};export default UserList;