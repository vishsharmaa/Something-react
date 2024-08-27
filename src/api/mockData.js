import jsonServer from "./jsonServer";

//Fetch all users
export const getUser = async() => {
    const response = await jsonServer.get('/users');
    return response.data;
}

//Fetch a single user by ID
export const getUserById = async(id) => {
    const response = await jsonServer.get(`/users/${id}`);
    return response.data;
};

//Create a new user
export const createUser = async(user) => {
    const response = await jsonServer.post('/users/',user);
    return response.data;
};

//Update a user by ID
export const UpdateUser = async(id,user) => {
    const response = await jsonServer.put(`/users/${id}`,user);
    return response.data;
};

//Delete a user by ID
export const DeleteUser = async(id) => {
    await jsonServer.delete(`/users/${id}`);
};