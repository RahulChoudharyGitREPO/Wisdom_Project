import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UserDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios
            .get(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then((res) => setUser(res.data))
            .catch(console.error);
    }, [id]);

    if (!user) return <div className="text-3xl flex justify-center mt-80 items-center mx-auto">Loading...</div>;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-2xl font-bold mb-4 text-center">{user.name}</h1>
                <p className="text-gray-700 mb-2">
                    <span className="font-semibold">Email:</span> {user.email}
                </p>
                <p className="text-gray-700 mb-2">
                    <span className="font-semibold">Phone:</span> {user.phone}
                </p>
                <p className="text-gray-700 mb-2">
                    <span className="font-semibold">Company:</span> {user.company.name}
                </p>
                <p className="text-gray-700 mb-4">
                    <span className="font-semibold">Website:</span>{" "}
                    <a
                        href={`https://${user.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                    >
                        {user.website}
                    </a>
                </p>
                <button
                    onClick={() => navigate(-1)}
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
                >
                    Go Back
                </button>
            </div>
        </div>
    );
};

export default UserDetailPage;
