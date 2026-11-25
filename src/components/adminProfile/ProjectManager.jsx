"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getMe,
  getProjects,
  addProject,
  updateProject,
  deleteProject,
} from "@/lib/api";
import { showError, showSuccess } from "@/utils/toast-helper";

const emptyForm = {
  title: "",
  description: "",
  image: "",
  tech_stack: "",
  github_link: "",
  live_link: "",
};

export default function ProjectManager() {
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  async function loadProjects() {
    const data = await getProjects();
    setProjects(data);
  }

  useEffect(() => {
    async function start() {
      try {
        const me = await getMe();

        if (me.role !== "admin") {
          router.push("/user/profile");
          return;
        }

        await loadProjects();
      } catch (error) {
        showError(error.message);
        router.push("/user/login");
      } finally {
        setLoading(false);
      }
    }

    start();
  }, [router]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function startEdit(project) {
    setEditingId(project.id);
    setForm({
      title: project.title,
      description: project.description,
      image: project.image,
      tech_stack: project.tech_stack,
      github_link: project.github_link,
      live_link: project.live_link,
    });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(emptyForm);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (editingId) {
        await updateProject(editingId, form);
        showSuccess("Project update হয়েছে");
      } else {
        await addProject(form);
        showSuccess("Project যোগ হয়েছে");
      }

      cancelEdit();
      await loadProjects();
    } catch (error) {
      showError(error.message);
    }
  }

  async function handleDelete(id) {
    if (!confirm("এই project মুছে ফেলবেন?")) {
      return;
    }

    try {
      await deleteProject(id);
      showSuccess("Project মুছে গেছে");
      await loadProjects();
    } catch (error) {
      showError(error.message);
    }
  }

  if (loading) {
    return <p className="text-center mt-20">Loading...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 mb-20 p-6 rounded-lg shadow bg-white">
      <h1 className="text-2xl font-bold mb-4">Projects</h1>

      <form onSubmit={handleSubmit} className="grid gap-3 mb-8">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="border p-2 rounded"
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="border p-2 rounded"
          required
        />
        <input
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="Image (যেমন /img/project1.jpg)"
          className="border p-2 rounded"
        />
        <input
          name="tech_stack"
          value={form.tech_stack}
          onChange={handleChange}
          placeholder="Tech stack (যেমন Next.js, FastAPI)"
          className="border p-2 rounded"
        />
        <input
          name="github_link"
          value={form.github_link}
          onChange={handleChange}
          placeholder="GitHub link"
          className="border p-2 rounded"
        />
        <input
          name="live_link"
          value={form.live_link}
          onChange={handleChange}
          placeholder="Live link"
          className="border p-2 rounded"
        />

        <div className="flex gap-3">
          <button type="submit" className="bg-gray-800 text-white px-4 py-2 rounded">
            {editingId ? "Update" : "Add Project"}
          </button>
          {editingId && (
            <button type="button" onClick={cancelEdit} className="border px-4 py-2 rounded">
              Cancel
            </button>
          )}
        </div>
      </form>

      <p className="text-gray-500 mb-2">Total: {projects.length}</p>

      <table className="w-full text-left">
        <thead>
          <tr className="border-b text-gray-500 text-sm">
            <th className="py-2">ID</th>
            <th className="py-2">Title</th>
            <th className="py-2">Tech</th>
            <th className="py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id} className="border-b">
              <td className="py-2">{project.id}</td>
              <td className="py-2">{project.title}</td>
              <td className="py-2">{project.tech_stack}</td>
              <td className="py-2 flex gap-3">
                <button onClick={() => startEdit(project)} className="text-blue-600">
                  Edit
                </button>
                <button onClick={() => handleDelete(project.id)} className="text-red-600">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}