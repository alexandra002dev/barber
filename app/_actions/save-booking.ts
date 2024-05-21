"use server";

import { db } from "../_lib/prisma";

interface SaveBookingParams {
  serviceId: string;
  userId: string;
  date: Date;
}
export const saveBooking = async (booking: SaveBookingParams) => {
  // Verifica se já existe uma reserva para o horário solicitado
  // const existingAppointment = await db.booking.findUnique({
  //   where: {
  //     date: booking.date,
  //   },
  // });

  // if (existingAppointment) {
  //   console.log("Já existe uma reserva para este horário");
  //   return;
  // }
  await db.booking.create({
    data: {
      date: booking.date,
      serviceId: booking.serviceId,
      userId: booking.userId,
    },
  });
};
