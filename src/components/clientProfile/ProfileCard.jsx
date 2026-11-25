"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getMe } from "@/lib/api";
import { showError } from "@/utils/toast-helper";

export default function ProfileCard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const data = await getMe();
        setUser(data);
      } catch (error) {
        showError("Please login first");
        router.push("/user/login");
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, [router]);

  if (loading) {
    return <p className="text-center mt-20">Loading...</p>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-md mx-auto mt-20 mb-20 p-6 rounded-lg shadow bg-white">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>

      <div className="mb-3">
        <p className="text-sm text-gray-500">Name</p>
        <p className="font-medium">{user.name}</p>
      </div>

      <div className="mb-3">
        <p className="text-sm text-gray-500">Email</p>
        <p className="font-medium">{user.email}</p>
      </div>

      <div>
        <p className="text-sm text-gray-500">Role</p>
        <p className="font-medium">{user.role}</p>
      </div>
    </div>
  );
}