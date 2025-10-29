import React, { useEffect, useState } from "react";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch("https://fakestoreapi.com/users");
        const data = await res.json();
        const limitedUsers = data.slice(0, 10);
        setUsers(limitedUsers);
      } catch (error) {
        console.error(error);
      }
    }

    fetchUsers();
  }, []);

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {users.map((user) => (
        <div
          key={user.id}
          className="bg-white p-4 rounded-lg  transition"
        >
          <h2 className="text-lg font-semibold capitalize">
            {user.name.firstname} {user.name.lastname}
          </h2>
          <p className="text-gray-600"> {user.email}</p>
          <p className="text-gray-600"> {user.address.city}</p>
        </div>
      ))}
    </div>
  );
}

export default Users;
