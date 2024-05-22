import Header from "../_components/header";
import { Separator } from "../_components/ui/separator";

import BookingList from "../_components/booking-list";
import { db } from "../_lib/prisma";
import BookingItem from "../_components/booking-item";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../_components/ui/sheet";
import { MenuIcon } from "lucide-react";

const BookingPage = async () => {
  const bookings = await db.booking.findMany({
    include: {
      service: true,
      user: true,
    },
  });
  return (
    <>
      <Header />
      <div className="py-5">
        <Separator />
      </div>
      <div className="px-5 space-y-2 mb-2">
        <h1 className="text-lg">Agendamentos</h1>
      </div>
      <div className="space-y-3 px-5">
        {bookings.map((booking) => (
          <BookingItem key={booking.id} booking={booking} />
        ))}
      </div>
    </>
  );
};

export default BookingPage;
