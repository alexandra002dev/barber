"use client";
import { Barbershop, Prisma } from "@prisma/client";
import { Card, CardContent, CardHeader } from "./ui/card";
import Image from "next/image";
import { ptBR, se } from "date-fns/locale";
import { Button } from "./ui/button";
import { ArrowDownIcon, CheckCircle2, MenuIcon, StarIcon } from "lucide-react";
import { formatCurrency } from "../_helpers/price";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Calendar } from "./ui/calendar";
import { generateDayTimeList } from "../_helpers/hours";
import { saveBooking } from "../_actions/save-booking";
import { setHours, setMinutes } from "date-fns";
import { useSession } from "next-auth/react";
import { db } from "../_lib/prisma";
import { Dialog } from "@radix-ui/react-dialog";
import { AlertDialog } from "@radix-ui/react-alert-dialog";
import {
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

interface Props {
  service: Prisma.ServiceGetPayload<{
    include: {
      barbershop: {
        select: {
          name: true;
        };
      };
      bookings: {
        select: {
          date: true;
        };
      };
    };
  }>;
}
const ServiceItem = ({ service }: Props) => {
  const { data } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [hour, setHour] = useState<string | undefined>();
  const [alertDialogo, setAlertDialogo] = useState(false);

  const handleDateClick = (date: Date | undefined) => {
    setDate(date);
    setHour(undefined);
  };
  const handleBooking = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const dateHours = service.bookings.map((booking) => {
    const date = booking.date;

    return date;
  });
  // const dateHours = service.bookings.map((booking) => {
  //   const date = booking.date;

  //   const formattedTime = date.toLocaleTimeString("pt-BR", {
  //     hour: "2-digit",
  //     minute: "2-digit",
  //   });
  //   return { formattedTime };
  // });

  const timeList = useMemo(() => {
    return date ? generateDayTimeList(date) : [];
  }, [date]);

  const handleBookinSubmit = async () => {
    try {
      if (!hour && !date && !data?.user) {
        return;
      }

      if (date && hour && data?.user) {
        const dateHour = Number(hour.split(":")[0]);
        const dateMinutes = Number(hour.split(":")[1]);

        const newDate = setMinutes(setHours(date, dateHour), dateMinutes);

        await saveBooking({
          serviceId: service.id,
          userId: (data?.user as any).id,
          date: newDate,
        });
        setAlertDialogo(true);
        setTimeout(() => setAlertDialogo(false), 1000);
        setIsMenuOpen(false);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <Card className="relative w-full min-w-[35px] rounded-2xl ">
        <div className="absolute left-2 top-2 flex items-center gap-[2px] rounded-full bg- px-2 py-[2px] text-sm bg-[#221c3d] text-primary">
          <StarIcon className="fill-white text-white" size={12} />
          <span className=" flex text-xs font-semibold">5.0</span>
        </div>
        <CardContent className="p-1 flex gap-2  ">
          <Image
            src={service.imageUrl}
            alt={service.name}
            sizes="100vw"
            height={0}
            width={0}
            className="  shadow-md h-[110px] w-[110px] rounded-2xl"
          />
          <div className="space-y-1">
            {/*NOME E DESCRIÇÃO */}
            <div className="space-y-1">
              <h2 className="font-bold text-sm">{service.name}</h2>
              <p className="text-sm text-gray-400">{service.description}</p>
            </div>

            {/*PREÇO E BOTÃO */}
            <div className="flex items-center justify-between">
              <p className="text-primary">
                {formatCurrency(Number(service.price))}
              </p>
              <Button onClick={handleBooking}>Reservar</Button>
            </div>
          </div>
        </CardContent>
      </Card>
      <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <SheetContent className="w-[90vw] space-y-3 py-3">
          <SheetHeader>
            <SheetTitle className="text-left">Fazer Reserva</SheetTitle>
          </SheetHeader>
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateClick}
            className="rounded-md"
            locale={ptBR}
            fromDate={new Date()}
            styles={{
              head_cell: {
                width: "100%",
                textTransform: "capitalize",
              },
              cell: {
                width: "100%",
              },
              button: {
                width: "100%",
              },
              nav_button_previous: {
                width: "32px",
                height: "32px",
              },
              nav_button_next: {
                width: "32px",
                height: "32px",
              },
              caption: {
                textTransform: "capitalize",
              },
            }}
          />
          {/* Mostrar lista de horários apenas se alguma data estiver selecionada */}
          {date && (
            <div className="flex gap-2 overflow-x-scroll [&::-webkit-scrollbar]:hidden grid-cols-5 py-6 px-5 border-y border-solid border-secondary">
              {timeList
                .filter(
                  (time) =>
                    !dateHours.some((booked) => booked.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) === time && booked.toDateString() === date.toDateString())
                )
                .map((time) => (
                  <div key={time} className="flex gap-3">
                    <Button
                      variant={`${hour === time ? "default" : "outline"}`}
                      onClick={() => setHour(time)}
                    >
                      {time}
                    </Button>
                  </div>
                ))}
            </div>
          )}
          {date && hour && (
            <div className="px-2">
              <Card>
                <CardContent className="px-2 py-1">
                  <div>
                    <CardHeader className="px-2 py-1">
                      <div className="flex items-center justify-between ">
                        <h2> {service.name}</h2>
                        <span> {formatCurrency(Number(service.price))}</span>
                      </div>
                    </CardHeader>
                    <div className="flex items-center justify-between px-2 ">
                      <h3 className="text-sm text-muted-foreground">Data</h3>
                      <span className="text-sm capitalize">
                        {date.toLocaleDateString("pt-BR", {
                          day: "numeric",
                          month: "long",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center justify-between px-2 mt-2">
                      <h3 className="text-sm text-muted-foreground">Hora</h3>
                      <span className="text-sm">{hour}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          <Button className="w-full " onClick={handleBookinSubmit}>
            Confirmar
          </Button>
        </SheetContent>
      </Sheet>
      <AlertDialog open={alertDialogo} onOpenChange={setAlertDialogo}>
        <AlertDialogContent className="w-[70vw] space-y-0 flex flex-col justify-center items-center rounded-md">
          <AlertDialogHeader className="flex flex-col justify-center items-center">
            <CheckCircle2 className="text-primary " size={80} />
            <AlertDialogTitle>Reserva Efetuada!</AlertDialogTitle>
          </AlertDialogHeader>
          <h3 className="text-center text-muted-foreground ">
            Sua reserva foi agendada com sucesso.
          </h3>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ServiceItem;
