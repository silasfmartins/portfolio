import { ArrowLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui";
import { Link } from "@/navigation";

export const metadata = {
  title: "404 | Página não encontrada",
};

export default function NotFound() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container">
        <div className="border-border/70 bg-card/70 mx-auto max-w-2xl rounded-3xl border p-8 text-center backdrop-blur-xl sm:p-12">
          <p className="text-primary font-mono text-xs tracking-[0.16em] uppercase">
            Erro 404
          </p>
          <h1 className="font-display text-foreground mt-3 text-4xl font-semibold sm:text-5xl">
            Página não encontrada
          </h1>
          <p className="text-muted-foreground mt-4 text-sm leading-relaxed sm:text-base">
            Não foi possível carregar o conteúdo solicitado. Verifique o
            endereço ou volte para a página inicial.
          </p>

          <Link className={buttonVariants({ className: "mt-8" })} href="/">
            <ArrowLeft className="h-4 w-4" />
            Voltar para Home
          </Link>
        </div>
      </div>
    </section>
  );
}
