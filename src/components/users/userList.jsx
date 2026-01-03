const { useState, useEffect } = require("react")

const UserCreate = () => {
    const [users, setUsers] = useState(() => {
        const savedUsers = localStorage.getItem("users")
        return savedUsers ? JSON.parse(savedUsers) : []
    });
    const [user, setUser] = useState({

        id: "",
        name: "",
        email: "",
        address: "",
        phone: "",
        age: ""
    });

    useEffect(() => {
        localStorage.setItem("users", JSON.stringify(users));
    }, [users]);

    // Handle input Change
    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    // Add New User
    const handleAddUser = () => {
        if (!user.name || !user.email)
            return;
        const newUser = { ...user, id: Date.now() };
        setUsers([...users, newUser]);
        setUser({ id: "", name: "", email: "", address: "", phone: "", age: "" });

    };
    return (
        <div>
            <h2>Create User</h2>
            <input
                type="text"
                name="name"
                placeholder="Input Your Full Name"
                value={user.name}
                onChange={handleChange}
            />
            <input
                type="email"
                name="email"
                placeholder="Input Your Email Address"
                value={user.email}
                onChange={handleChange}
            />
            <input
                type="text"
                name="address"
                placeholder="Input Your Address"
                value={user.address}
                onChange={handleChange}
            />
            <input
                type="text"
                name="phone"
                placeholder="Input Your Phone Number"
                value={user.phone}
                onChange={handleChange}
            />
            <input
                type="text"
                name="age"
                placeholder="Input Your Age"
                value={user.age}
                onChange={handleChange}
            />
            <button onClick={handleAddUser}> Add User</button>
            <h3>User List</h3>
            <ul>
                {users.map((u) => (
                    <li key={u.id}>
                        {u.name} | {u.email} | {u.address} | {u.phone} | {u.age}
                    </li>
                ))}
            </ul>
        </div>

    );
};


export default UserCreate;