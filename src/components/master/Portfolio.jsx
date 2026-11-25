// // src/components/Portfolio.jsx
// "use client";

// import { useState, useEffect } from "react";
// import Image from "next/image";
// import { FiExternalLink, FiGithub } from "react-icons/fi";

// const mockProjects = [
//   {
//     title: "E-commerce Website",
//     description: "A full-featured online store with payment integration",
//     image: "/project1.jpg",
//     tags: ["Next.js", "Tailwind", "Stripe"],
//     liveUrl: "https://example.com",
//     githubUrl: "https://github.com/example",
//   },
//   {
//     title: "Portfolio Website",
//     description: "Modern portfolio website with animations",
//     image: "/project2.jpg",
//     tags: ["React", "Framer Motion"],
//     liveUrl: "https://example.com",
//     githubUrl: "https://github.com/example",
//   },
//   {
//     title: "Blog Platform",
//     description: "Full-stack blog with admin dashboard",
//     image: "/project3.jpg",
//     tags: ["Next.js", "MongoDB", "Node.js"],
//     liveUrl: "https://example.com",
//     githubUrl: "https://github.com/example",
//   },
//   {
//     title: "Task Management App",
//     description: "Collaborative task management tool",
//     image: "/project4.jpg",
//     tags: ["React", "Firebase"],
//     liveUrl: "https://example.com",
//     githubUrl: "https://github.com/example",
//   },
//   {
//     title: "Weather App",
//     description: "Real-time weather forecasting app",
//     image: "/project5.jpg",
//     tags: ["React", "API"],
//     liveUrl: "https://example.com",
//     githubUrl: "https://github.com/example",
//   },
//   {
//     title: "Social Media Dashboard",
//     description: "Analytics dashboard for social media",
//     image: "/project6.jpg",
//     tags: ["Next.js", "Chart.js"],
//     liveUrl: "https://example.com",
//     githubUrl: "https://github.com/example",
//   },
// ];

// export default function Portfolio() {
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         setLoading(true);
//         await new Promise((resolve) => setTimeout(resolve, 500));
//         setProjects(mockProjects);
//       } catch (error) {
//         console.error("Error fetching projects:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProjects();
//   }, []);

//   if (loading) {
//     return (
//       <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
//         <div className="max-w-7xl mx-auto text-center">
//           <div className="animate-pulse space-y-8">
//             <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-48 mx-auto"></div>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//               {[1, 2, 3, 4, 5, 6].map((i) => (
//                 <div key={i} className="h-96 bg-gray-300 dark:bg-gray-700 rounded-xl"></div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
//       <div className="max-w-7xl mx-auto">
        
//         <div className="text-center mb-12">
//           <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
//             My Portfolio
//           </h2>
//           <p className="text-gray-600 dark:text-gray-400 text-lg">
//             Some of my recent work
//           </p>
//           <div className="w-20 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {projects.map((project, index) => (
//             <div
//               key={index}
//               className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
//             >
//               <div className="relative h-48 w-full">
//                 <Image
//                   src={project.image}
//                   alt={project.title}
//                   fill
//                   className="object-cover"
//                 />
//               </div>

//               <div className="p-6">
//                 <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
//                   {project.title}
//                 </h3>
//                 <p className="text-gray-600 dark:text-gray-400 mb-4">
//                   {project.description}
//                 </p>

//                 <div className="flex flex-wrap gap-2 mb-4">
//                   {project.tags.map((tag, tagIndex) => (
//                     <span
//                       key={tagIndex}
//                       className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-xs font-medium rounded-full"
//                     >
//                       {tag}
//                     </span>
//                   ))}
//                 </div>

//                 <div className="flex gap-3">
//                   <a
//                     href={project.liveUrl}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
//                   >
//                     <FiExternalLink size={16} />
//                     Live Demo
//                   </a>
//                   <a
//                     href={project.githubUrl}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="flex-1 flex items-center justify-center gap-2 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 px-4 py-2 rounded-lg font-medium transition-colors"
//                   >
//                     <FiGithub size={16} />
//                     Code
//                   </a>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }