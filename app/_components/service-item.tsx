"use client";
import { Barbershop, Prisma } from "@prisma/client";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { se } from "date-fns/locale";
import { Button } from "./ui/button";
import { ArrowDownIcon, StarIcon } from "lucide-react";
import { formatCurrency } from "../_helpers/price";

interface Props {
  service: Prisma.ServiceGetPayload<{
    include: {
      barbershop: {
        select: {
          name: true;
        };
      };
    };
  }>;
}
const ServiceItem = ({ service }: Props) => {
  const isValidUrl = (url: string) => {
    return (
      url.startsWith("/") ||
      url.startsWith("http://") ||
      url.startsWith("https://")
    );
  };
  return (
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
            <Button>Reservar</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceItem;
