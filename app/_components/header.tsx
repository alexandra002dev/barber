"use client";
import {
  CalendarCheck,
  Home,
  LogIn,
  LogOut,
  MenuIcon,
  UserCircle2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Avatar, AvatarImage } from "./ui/avatar";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

const Header = () => {
  const data = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [alertDialogo, setAlertDialogo] = useState(false);
  const handleSignOutClick = () => signOut();
  const handleSignInClick = () => signIn();

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
          <div className="py-2">
            <Separator />
          </div>
          {!data.data?.user && (
            <>
              <div className="flex items-center gap-2 ">
                <UserCircle2 size={40} className="text-muted-foreground" />
                <h2>Olá. Faça seu login!</h2>
              </div>

              <Button
                className="w-full flex justify-start bg-primary gap-3 "
                onClick={handleSignInClick}
              >
                <LogIn size={20} />
                Fazer login
              </Button>
            </>
          )}
          {data.data?.user && (
            <div className="flex items-center gap-3 justify-between ">
              <Avatar>
                {data.data?.user.image && (
                  <AvatarImage src={data.data?.user?.image} alt="Avatar" />
                )}
              </Avatar>
              <h1>{data.data.user.name}</h1>
              <Button size="icon" onClick={() => setAlertDialogo(true)}>
                <LogOut size={20} />
              </Button>
            </div>
          )}

          <Button className="w-full flex justify-start bg-transparent border border-solid border-secondary mt-3 gap-3 text-sm">
            <Home size={20} />
            Início
          </Button>
          {data.data?.user && (
            <Link href={"/booking"}>
              <Button className="w-full flex justify-start bg-transparent border border-solid border-secondary gap-3 text-sm">
                <CalendarCheck size={20} />
                Agendamento
              </Button>
            </Link>
          )}
        </SheetContent>
      </Sheet>
      <AlertDialog open={alertDialogo} onOpenChange={setAlertDialogo}>
        <AlertDialogContent className="w-[70vw] space-y-0 flex flex-col justify-center items-center rounded-md">
          <AlertDialogHeader className="flex flex-col justify-center items-center">
            <AlertDialogTitle>Sair</AlertDialogTitle>
          </AlertDialogHeader>
          <h3 className="text-center text-muted-foreground text-sm">
            Deseja mesmo sair da plataforma?
          </h3>
          <div className="flex w-full gap-2">
            <Button
              className="flex-1 bg-secondary"
              onClick={() => setAlertDialogo(false)}
            >
              Cancelar
            </Button>
            <Button className="flex-1 bg-red-600" onClick={handleSignOutClick}>
              Sair
            </Button>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
export default Header;
