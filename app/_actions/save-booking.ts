"use server";

import { revalidatePath } from "next/cache";
import { db } from "../_lib/prisma";

interface SaveBookingParams {
  serviceId: string;
  userId: string;
  date: Date;
}
export const saveBooking = async (booking: SaveBookingParams) => {
  await db.booking.create({
    data: {
      date: booking.date,
      serviceId: booking.serviceId,
      userId: booking.userId,
    },
  });
  revalidatePath("/");
};
