"use client";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { getUserDataByEmail } from "../firebase/store";
import { useState, useEffect } from "react";
import React from "react";

export default function ProfileSection() {
  const { user } = useAuth();
  const [profileLink, setProfileLink] = useState("/login");

  useEffect(() => {
    const getProfileLink = async () => {
      if (user) {
        const { userData } = await getUserDataByEmail(user.email);
        if (userData?.userid) {
          setProfileLink(`/profile/${userData.userid}`);
        }
      }
    };
    getProfileLink();
  }, [user]);

  return (
    <section className="bg-beige mt-20 py-12 px-6 min-h-[70vh] flex items-center">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center">
        {/* Text Section */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-6">
            BlinkShare
          </h1>
          <p className="text-xl text-gray-700 mb-6 max-w-lg mx-auto">
            Join creators in getting donations, memberships, and sales from fans and your admirers!
          </p>
          <Link
            href={profileLink}
            className="inline-block bg-gradient-to-r from-[#D0C8B9] to-[#B1B097] text-white text-lg font-semibold py-3 px-8 rounded-lg shadow-md hover:scale-95 active:scale-90 transition-all duration-300 hover:text-gray-900"
          >
            Get Started
          </Link>
          <p className="text-lg text-gray-600 mt-6">
            Start Creating and Donating using Solana Blinks
          </p>
        </div>
        {/* Image Section */}
        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
          <img
            src="https://ucarecdn.com/da79bf13-a326-4635-a454-e564ec6c5916/donation_bark.png"
            alt="A donation concept representing BARK"
            className="w-full max-w-md rounded-lg cursor-pointer transition-transform duration-300 hover:scale-105"
          />
        </div>
      </div>
    </section>
  );
}
