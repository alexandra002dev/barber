"use server";

import { db } from "@/app/_lib/prisma";

export const searchForService = async (search: string) => {
  const services = await db.service.findMany({
    where: {
      name: {
        contains: search,
        mode: "insensitive",
      },
    },
    include: {
      barbershop: {
        select: {
          name: true,
        },
      },
      bookings: {
        select: {
          date: true,
        },
      },
    },
  });

  return services;
};
