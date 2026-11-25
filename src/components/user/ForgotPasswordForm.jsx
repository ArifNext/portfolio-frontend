"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { forgotPassword, verifyOtp, resetPassword } from "@/lib/api";
import { useLoading } from "@/utils/loading-helper";
import { showSuccess, showError } from "@/utils/toast-helper";

const inputClass =
  "w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent";

const buttonClass =
  "w-full bg-indigo-600 text-white font-medium py-2.5 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50";

export default function ForgotPasswordForm() {
  const router = useRouter();
  const { isLoading, startLoading, stopLoading } = useLoading();

  // step: 1 = email, 2 = OTP, 3 = নতুন password
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");

  async function handleSendOtp(e) {
    e.preventDefault();
    startLoading();

    try {
      await forgotPassword(email);
      showSuccess("OTP Send Success check you Email ");
      setStep(2);
    } catch (error) {
      showError(error.message);
    } finally {
      stopLoading();
    }
  }

  async function handleVerifyOtp(e) {
    e.preventDefault();
    startLoading();

    try {
      await verifyOtp(email, code);
      showSuccess("OTP ঠিক আছে।");
      setStep(3);
    } catch (error) {
      showError(error.message);
    } finally {
      stopLoading();
    }
  }

  async function handleResetPassword(e) {
    e.preventDefault();
    startLoading();

    try {
      await resetPassword(email, newPassword);
      showSuccess("Password বদলানো হয়েছে। এখন login করো।");
      router.push("/user/login");
    } catch (error) {
      showError(error.message);
    } finally {
      stopLoading();
    }
  }

  const titles = {
    1: "Password ভুলে গেছো?",
    2: "OTP দাও",
    3: "নতুন password দাও",
  };

  const subtitles = {
    1: "Email দাও, আমরা একটা ৬ সংখ্যার OTP পাঠাবো।",
    2: `${email} এ পাঠানো OTP টা লেখো। ১০ মিনিট পর্যন্ত চলবে।`,
    3: "কমপক্ষে ৮ অক্ষর, একটা letter ও একটা number থাকতে হবে।",
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-lg p-8">
        <div className="flex gap-2 mb-6">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className={`h-1.5 flex-1 rounded-full ${
                n <= step ? "bg-indigo-600" : "bg-gray-200"
              }`}
            />
          ))}
        </div>

        <h1 className="text-2xl font-bold text-gray-800">{titles[step]}</h1>
        <p className="text-sm text-gray-500 mt-1 mb-6">{subtitles[step]}</p>

        {step === 1 && (
          <form onSubmit={handleSendOtp} className="space-y-4">
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
            <button type="submit" disabled={isLoading} className={buttonClass}>
              {isLoading ? "Please wait..." : "OTP পাঠাও"}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                OTP
              </label>
              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
                placeholder="123456"
                className={`${inputClass} text-center text-xl tracking-widest`}
              />
            </div>
            <button type="submit" disabled={isLoading} className={buttonClass}>
              {isLoading ? "Please wait..." : "OTP যাচাই করো"}
            </button>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="w-full text-sm text-gray-500 hover:text-indigo-600"
            >
              Email বদলাবো / আবার OTP চাই
            </button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                নতুন password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={8}
                className={inputClass}
              />
            </div>
            <button type="submit" disabled={isLoading} className={buttonClass}>
              {isLoading ? "Please wait..." : "Password বদলাও"}
            </button>
          </form>
        )}

        <p className="text-sm text-gray-500 mt-6 text-center">
          Alredy Account?{" "}
          <Link href="/user/login" className="text-indigo-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}