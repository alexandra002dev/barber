"use client";
import { Prisma } from "@prisma/client";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { useState } from "react";
import { formatCurrency } from "../_helpers/price";
import { Button } from "./ui/button";
import { cancelBooking } from "../_actions/cancel-booking";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

interface Props {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: true;
      date: true;
      user: true;
    };
  }>;
}
const BookingItem = ({ booking }: Props) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [alertDialogo, setAlertDialogo] = useState(false);
  const handleCancelClick = async () => {
    try {
      await cancelBooking(booking.id);

      toast.success("Reserva cancelada com sucesso!");
    } catch (error) {
      console.error(error);
    } finally {
    }
  };
  return (
    <>
      <Card onClick={() => setMenuOpen(true)}>
        <CardContent className="p-1 ">
          <div className="flex items-center px-4">
            <div className="flex-1 space-y-1">
              <Badge className="bg-[#221c3d] text-primary mb-2">
                Confirmado
              </Badge>
              <h2 className="font-bold">{booking?.service?.name}</h2>
              <div className="flex gap-3 items-center">
                <Avatar>
                  {booking.user && booking.user.image && (
                    <AvatarImage src={booking.user.image} alt="sda" />
                  )}
                </Avatar>
                {booking.user && booking.user.image && (
                  <h2>{booking.user.name}</h2>
                )}
              </div>
            </div>
            <div className="text-center border-l border-solid border-secondary">
              <div className="pl-10">
                <h2 className="capitalize text-lg">
                  {format(booking.date, "MMMM", {
                    locale: ptBR,
                  })}
                </h2>
                <div className="text-5xl">
                  {format(booking.date, "dd", {
                    locale: ptBR,
                  })}
                </div>
                <p>
                  {format(booking.date, "hh:mm", {
                    locale: ptBR,
                  })}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent className="w-[95%] flex flex-col gap-2 justify-between">
          <div className="px-2 ">
            <SheetHeader>
              <SheetTitle className="text-left mb-2">
                Informações da Reserva
              </SheetTitle>
            </SheetHeader>

            <div>
              <Badge className="bg-[#221c3d] text-primary mb-5">
                Confirmado
              </Badge>
            </div>
            <Card>
              <CardContent className="px-2 py-1 ">
                <div>
                  <CardHeader className="px-2 py-1">
                    <div className="flex items-center justify-between ">
                      <h2> {booking.service.name}</h2>
                      <span>
                        {" "}
                        {formatCurrency(Number(booking.service.price))}
                      </span>
                    </div>
                  </CardHeader>
                  <div className="flex items-center justify-between px-2 ">
                    <h3 className="text-sm text-muted-foreground">Data</h3>
                    <span className="text-sm capitalize">
                      {booking.date.toLocaleDateString("pt-BR", {
                        day: "numeric",
                        month: "long",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between px-2 mt-2">
                    <h3 className="text-sm text-muted-foreground">Hora</h3>
                    <span className="text-sm">
                      {format(booking.date, "hh:mm", {
                        locale: ptBR,
                      })}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="flex w-full gap-2">
            <Button
              className="flex-1 bg-secondary"
              onClick={() => setMenuOpen(false)}
            >
              Voltar
            </Button>
            <Button
              className="flex-1 bg-red-600"
              onClick={() => setAlertDialogo(true)}
            >
              Cancelar Reserva
            </Button>
          </div>
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
            <Button className="flex-1 bg-red-600" onClick={handleCancelClick}>
              Confirmar
            </Button>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default BookingItem;
