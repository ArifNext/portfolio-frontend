// src/components/Skills.jsx
"use client";

import { useState } from "react";
import { FaReact, FaJs, FaHtml5, FaCss3Alt, FaGitAlt, FaGithub, FaPython, FaDocker, FaNodeJs } from "react-icons/fa";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiBootstrap,
  SiPrisma,
  SiFigma,
  SiFirebase,
  SiPostgresql,
  SiMysql,
  SiSqlite,
  SiFlutter,
  SiDart,
  SiDjango,
  SiFastapi,
  SiVercel,
} from "react-icons/si";

const skills = [
  { icon: FaHtml5, name: "HTML5", color: "text-orange-500" },
  { icon: FaCss3Alt, name: "CSS3", color: "text-blue-500" },
  { icon: SiBootstrap, name: "Bootstrap", color: "text-purple-600" },
  { icon: SiTailwindcss, name: "Tailwind", color: "text-teal-500" },
  { icon: FaJs, name: "JavaScript", color: "text-yellow-500" },
  { icon: FaReact, name: "React", color: "text-cyan-500" },
  { icon: SiNextdotjs, name: "Next.js", color: "text-gray-900" },
  { icon: FaNodeJs, name: "Node.js", color: "text-green-600" },
  { icon: SiPrisma, name: "Prisma", color: "text-slate-800" },
  { icon: SiFigma, name: "Figma", color: "text-pink-500" },
  { icon: SiFlutter, name: "Flutter", color: "text-sky-500" },
  { icon: SiDart, name: "Dart", color: "text-blue-600" },
  { icon: FaPython, name: "Python", color: "text-yellow-500" },
  { icon: SiDjango, name: "Django", color: "text-green-800" },
  { icon: SiFastapi, name: "FastAPI", color: "text-teal-600" },
  { icon: SiPostgresql, name: "PostgreSQL", color: "text-blue-700" },
  { icon: SiMysql, name: "MySQL", color: "text-sky-700" },
  { icon: SiSqlite, name: "SQLite", color: "text-blue-400" },
  { icon: FaDocker, name: "Docker", color: "text-blue-500" },
  { icon: FaGitAlt, name: "Git", color: "text-orange-600" },
  { icon: FaGithub, name: "GitHub", color: "text-gray-900" },
  { icon: SiFirebase, name: "Firebase", color: "text-yellow-600" },
  { icon: SiVercel, name: "Vercel", color: "text-gray-900" },
];

const FIRST_COUNT = 16;

export default function Skills() {
  const [showAll, setShowAll] = useState(false);

  const visibleSkills = showAll ? skills : skills.slice(0, FIRST_COUNT);

  return (
    <section id="skills" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            My Skills
          </h2>
          <p className="text-gray-600 text-lg">
            Technologies I work with
          </p>
          <div className="w-20 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Skills Grid - 8 per row on desktop */}
        <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
          {visibleSkills.map((skill, index) => (
            <div
              key={index}
              className="bg-gray-50 p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-gray-100 text-center group"
            >
              <div className={`${skill.color} mb-2 flex justify-center group-hover:scale-110 transition-transform`}>
                <skill.icon size={28} />
              </div>
              <h3 className="text-xs font-semibold text-gray-900 truncate">
                {skill.name}
              </h3>
            </div>
          ))}
        </div>

        {/* Show More / Show Less */}
        {skills.length > FIRST_COUNT && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-6 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors"
            >
              {showAll ? "Show Less" : "Show More"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}