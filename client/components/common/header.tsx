import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="w-full border-b bg-white py-4 shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <h1 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
            OmniWallet
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
