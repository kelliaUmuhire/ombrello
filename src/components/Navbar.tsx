import React from "react";

export default function Navbar() {
  return (
    <div className="flex justify-between px-12 py-8">
      <div className="font-comforter text-3xl">Ombrello</div>
      <div className="flex space-x-6">
        <div>en</div>
        <a href="/">info</a>
      </div>
    </div>
  );
}
