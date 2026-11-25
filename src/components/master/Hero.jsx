// components/Hero.jsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { TypeAnimation } from "react-type-animation";
import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";
import { FiDownload, FiMail } from "react-icons/fi";

export default function Hero() {
  const profileData = {
    name: "Arif Abir",
    image: "/img/x.jpg",
    resumeUrl: "/cv/cv_arif.pdf",
  };

  const socialLinks = [
    { icon: FaGithub, href: "https://github.com/ArifNext", label: "GitHub" },
    { icon: FaLinkedin, href: "https://www.linkedin.com/in/muhammad-arif-1a8306242", label: "LinkedIn" },
    { icon: FaFacebook, href: "https://www.facebook.com/profile.php?id=100012736295755", label: "Facebook" },
  ];

  return (
   <section className=" pb-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Grid Layout - Desktop এ পাশাপাশি, Mobile এ উপর-নিচ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* LEFT SIDE: Text Content */}
          <div className="order-2 md:order-1 text-center md:text-left space-y-6">
            
            <p className="text-blue-600 dark:text-blue-400 font-semibold text-lg">
               Hello, I'm
            </p>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
              {profileData.name}
            </h1>

            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-700 dark:text-gray-300">
              <span>I'm a </span>
              <TypeAnimation
                sequence={[
                          "Full Stack Developer",
                          1500,
                          "Web Developer",
                          1500,
                          "Frontend Developer",
                          1500,
                          "React Developer",
                          1500,
                          "Next.js Developer",
                          1500,
                          "Backend Developer",
                          1500,
                          "Django Developer",
                          1500,
                          "FastAPI Developer",
                          1500,
                          "MySQL Developer",
                          1500,
                          "Mobile App Developer",
                          1500,
                          "Flutter Developer",
                          1500,
                        ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="text-blue-600 dark:text-blue-400"
              />
            </div>
                <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed max-w-xl mx-auto md:mx-0">
                  I build beautiful, responsive, and user-friendly web and mobile applications
                  using modern technologies like React, Next.js, Flutter, Django, and FastAPI.
                  From pixel-perfect frontends to powerful backends with MySQL, I handle the
                  full stack. Passionate about creating seamless digital experiences that make
                  a difference.
                </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <FiMail size={20} />Hire Me</Link>
              <a
                href={profileData.resumeUrl}
                download
                className="inline-flex items-center justify-center gap-2 border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800 px-6 py-3 rounded-lg font-medium transition-all duration-200"
              >
                 <FiDownload size={20} />Download CV</a>
            </div>

            <div className="flex gap-4 justify-center md:justify-start">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="p-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE: Profile Image */}
      <div className="order-1 md:order-2 flex justify-center md:justify-end">
  <div className="relative">
     <div className="relative w-80 h-80 sm:w-96 sm:h-96 lg:w-[30rem] lg:h-[30rem]">
      <Image
        src={profileData.image}
        alt={profileData.name}
        fill
        className="object-contain"
        priority
      />
    </div>

    <div className="absolute -bottom-4 -right-4 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-lg border border-gray-200 dark:border-gray-700">
      <p className="text-sm font-semibold text-gray-800 dark:text-white whitespace-nowrap">
        💻 Available for work
      </p>
    </div>
  </div>
</div>
        </div>
      </div>
    </section>
  );
}