"use server";
import { db } from "../_lib/prisma";
import { authOptions } from "../_lib/auth";
import { getServerSession } from "next-auth";

export const fetchBarbershopData = async () => {
  const barbershop = await db.barbershop.findMany({});
  return barbershop;
};
export const fetchBookingData = async (email: any) => {
  const session = await getServerSession(authOptions);
  const booking = await db.booking.findMany({
    include: {
      service: true,
      user: true,
    },
    where: {
      user: {
        email: email,
      },
    },
  });
  return booking;
};

export const fetchServiceData = async () => {
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
  return service;
};
