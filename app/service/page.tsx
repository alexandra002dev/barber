"use client";
import { Prisma } from "@prisma/client";
import { notFound, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { searchForService } from "../_actions/search";
import Header from "../_components/header";
import ServiceItem from "../_components/service-item";
import { Divide } from "lucide-react";

const ServicePage = () => {
  const [services, setServices] = useState<
    Prisma.ServiceGetPayload<{
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
    }>[]
  >([]);
  const searchParams = useSearchParams();
  const searchFor = searchParams.get("search");
  useEffect(() => {
    const fetchServices = async () => {
      if (!searchFor) return;
      const forService = await searchForService(searchFor);
      setServices(forService);
    };
    fetchServices();
  }, [searchFor]);
  if (!searchFor) {
    return notFound();
  }

  return (
    <>
      <Header />

      {services.length > 0 && (
        <div className="px-5 py-6">
          <h2 className="mb-6 text-lg font-semibold">Serviços encontrados</h2>
          <div className="flex w-full flex-col gap-6">
            {services.map((service) => (
              <ServiceItem key={service.id} service={service} />
            ))}
          </div>
        </div>
      )}
      {services.length === 0 && (
        <div className="px-5 py-6">
          <p>Não encontrado!</p>
        </div>
      )}
    </>
  );
};

export default ServicePage;
