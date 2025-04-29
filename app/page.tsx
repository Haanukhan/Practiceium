"use client";

import Link from "next/link";

const Home = () => {
  return (
    <main className="min-h-screen text-gray-900 font-sans antialiased">
      {/* Hero Section */}
      <section
        className="relative flex flex-col justify-center items-center px-6 py-20 text-center min-h-screen bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: "url('/home.jpg')" }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent z-0"></div>

        <div className="relative z-10 max-w-3xl mx-auto text-white animate-fade-in">
          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-6 drop-shadow-lg">
            PRACTICE<span className="text-gray-300">IUM</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-200 max-w-xl mx-auto mb-10">
            Insightful reads, smart tools, and everything you need to grow.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/auth/register"
              className="px-6 py-3 font-semibold text-white bg-black rounded-xl shadow-md hover:bg-gray-900 transition-all duration-300"
            >
              Sign Up
            </Link>
            <Link
              href="/auth/login"
              className="px-6 py-3 font-semibold bg-white/90 backdrop-blur border border-white/20 text-black rounded-xl shadow-md hover:bg-white transition-all duration-300"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
