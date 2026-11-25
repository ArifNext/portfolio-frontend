"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { getMe } from "@/lib/api";

export default function AdminNavbar() {
  const pathname = usePathname();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function checkAdmin() {
      try {
        const user = await getMe();
        setIsAdmin(user.role === "admin");
      } catch (error) {
        setIsAdmin(false);
      }
    }

    checkAdmin();
  }, [pathname]);

  if (!isAdmin) {
    return null;
  }

  return (
     <div className="relative z-50 w-full bg-gray-800 text-white text-sm">
      <div className="max-w-6xl mx-auto px-4 py-2 flex items-center gap-6">
        <span className="font-semibold text-red-400">Admin</span>
        <Link href="/admin/usersget">User List</Link>
        <Link href="/admin/projects">Projects</Link>
        <Link href="/admin/messages">Messages</Link>
      </div>
    </div>
  );
}