"use client";
import { useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";
import { ImBlogger } from "react-icons/im";
import { GoBellFill } from "react-icons/go";
import { BsFillGridFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-6 bg-white w-full flex flex-wrap justify-between items-center p-4 relative">
      <div className="flex items-center">
        <div className="rounded-full bg-primary p-3 inline-flex mr-2">
          <ImBlogger className="text-white text-2xl" />
        </div>
        <Link
          className="text-2xl font-bold text-black hover:text-primary"
          href="/"
        >
          Arbit Blog
        </Link>
      </div>
      <div className="flex flex-col items-end relative">
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <FaTimes className="text-2xl" />
          ) : (
            <FaBars className="text-2xl" />
          )}
        </button>
        <div
          className={`md:top-0 md:-right-0 md:flex items-center md:flex-row md:relative md:p-0 md:w-auto ${
            isOpen
              ? "top-12 -right-4 flex flex-col absolute bg-white z-10 p-3 w-max"
              : "hidden"
          }`}
        >
          <div className="m-2 relative">
            <span className="text-gray-500 font-bold text-xl">Posts</span>
            <span className="flex items-center justify-center w-8 h-8 absolute -top-7 -right-3 bg-green-400 text-white rounded-full text-sm px-1">
              100
            </span>
          </div>
          <GoBellFill className="text-gray-500 text-2xl m-2" />
          <BsFillGridFill className="text-gray-500 text-2xl m-2" />
          <CgProfile className="text-primary text-5xl m-2" />
        </div>
      </div>
    </div>
  );
}
