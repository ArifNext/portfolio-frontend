"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getMe, getUsers } from "@/lib/api";
import { showError } from "@/utils/toast-helper";

export default function UserList() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUsers() {
      try {
        const me = await getMe();

        if (me.role !== "admin") {
          router.push("/user/profile");
          return;
        }

        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        showError(error.message);
        router.push("/user/login");
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, [router]);

  if (loading) {
    return <p className="text-center mt-20">Loading...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 mb-20 p-6 rounded-lg shadow bg-white">
      <h1 className="text-2xl font-bold mb-1">User List</h1>
      <p className="text-gray-500 mb-4">Total: {users.length}</p>

      <table className="w-full text-left">
        <thead>
          <tr className="border-b text-gray-500 text-sm">
            <th className="py-2">ID</th>
            <th className="py-2">Name</th>
            <th className="py-2">Email</th>
            <th className="py-2">Role</th>
            <th className="py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b">
              <td className="py-2">{user.id}</td>
              <td className="py-2">{user.name}</td>
              <td className="py-2">{user.email}</td>
              <td className="py-2">{user.role}</td>
              <td className="py-2">
                {new Date(user.created_at).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}