import Image from "next/image";
import Header from "./_components/header";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function Home() {
  return (
    <>
      <Header />
      <div className="p-5">
        <h1>Olá, Alexandra</h1>
        <p className="capitalize text-sm">
          {format(new Date(), "EEEE',' dd 'de' MMMM", {
            locale: ptBR,
          })}
        </p>
      </div>
    </>
  );
}
