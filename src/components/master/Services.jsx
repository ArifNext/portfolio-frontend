// src/components/Services.jsx
"use client";

import { useState, useEffect } from "react";
import { FiCode, FiSmartphone, FiGlobe, FiShoppingBag, FiDatabase, FiShield,FiLayers,FiClipboard } from "react-icons/fi";

const mockServices = [
  {
    icon: FiCode,
    title: "Web Development",
    description: "Custom websites built with modern technologies like React, Next.js, and Node.js.",
    color: "text-blue-600",
  },
  {
    icon: FiSmartphone,
    title: "Mobile App Development",
    description: "Cross-platform mobile apps using Flutter for iOS and Android.",
    color: "text-purple-600",
  },
  {
    icon: FiGlobe,
    title: "UI/UX Design",
    description: "Beautiful and intuitive user interfaces that provide great user experiences.",
    color: "text-pink-600",
  },
  {
    icon: FiShoppingBag,
    title: "E-commerce Solutions",
    description: "Complete e-commerce platforms with payment integration and inventory management.",
    color: "text-green-600",
  },
  {
    icon: FiDatabase,
    title: "Backend Development",
    description: "Scalable backend systems with RESTful APIs and database management.",
    color: "text-orange-600",
  },
    {
    icon: FiShield,
    title: "Security & Maintenance",
    description: "Website security audits, maintenance, and performance optimization.",
    color: "text-red-600",
  },
  {
    icon: FiLayers,
    title: "System Design",
    description: "Planning scalable system architecture, database structure, and API design for your project.",
    color: "text-teal-600",
  },
  {
    icon: FiClipboard,
    title: "Project Management",
    description: "Managing tasks, timelines, and delivery so your project finishes on time.",
    color: "text-indigo-600",
  },
];

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 500));
        setServices(mockServices);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-48 mx-auto"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-64 bg-gray-300 dark:bg-gray-700 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            My Services
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            What I can do for you
          </p>
          <div className="w-20 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
        </div>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => (
                <a
                  key={index}
                  href="/contact"
                  className="block bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
                >
                  <div className={`${service.color} mb-4`}>
                    <service.icon size={40} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {service.description}
                  </p>
                </a>
              ))}
         </div>
      </div>
    </section>
  );
}