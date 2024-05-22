import Header from "../_components/header";
import { Separator } from "../_components/ui/separator";
import { db } from "../_lib/prisma";
import BookingItem from "../_components/booking-item";
import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";
import { redirect } from "next/navigation";

const BookingPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return redirect("/");
  }
  const bookings = await db.booking.findMany({
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
