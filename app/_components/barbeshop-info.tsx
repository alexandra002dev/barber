"use client";
import { Barbershop } from "@prisma/client";
import { CheckCircle2, MapPin, Smartphone, SmartphoneIcon } from "lucide-react";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

const BarbershopInfo = ({ barbershop }: { barbershop: Barbershop[] }) => {
  const [copied, setCopied] = useState(false);
  const [alertDialogo, setAlertDialogo] = useState(false);
  const textCopy = barbershop[0].telephone.toString();
  const horario = {
    segunda: "09:00 - 18:00",
    terca: "09:00 - 18:00",
    quarta: "09:00 - 18:00",
    quinta: "09:00 - 18:00",
    sexta: "09:00 - 18:00",
    sabado: "09:00 - 18:00",
    domingo: "09:00 - 18:00",
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textCopy);
      setCopied(true);
      setAlertDialogo(true);
      setTimeout(() => setCopied(false), 2000);
      setTimeout(() => setAlertDialogo(false), 1000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };
  return (
    <div className="space-y-2 py-2">
      <h2 className="text-lg uppercase font-bold">{barbershop[0].name}</h2>
      {/* ENDEREÇO */}
      <div className="flex items-center gap-2">
        <MapPin className="h-4 w-4 text-primary" />
        <p className="text-sm ">{barbershop[0].address}</p>
      </div>

      <div className="py-4">
        <Separator />
      </div>
      {/* TELEFONES */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SmartphoneIcon size={16} />
          <p className="text-sm">{barbershop[0].telephone}</p>
        </div>
        <div>
          <Button variant="secondary" onClick={handleCopy}>
            Copiar
          </Button>
        </div>
      </div>
      <div className="py-4">
        <Separator />
      </div>

      <div className="flex items-center text-sm text-muted-foreground justify-between gap-2">
        <h2>Segunda</h2>
        <p>{horario.segunda}</p>
      </div>
      <div className="flex items-center text-sm text-muted-foreground justify-between gap-2">
        <h2>Terça-Feira</h2>
        <p>{horario.terca}</p>
      </div>
      <div className="flex items-center text-sm text-muted-foreground justify-between gap-2">
        <h2>Quarta-Feira</h2>
        <p>{horario.quarta}</p>
      </div>
      <div className="flex items-center text-sm text-muted-foreground justify-between gap-2">
        <h2>Quinta-Feira</h2>
        <p>{horario.quinta}</p>
      </div>
      <div className="flex items-center text-sm text-muted-foreground justify-between gap-2">
        <h2>Sexta-Feira</h2>
        <p>{horario.sexta}</p>
      </div>
      <div className="flex items-center text-sm text-muted-foreground justify-between gap-2">
        <h2>Sábado</h2>
        <p>{horario.sabado}</p>
      </div>
      <div className="flex items-center text-sm text-muted-foreground justify-between gap-2">
        <h2>Domingo</h2>
        <p>{horario.domingo}</p>
      </div>
      <AlertDialog open={alertDialogo} onOpenChange={setAlertDialogo}>
        <AlertDialogContent className="w-[70vw] space-y-3 flex flex-col justify-center items-center rounded-md">
          <AlertDialogHeader>
            <AlertDialogTitle>Copiado!</AlertDialogTitle>
          </AlertDialogHeader>
          <CheckCircle2 className="text-primary " size={50} />
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default BarbershopInfo;
