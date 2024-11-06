import { Button } from "@/components/ui/button";
import { LogInIcon } from "lucide-react";
import Image from "next/image";

const LoginPage = () => {
  return (
    <div className="grid h-full grid-cols-2">
      <div className="mx-auto flex h-full max-w-[488px] flex-col justify-center">
        <Image
          src="/logo.svg"
          alt="Finance AI"
          width={173}
          height={39}
          className="mb-8"
        />
        <h1 className="mb-3 text-4xl font-bold">Bem-vindo</h1>
        <p className="mb-8 text-muted-foreground">
          A Finance AI é uma plataforma de gestão financeira que utiliza IA para
          monitorar suas movimentações, e oferecer insights personalizados,
          facilitando o controle do seu orçamento.
        </p>

        <Button variant="outline" className="w-full">
          <LogInIcon className="mr-2" />
          Fazer login ou criar uma conta
        </Button>
      </div>

      <div className="relative h-full w-full">
        <Image
          src="/login.png"
          alt="Faça Login"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default LoginPage;
