"use client";
import { LogInIcon, MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className="flex justify-between px-5 pt-6">
      <Link href={"/"}>
        <Image src="/Logo.png" alt="FSW Foods" height={30} width={150} />
      </Link>

      <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <SheetTrigger onClick={() => setIsMenuOpen(true)}>
          <MenuIcon />
        </SheetTrigger>
        <SheetContent className="w-[90vw] space-y-3">
          <SheetHeader>
            <SheetTitle className="text-left">Menu</SheetTitle>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};
export default Header;
