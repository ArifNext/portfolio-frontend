// src/components/About.jsx
"use client";

import { useState, useEffect } from "react";
import { FiBriefcase } from "react-icons/fi";

const mockAboutData = {
  title: "About Me",
  subtitle: "A passionate developer crafting digital experiences",
  description:
    "I'm a full-stack developer with 3+ years of experience building modern web and mobile applications. I work with React, Next.js, and Flutter on the front, and Django and FastAPI with MySQL , SQLite and PostgreSQL on the back. I also enjoy building AI-powered features and agentic AI flows. I love turning complex problems into simple, beautiful, and intuitive designs. When I'm not coding, you'll find me reading tech blogs or exploring new technologies.",
  info: [
    { label: "Name", value: "Arif Abir" },
    { label: "Email", value: "arifabir199@email.com" },
    { label: "Location", value: "Lakshmipur, Bangladesh" },
    { label: "Experience", value: "3+ Years" },
  ],
  stats: [
    { number: "05+", label: "Projects Completed" },
    { number: "12+", label: "Happy Clients" },
    { number: "3+", label: "Years Experience" },
    { number: "10+", label: "Technologies" },
  ],
};

export default function About() {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 500));
        setAboutData(mockAboutData);
      } catch (error) {
        console.error("Error fetching about data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  if (loading) {
    return (
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-300 rounded w-48 mx-auto"></div>
            <div className="h-4 bg-gray-300 rounded w-96 mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  if (!aboutData) {
    return (
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-red-500">Failed to load about data</p>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            {aboutData.title}
          </h2>
          <p className="text-gray-600 text-lg">
            {aboutData.subtitle}
          </p>
          <div className="w-20 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Description */}
        <div className="text-center mb-10">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Who am I?
          </h3>
          <p className="text-gray-600 leading-relaxed text-lg max-w-3xl mx-auto">
            {aboutData.description}
          </p>
        </div>

        {/* Personal Info */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 mb-12">
          <h4 className="text-lg font-semibold text-gray-900 mb-4 text-center">
            Personal Information
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {aboutData.info.map((item, index) => (
              <div key={index} className="flex items-center justify-center sm:justify-start gap-2">
                <span className="font-semibold text-gray-900">
                  {item.label}:
                </span>
                <span className="text-gray-600">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Download CV Button */}
        <div className="text-center mb-16">
          <a
            href="/cv/cv_arif.pdf"
            download
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all shadow-md hover:shadow-lg"
          >
            <FiBriefcase size={20} />
            Download CV
          </a>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {aboutData.stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl text-center shadow-md hover:shadow-lg transition-shadow border border-gray-100"
            >
              <h4 className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">
                {stat.number}
              </h4>
              <p className="text-gray-600 text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}