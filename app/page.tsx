import Image from "next/image";
import Header from "./_components/header";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import SearchInput from "./_components/search";
import { db } from "./_lib/prisma";
import BookingList from "./_components/booking-list";

const Home = async () => {
  const booking = await db.booking.findMany({});
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
      <div className="p-5">
        <SearchInput />
      </div>
      <div className="p-5">
        <h2 className="text-xs uppercase text-gray-400 font-bold">
          Agendamento
        </h2>
        <div className="mt-4">
          <BookingList bookings={booking} />
        </div>
      </div>
    </>
  );
};
export default Home;
