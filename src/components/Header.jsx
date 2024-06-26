import React from 'react';

export default function Header({ onToggleForm }) {
  return (
    <header className="bg-gray-800 p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <img width="150px" alt="Business Trips" src="/images/logo.png" />
      </nav>
    </header>
  );
}
