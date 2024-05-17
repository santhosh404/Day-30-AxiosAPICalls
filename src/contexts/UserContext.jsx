import { createContext, useContext, useEffect, useState } from "react";
import { deleteUser, getUsers } from "../services/UserService";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";


const UserContext = createContext();

export const UserContextProvider = ({ children }) => {

    const [allUsers, setAllUsers] = useState([])
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
    const toast = useToast()

    const fetchUsers = async () => {
        setLoading(true)
        try {
            const users = await getUsers();
            setAllUsers(users);
            setLoading(false)
        } catch (error) {
            toast({
                title: "Error",
                description: error.message,
                status: "error",
                duration: 3000,
                isClosable: true
            })
            setLoading(false)
        }
    };

    useEffect(() => {
        fetchUsers()
    }, [])


    //Function to delete the user (Since it is needed for multiple component, I wrote it in context)
    const handleDelete = async (id) => {
        try {
            const deletedUser = await deleteUser(id);
            if (deletedUser) {
                toast({
                    title: "User Deleted",
                    description: "The user has been deleted successfully",
                    status: "success",
                    duration: 3000,
                    isClosable: true
                })
            }
            //fetching the updated data
            fetchUsers()

            //Navigating the user to home page
            navigate('/')

        } catch (error) {
            toast({
                title: "Error",
                description: error.message,
                status: "error",
                duration: 3000,
                isClosable: true
            })
            setLoading(false)
        }
    }

    return (
        <UserContext.Provider
            value={{ allUsers, setAllUsers, loading, setLoading, fetchUsers, toast, handleDelete }}
        >
            {children}
        </UserContext.Provider>
    )
}

// Creating the custom hook to handle UserContext
export const useUsers = () => useContext(UserContext)