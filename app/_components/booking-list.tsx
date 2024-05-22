"use client";
import { Prisma } from "@prisma/client";
import BookingItem from "./booking-item";
import { useSession } from "next-auth/react";

interface Props {
  bookings: Prisma.BookingGetPayload<{
    include: {
      service: true;
      date: true;
      user: true;
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
