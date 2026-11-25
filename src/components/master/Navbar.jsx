"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FiMenu, FiX } from "react-icons/fi";

import { getMe, logoutUser } from "@/lib/api";
import { showSuccess, showError } from "@/utils/toast-helper";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  const pathname = usePathname();
  const router = useRouter();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Skills", href: "/skills" },
    // { name: "Portfolio", href: "/portfolio" },
    { name: "Contact", href: "/contact" },
  ];

  // page বদলালে (যেমন login-এর পর) আবার check করে user আছে কিনা
  useEffect(() => {
    async function checkUser() {
      try {
        const data = await getMe();
        setUser(data);
      } catch (error) {
        setUser(null);
      }
    }

    checkUser();
  }, [pathname]);

  async function handleLogout() {
    try {
      await logoutUser();
      setUser(null);
      setIsOpen(false);
      showSuccess("Logout Success।");
      router.push("/user/login");
    } catch (error) {
      showError(error.message);
    }
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* LEFT: Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <img
                src="/logo/AifLogo.png"
                alt="MyBrand Logo"
                className="h-32 w-auto object-contain"
              />
            </Link>
          </div>

          {/* MIDDLE: Navigation Links (Desktop) */}
          <div className="hidden md:flex flex-1 justify-center">
            <div className="flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* RIGHT: Login / Profile + Logout + Mobile Menu */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link
                  href="/user/profile"
                  className="hidden md:block text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="hidden md:block bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/user/login"
                className="hidden md:block bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
              >
                Login
              </Link>
            )}

            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
                aria-label="Toggle menu"
              >
                {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } md:hidden bg-white border-t border-gray-100 shadow-lg`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-gray-700 hover:bg-blue-50 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium transition-colors"
            >
              {link.name}
            </Link>
          ))}

          {user ? (
            <>
              <Link
                href="/user/profile"
                onClick={() => setIsOpen(false)}
                className="text-gray-700 hover:bg-blue-50 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium transition-colors"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-center bg-blue-600 text-white px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 transition-colors mt-4"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/user/login"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center bg-blue-600 text-white px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 transition-colors mt-4"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}