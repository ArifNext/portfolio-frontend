import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function POST(request) {
  const body = await request.json();

  let res;
  try {
    res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch (error) {
    return NextResponse.json(
      { detail: "Server-এর সাথে connect করা যাচ্ছে না।" },
      { status: 502 }
    );
  }

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    return NextResponse.json(data || { detail: "Login try agan" }, {
      status: res.status,
    });
  }

  const response = NextResponse.json({ message: "ok" });

  // token শুধু httpOnly cookie-তে যাবে, JavaScript পাবে না
  response.cookies.set("token", data.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60, // backend-এর মতো ৬০ মিনিট
  });

  return response;
}