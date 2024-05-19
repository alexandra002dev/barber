"use client";
import { Button } from "@/app/_components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/_components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { useState } from "react";

const ServicePage = ({ params }: { params: { id: string } }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div>
      <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="text-left">Menu</SheetTitle>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ServicePage;
