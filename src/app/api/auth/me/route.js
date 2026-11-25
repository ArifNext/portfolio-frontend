import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json({ detail: "Login করা নেই।" }, { status: 401 });
  }

  let res;
  try {
    res = await fetch(`${API_URL}/me`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
  } catch (error) {
    return NextResponse.json(
      { detail: "Server-এর সাথে connect করা যাচ্ছে না।" },
      { status: 502 }
    );
  }

  const data = await res.json().catch(() => null);
  return NextResponse.json(data, { status: res.status });
}