import { useState, useEffect } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex justify-between items-center px-6 py-4 shadow-md bg-white sticky top-0 z-50">
      
      {/* Logo Section */}
      <div className="flex items-center gap-2">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-2 rounded-xl font-bold text-sm">
          BB
        </div>
        <a href="/" className="text-2xl font-semibold text-gray-900">BrainBench</a>
      </div>

      {/* Navigation Links (Desktop) */}
      <div className="hidden md:flex justify-between items-center gap-10 text-gray-800 text-lg font-medium">
        <a href="/" className="hover:text-black transition hover:text-purple-600 hover:underline  ">Home</a>
        <a href="/" className="hover:text-black transition hover:text-purple-600 hover:underline  " >About</a>
        <a href="/" className="hover:text-black transition hover:text-purple-600 hover:underline  ">Contact</a>
      </div>

      {/* Auth Links (Desktop) */}
      <div className="hidden md:flex justify-between items-center gap-6 text-lg">
        <a href="/user/login" className="hover:text-black transition hover:text-purple-600 hover:underline ">Login</a>
        <a
          href="/user/signup"
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold px-4 py-2 rounded-xl hover:opacity-80 transition"
        >
          Signup
        </a>
      </div>

      {/* Mobile Menu Button */}
      <div className={`flex flex-col md:hidden items-end  ${isOpen ? "fixed top-0 right-0 w-full h-full bg-white z-50":"" }`}>
        <button onClick={toggleMenu} className="text-2xl text-gray-700 hover:-translate-1 hover:text-purple-900">☰</button>

        {isOpen && (
          <div className="mt-4 flex flex-col items-center h-screen w-screen gap-3 text-base font-medium text-gray-800 bg-white px-4 py-2 rounded shadow-md">
            <a href="/" className="hover:text-black transition hover:text-purple-600 hover:underline ">Home</a>
            <a href="/" className="hover:text-black transition hover:text-purple-600 hover:underline ">About</a>
            <a href="/" className="hover:text-black transition hover:text-purple-600 hover:underline ">Contact</a>
            <a href="/user/login" className="hover:text-black transition hover:text-purple-600 hover:underline ">Login</a>
            <a
              href="/user/signup"
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-xl hover:opacity-90 transition"
            >
              Signup
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
