import { Prisma } from "@prisma/client";
import BookingItem from "./booking-item";

interface Props {
  bookings: Prisma.ServiceGetPayload<{}>[];
}

const BookingList = ({ bookings }: Props) => {
  return <BookingItem booking={bookings} />;
};

export default BookingList;
