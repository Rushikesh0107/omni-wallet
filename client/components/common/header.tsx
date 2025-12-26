import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

const Header: React.FC = () => {
  return (
    <header className="w-full border-b bg-white py-4 shadow-sm">
      <div className="flex items-center justify-between px-4 sm:px-8">
        <div className="flex items-center">
          <Link href="/">
            <h1 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
              OmniWallet
            </h1>
          </Link>
        </div>

        <Link href="/beneficiary" prefetch={true}>
          <Button
            variant={"outline"}
            className="hover:bg-black/5 hover:text-black"
          >
            Beneficiaries
          </Button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
