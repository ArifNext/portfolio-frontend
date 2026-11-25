"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { registerUser } from "@/lib/api";
import { useLoading } from "@/utils/loading-helper";
import { showSuccess, showError } from "@/utils/toast-helper";

const inputClass =
  "w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent";

const buttonClass =
  "w-full bg-indigo-600 text-white font-medium py-2.5 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50";

export default function RegisterForm() {
  const router = useRouter();
  const { isLoading, startLoading, stopLoading } = useLoading();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    startLoading();

    try {
      await registerUser(name, email, password);
      showSuccess("Account Register Success");
      router.push("/user/login");
    } catch (error) {
      showError(error.message);
    } finally {
      stopLoading();
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800">Create account</h1>
        <p className="text-sm text-gray-500 mt-1 mb-6">
          for new account if you want !
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              minLength={2}
              placeholder="whats your name"
              className={inputClass}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className={inputClass}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              className={inputClass}
            />
            <p className="text-xs text-gray-500 mt-1">
              minimum 8 disit and letter  number।
            </p>
          </div>

          <button type="submit" disabled={isLoading} className={buttonClass}>
            {isLoading ? "Please wait..." : "Register"}
          </button>
        </form>

        <p className="text-sm text-gray-500 mt-6 text-center">
           Alredy have account ?{" "}
          <Link href="/user/login" className="text-indigo-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}