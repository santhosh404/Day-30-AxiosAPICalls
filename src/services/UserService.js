import axios from "axios"

const BASE_URL = 'https://66288f0654afcabd073622d1.mockapi.io/guvicrud/api/v1'

//Getting all the user
export const getUsers = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/users`);
        if (response.data) {
            return response.data;
        }
    }
    catch (error) {
        throw error;
    }
}               

//Getting the single user
export const getSingleUser = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/users/${id}`);
        if (response.data) {
            return response.data;
        }
    }
    catch (error) {
        throw error;
    }
}


//Create the user
export const createUser = async (payload) => {
    try {
        const response = await axios.post(`${BASE_URL}/users`, {...payload});
        if (response.data) {
            return response.data;
        }
    }
    catch (error) {
        throw error;
    }
}


//Update the user
export const updateUser = async (id, payload) => {
    try {
        const response = await axios.put(`${BASE_URL}/users/${id}`, {...payload});
        if (response.data) {
            return response.data;
        }
    }
    catch (error) {
        throw error;
    }
}

//Delete the user
export const deleteUser = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/users/${id}`);
        if (response.data) {
            return response.data;
        }
    }
    catch (error) {
        throw error;
    }
}