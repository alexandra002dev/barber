import Header from "./_components/header";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import SearchInput from "./_components/search";
import { db } from "./_lib/prisma";
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

const Home = async () => {
  const barbershop = await db.barbershop.findMany({});
  const booking = await db.booking.findMany({
    select: {
      service: true,
      date: true,
      id: true,
      serviceId: true,
      userId: true,
    },
  });
  const service = await db.service.findMany({
    include: {
      barbershop: {
        select: {
          name: true,
        },
      },
    },
  });

  return (
    <>
      <Header />
      <div className="p-5 ">
        <h1 className="text-lg">Olá, Alexandra</h1>
        <p className="capitalize text-sm">
          {format(new Date(), "EEEE',' dd 'de' MMMM", {
            locale: ptBR,
          })}
        </p>
      </div>
      <div className="px-5">
        <h2 className="text-xs uppercase text-gray-400 font-bold">
          Agendamento
        </h2>
        <div className="mt-4">
          <BookingList bookings={booking} />
        </div>
      </div>
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
              <div className="px-2 py-2">
                <SearchInput />
              </div>
              <CardContent className="space-y-2 px-2">
                <div className="">
                  <h2 className="text-xs uppercase text-gray-400 font-bold">
                    Serviços
                  </h2>
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
