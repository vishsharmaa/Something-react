import React,{useState} from "react";
import { createUser } from "../api/mockData";

const UserForm = () => {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newUser = {name,email};
        await createUser(newUser);
        setName('');
        setEmail('');
    };
    return(
        <form onSubmit={handleSubmit}>
            <h2>Create User</h2>
            <div>
                <label>Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}></input>
            </div>
            <div>
                <label>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
            </div>
                <button type="submit">Create</button>
        </form>
    );
};
export default UserForm;