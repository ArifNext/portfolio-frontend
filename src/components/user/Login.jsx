"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { loginUser } from "@/lib/api";
import { useLoading } from "@/utils/loading-helper";
import { showSuccess, showError } from "@/utils/toast-helper";

const inputClass =
  "w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent";

const buttonClass =
  "w-full bg-indigo-600 text-white font-medium py-2.5 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50";

export default function Login() {
  const router = useRouter();
  const { isLoading, startLoading, stopLoading } = useLoading();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    startLoading();

    try {
      await loginUser(email, password);
      showSuccess("Login Success");
      router.push("/");
    } catch (error) {
      showError(error.message);
    } finally {
      stopLoading();
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800">Welcome back</h1>
        <p className="text-sm text-gray-500 mt-1 mb-6">
         Plaese enter your email and password।
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
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
              className={inputClass}
            />
            <div className="text-right mt-2">
              <Link
                href="/user/forgot-password"
                className="text-sm text-indigo-600 hover:underline"
              >
                forgot password?
              </Link>
            </div>
          </div>

          <button type="submit" disabled={isLoading} className={buttonClass}>
            {isLoading ? "Please wait..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-gray-500 mt-6 text-center">
          Don't Have Account ?{" "}
          <Link href="/user/register" className="text-indigo-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}