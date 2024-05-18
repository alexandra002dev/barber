import { Prisma } from "@prisma/client";
import ServiceItem from "./service-item";

interface Props {
  services: Prisma.ServiceGetPayload<{
    include: {
      barbershop: {
        select: {
          name: true;
        };
      };
    };
  }>[];
}

const ServiceList = ({ services }: Props) => {
  return (
    <div className="gap-4 grid grid-cols-1 sm:grid-cols-2">
      {services.map((service) => (
        <ServiceItem key={service.id} service={service} />
      ))}
    </div>
  );
};

export default ServiceList;
