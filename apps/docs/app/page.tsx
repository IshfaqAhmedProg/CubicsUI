import { Metadata } from "next";
import Link from "next/link";
import React from "react";
export const metadata: Metadata = {
  description: "This is the home page",
};

export default function HomePage() {
  return (
    <div>
      This is the home page
      <Link href={"/about"}>Learn about us</Link>
    </div>
  );
}
