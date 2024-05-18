"use client";
import { Prisma } from "@prisma/client";
import { Card, CardContent, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Props {
  booking: Prisma.BookingGetPayload<{}>;
}
const BookingItem = ({ booking }: Props) => {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-center px-4">
          <div className="flex-1 ">
            <Badge className="bg-[#221c3d] text-primary mb-2">Confirmado</Badge>
            <h2 className="font-bold">Corte de Cabelo</h2>
            <div className="flex gap-3 items-center">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
              </Avatar>
              <h2>sds</h2>
            </div>
          </div>
          <div className="text-center border-l border-solid border-secondary">
            <div className="pl-10">
              <h2 className="capitalize text-lg">
                {format(new Date(), "MMMM", {
                  locale: ptBR,
                })}
              </h2>
              <div className="text-5xl">
                {format(new Date(), "dd", {
                  locale: ptBR,
                })}
              </div>
              <p> 06:00</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingItem;
