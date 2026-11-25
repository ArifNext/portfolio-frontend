// const API_URL = process.env.NEXT_PUBLIC_API_URL;

// // FastAPI-র error থেকে একটা পড়ার মতো message বের করে
// function getErrorMessage(data) {
//   if (!data || !data.detail) {
//     return "sothing wrong";
//   }
//   if (typeof data.detail === "string") {
//     return data.detail;
//   }
//   if (Array.isArray(data.detail)) {
//     return data.detail[0].msg;
//   }
//   return "sothing wrong";
// }

// // সব API call এখান দিয়ে যাবে
// async function request(url, options = {}) {
//   let res;

//   try {
//     res = await fetch(url, {
//       headers: { "Content-Type": "application/json" },
//       cache: "no-store",
//       ...options,
//     });
//   } catch (error) {
//     throw new Error("Server-try to connect");
//   }

//   const data = await res.json().catch(() => null);

//   if (!res.ok) {
//     const err = new Error(getErrorMessage(data));
//     err.status = res.status;
//     throw err;
//   }

//   return data;
// }

// // FastAPI backend-এ সরাসরি (public)
// export function registerUser(name, email, password) {
//   return request(`${API_URL}/register`, {
//     method: "POST",
//     body: JSON.stringify({ name, email, password }),
//   });
// }

// export function getProjects() {
//   return request(`${API_URL}/projects`);
// }

// export function getSkills() {
//   return request(`${API_URL}/skills`);
// }

// export function forgotPassword(email) {
//   return request(`${API_URL}/forgot-password`, {
//     method: "POST",
//     body: JSON.stringify({ email }),
//   });
// }

// export function verifyOtp(email, code) {
//   return request(`${API_URL}/verify-otp`, {
//     method: "POST",
//     body: JSON.stringify({ email, code }),
//   });
// }

// export function resetPassword(email, newPassword) {
//   return request(`${API_URL}/reset-password`, {
//     method: "POST",
//     body: JSON.stringify({ email, new_password: newPassword }),
//   });
// }

// // Next.js-এর নিজের route দিয়ে (token cookie-তে থাকে)
// export function loginUser(email, password) {
//   return request("/api/auth/login", {
//     method: "POST",
//     body: JSON.stringify({ email, password }),
//   });
// }

// export function logoutUser() {
//   return request("/api/auth/logout", { method: "POST" });
// }

// export function getMe() {
//   return request("/api/auth/me");
// }

// export function getUsers() {
//   return request("/api/users");
// }
// export function addProject(project) {
//   return request("/api/projects", {
//     method: "POST",
//     body: JSON.stringify(project),
//   });
// }

// export function updateProject(id, project) {
//   return request(`/api/projects/${id}`, {
//     method: "PUT",
//     body: JSON.stringify(project),
//   });
// }

// export function deleteProject(id) {
//   return request(`/api/projects/${id}`, { method: "DELETE" });
// }
// export function getMessages() {
//   return request("/api/messages");
// }
// API_URL এর শেষে যদি '/' থাকে, তা রিমুভ করা হচ্ছে এবং লোকাল ডেভেলপমেন্টের জন্য ফলব্যাক রাখা হচ্ছে
const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "http://localhost:8000";

// FastAPI-র error থেকে একটা পড়ার মতো message বের করে
function getErrorMessage(data: any) {
  if (!data || !data.detail) {
    return "Something went wrong";
  }
  if (typeof data.detail === "string") {
    return data.detail;
  }
  if (Array.isArray(data.detail)) {
    return data.detail[0].msg || "Something went wrong";
  }
  return "Something went wrong";
}

// সব API call এখান দিয়ে যাবে
async function request(url: string, options: RequestInit = {}) {
  let res;

  try {
    res = await fetch(url, {
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
      ...options,
    });
  } catch (error) {
    throw new Error("Server not connected. Please check your internet or backend.");
  }

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const err = new Error(getErrorMessage(data));
    (err as any).status = res.status;
    throw err;
  }

  return data;
}

// --- Public Routes (FastAPI Backend) ---

export function registerUser(name: string, email: string, password: string) {
  return request(`${API_URL}/register`, {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });
}

export function getProjects() {
  return request(`${API_URL}/projects`);
}

export function getSkills() {
  return request(`${API_URL}/skills`);
}

export function forgotPassword(email: string) {
  return request(`${API_URL}/forgot-password`, {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

export function verifyOtp(email: string, code: string) {
  return request(`${API_URL}/verify-otp`, {
    method: "POST",
    body: JSON.stringify({ email, code }),
  });
}

export function resetPassword(email: string, newPassword: string) {
  return request(`${API_URL}/reset-password`, {
    method: "POST",
    body: JSON.stringify({ email, new_password: newPassword }),
  });
}

// --- Auth & Protected Routes (FastAPI Backend) ---
// আগে এখানে API_URL ছিল না, তাই ফ্রন্টএন্ডে হিট করছিল। এখন ঠিক করা হয়েছে।

export function loginUser(email: string, password: string) {
  return request(`${API_URL}/api/auth/login`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function logoutUser() {
  return request(`${API_URL}/api/auth/logout`, { method: "POST" });
}

export function getMe() {
  return request(`${API_URL}/api/auth/me`);
}

export function getUsers() {
  return request(`${API_URL}/api/users`);
}

export function addProject(project: any) {
  return request(`${API_URL}/api/projects`, {
    method: "POST",
    body: JSON.stringify(project),
  });
}

export function updateProject(id: string | number, project: any) {
  return request(`${API_URL}/api/projects/${id}`, {
    method: "PUT",
    body: JSON.stringify(project),
  });
}

export function deleteProject(id: string | number) {
  return request(`${API_URL}/api/projects/${id}`, { method: "DELETE" });
}

export function getMessages() {
  return request(`${API_URL}/api/messages`);
}