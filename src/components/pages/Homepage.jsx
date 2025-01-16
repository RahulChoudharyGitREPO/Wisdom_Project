import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./context/UserConetxt";

const HomePage = () => {
    const { users, fetchUsers, loading, error } = useContext(UserContext);
    const [search, setSearch] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    useEffect(() => {
        fetchUsers();
    }, []);

    const filteredUsers = users
        .filter((user) =>
            user.name.toLowerCase().includes(search.toLowerCase())
        )
        .sort((a, b) =>
            sortOrder === "asc"
                ? a.name.localeCompare(b.name)
                : b.name.localeCompare(a.name)
        );

    // Pagination logic
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    if (loading)
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-3xl font-semibold">Loading...</div>
            </div>
        );

    if (error)
        return (
            <div className="flex justify-center items-center h-screen text-red-500">
                <div className="text-lg font-semibold">Error: {error}</div>
            </div>
        );

    return (
        <div className="container mx-auto p-4">
            {/* Search Bar */}
            <div className="flex items-center justify-between mb-4">
                <input
                    type="text"
                    placeholder="Search by name"
                    className="border-2 border-gray-400 w-full p-2 max-w-md rounded"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button
                    className="ml-4 bg-blue-500 text-white px-4  md:w-28 py-2 rounded hover:bg-blue-600 flex items-center"
                    onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                >
                    Sort: {sortOrder === "asc" ? "A-Z" : "Z-A"}
                    <span className="ml-2">{sortOrder === "asc" ? "↑" : "↓"}</span>
                </button>
            </div>

            {/* User Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentUsers.length === 0 ? (
                    <div className="text-center text-3xl flex justify-center items-center mx-auto  text-gray-500">
                        No users found
                    </div>
                ) : (
                    currentUsers.map((user) => (
                        <Link to={`/user/${user.id}`} key={user.id} className="block">
                            <div className="border-2 rounded-lg  shadow hover:shadow-lg h-64 p-16 transition duration-300">
                                <h2 className="font-bold text-lg mb-2">{user.name}</h2>
                                <p className="text-gray-600">Email: {user.email}</p>
                                <p className="text-gray-600">City: {user.address.city}</p>
                            </div>
                        </Link>
                    ))
                )}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-6">
                <button
                    className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span className="px-4 py-2">{currentPage} / {totalPages}</span>
                <button
                    className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default HomePage;
