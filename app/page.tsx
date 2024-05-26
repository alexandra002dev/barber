import Header from "./_components/header";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import BookingList from "./_components/booking-list";
import ServiceList from "./_components/service-list";
import { Separator } from "./_components/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./_components/ui/tabs";
import { Card, CardContent } from "./_components/ui/card";
import BarbershopInfo from "./_components/barbeshop-info";
import { useMemo } from "react";

import { db } from "./_lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "./_lib/auth";

const Home = async () => {
  const barbershop = await db.barbershop.findMany({});
  const session = await getServerSession(authOptions);
  const booking = await db.booking.findMany({
    include: {
      service: true,
      user: true,
    },
    where: {
      user: {
        email: session?.user?.email,
      },
    },
  });
  const service = await db.service.findMany({
    include: {
      barbershop: {
        select: {
          name: true,
        },
      },
      bookings: true,
    },
  });
  const formattedDate = format(new Date(), "EEEE',' dd 'de' MMMM", {
    locale: ptBR,
  });

  return (
    <>
      <Header />
      <div className="px-5 mb-5 mt-4">
        <h1 className="text-lg capitalize">
          {session?.user
            ? `Olá, ${session?.user?.name?.split(" ")[0]}!`
            : "Olá! Vamos agendar um corte hoje?"}
        </h1>
        <p className="capitalize text-sm text-primary">{formattedDate}</p>
      </div>

      {session?.user && (
        <div className="px-5">
          <h2 className="pl-5 text-xs mb-3 uppercase text-gray-400 font-bold">
            Agendamentos
          </h2>
          <div className="mt-4">
            <BookingList bookings={booking} />
          </div>
        </div>
      )}

      <div className="py-4">
        <Separator />
      </div>
      <div className="px-5">
        <Tabs defaultValue="service">
          <TabsList className="grid w-full grid-cols-2 ">
            <TabsTrigger value="service">Serviços</TabsTrigger>
            <TabsTrigger value="informations">Informações</TabsTrigger>
          </TabsList>
          <TabsContent value="service">
            <Card className="mb-3">
              <CardContent className="space-y-2 px-2">
                <div className="">
                  <div className="mt-4">
                    <ServiceList services={service} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="informations">
            <Card>
              <CardContent className="space-y-2">
                <BarbershopInfo barbershop={barbershop} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};
export default Home;
