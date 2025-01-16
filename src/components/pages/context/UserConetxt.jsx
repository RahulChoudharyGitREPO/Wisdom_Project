import { createContext, useState } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUsers = async () => {
        try {
            const res = await axios.get("https://jsonplaceholder.typicode.com/users");
            setUsers(res.data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    return (
        <UserContext.Provider value={{ users, fetchUsers, loading, error }}>
            {children}
        </UserContext.Provider>
    );
};
