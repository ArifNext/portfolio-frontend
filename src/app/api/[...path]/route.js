import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function callBackend(request, params) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json({ detail: "Login করা নেই।" }, { status: 401 });
  }

  const { path } = await params;
  const url = `${API_URL}/${path.join("/")}`;

  const options = {
    method: request.method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  };

  if (request.method === "POST" || request.method === "PUT") {
    options.body = JSON.stringify(await request.json());
  }

  let res;
  try {
    res = await fetch(url, options);
  } catch (error) {
    return NextResponse.json(
      { detail: "Server-এর সাথে connect করা যাচ্ছে না।" },
      { status: 502 }
    );
  }

  const data = await res.json().catch(() => null);
  return NextResponse.json(data, { status: res.status });
}

export function GET(request, { params }) {
  return callBackend(request, params);
}

export function POST(request, { params }) {
  return callBackend(request, params);
}

export function PUT(request, { params }) {
  return callBackend(request, params);
}

export function DELETE(request, { params }) {
  return callBackend(request, params);
}