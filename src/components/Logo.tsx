"use client";

import Link from "next/link";
import React from "react";

type LogoProps = {
    variant?: "icon" | "full";
    href?: string;
    className?: string;
};

export default function Logo({
                                 variant = "icon",
                                 href = "/",
                                 className = "",
                             }: LogoProps) {
    return (
        <Link
            href={href}
            className={`inline-flex items-center no-underline ${className}`}
        >
            {/* The W */}
            <span
                className="

          text-4xl font-extrabold
          font-mono
          bg-gradient-to-r from-purple-500 via-pink-500 to-red-500
          text-transparent bg-clip-text
          drop-shadow-md
          transition-transform transform-gpu
          focus-visible:scale-110 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-pink-400
        "
            >
        W
      </span>

            {/* Wordmark (optional) */}
            {variant === "full" && (
                <span className="ml-0 font-mono font-semibold text-lg text-gray-100 tracking-tight select-none">
          eatherCast
        </span>
            )}
        </Link>
    );
}
