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
import { authOptions } from "./_lib/auth";
import BarbershopInfo from "./_components/barbeshop-info";
import { getServerSession } from "next-auth";

const Home = async () => {
  const session = await getServerSession(authOptions);
  const barbershop = await db.barbershop.findMany({});
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

  return (
    <>
      <Header />
      <div className="px-5 mb-5 mt-4">
        <h1 className="text-lg">
          {session?.user
            ? `Olá, ${session.user.name?.split(" ")[0]}!`
            : "Olá! Vamos agendar um corte hoje?"}
        </h1>
        <p className="capitalize text-sm text-primary">
          {format(new Date(), "EEEE',' dd 'de' MMMM", {
            locale: ptBR,
          })}
        </p>
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
