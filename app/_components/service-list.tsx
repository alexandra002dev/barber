"use client";
import { Prisma, Service } from "@prisma/client";
import ServiceItem from "./service-item";
import SearchInput from "./search";
interface Props {
  services: Prisma.ServiceGetPayload<{
    include: {
      barbershop: {
        select: {
          name: true;
        };
      };
      bookings: {
        select: {
          date: true;
        };
      };
    };
  }>[];
}

const ServiceList = ({ services }: Props) => {
  return (
    <>
      <div className="px-2 py-2">
        <SearchInput />
      </div>

      <div className="gap-4 grid grid-cols-1 sm:grid-cols-2">
        {services.map((service) => (
          <ServiceItem key={service.id} service={service} />
        ))}
      </div>
    </>
  );
};

export default ServiceList;
