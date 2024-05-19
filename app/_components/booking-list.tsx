import { Prisma } from "@prisma/client";
import BookingItem from "./booking-item";

interface Props {
  bookings: Prisma.BookingGetPayload<{
    include: {
      service: true;
      date: true;
    };
  }>[];
}

const BookingList = ({ bookings }: Props) => {
  return (
    <div className="flex gap-4 overflow-x-scroll px-5 [&::-webkit-scrollbar]:hidden ">
      {bookings.map((booking) => (
        <BookingItem key={booking.id} booking={booking} />
      ))}
    </div>
  );
};

export default BookingList;
