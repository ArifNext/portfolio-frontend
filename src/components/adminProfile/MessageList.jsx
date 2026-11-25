"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getMe, getMessages } from "@/lib/api";
import { showError } from "@/utils/toast-helper";

export default function MessageList() {
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMessages() {
      try {
        const me = await getMe();
        if (me.role !== "admin") {
          router.push("/user/profile");
          return;
        }

        const data = await getMessages();
        setMessages(data);
      } catch (error) {
        showError(error.message);
        router.push("/user/login");
      } finally {
        setLoading(false);
      }
    }
    loadMessages();
  }, [router]);

  if (loading) {
    return <p className="text-center mt-20">Loading...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 mb-20 p-6 rounded-lg shadow bg-white">
      <h1 className="text-2xl font-bold mb-1">Message List</h1>
      <p className="text-gray-500 mb-4">Total: {messages.length}</p>

      <div className="space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className="border p-4 rounded-lg bg-gray-50">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-bold text-gray-900">{msg.name}</h3>
                <p className="text-sm text-gray-600">{msg.email}</p>
              </div>
              <span className="text-xs text-gray-500">
                {new Date(msg.created_at).toLocaleString()}
              </span>
            </div>
            <p className="text-gray-800 whitespace-pre-wrap">{msg.message}</p>
          </div>
        ))}
        {messages.length === 0 && (
          <p className="text-center text-gray-500 py-4">No messages found.</p>
        )}
      </div>
    </div>
  );
}