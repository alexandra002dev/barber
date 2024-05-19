"use client";
import { Prisma } from "@prisma/client";
import { Card, CardContent, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useSession } from "next-auth/react";

interface Props {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: true;
      date: true;
    };
  }>;
}
const BookingItem = ({ booking }: Props) => {
  const data = useSession();
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-center px-4">
          <div className="flex-1 space-y-1">
            <Badge className="bg-[#221c3d] text-primary mb-2">Confirmado</Badge>
            <h2 className="font-bold">{booking?.service?.name}</h2>
            <div className="flex gap-3 items-center">
              <Avatar>
                {data?.data?.user?.image && (
                  <AvatarImage src={data?.data?.user?.image} alt="sda" />
                )}
              </Avatar>
              <h2>{data.data?.user?.name}</h2>
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
                {" "}
                {format(booking.date, "hh:mm", {
                  locale: ptBR,
                })}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingItem;
