import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";

export const metadata = {
  title: "404 | Página não encontrada",
};

export default function NotFound() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container">
        <div className="mx-auto max-w-2xl rounded-3xl border border-border/70 bg-card/70 p-8 text-center backdrop-blur-xl sm:p-12">
          <p className="font-mono text-primary text-xs uppercase tracking-[0.16em]">
            Erro 404
          </p>
          <h1 className="mt-3 font-display font-semibold text-4xl text-foreground sm:text-5xl">
            Página não encontrada
          </h1>
          <p className="mt-4 text-muted-foreground text-sm leading-relaxed sm:text-base">
            Não foi possível carregar o conteúdo solicitado. Verifique o
            endereço ou volte para a página inicial.
          </p>

          <Link className="mt-8 inline-flex" href="/">
            <Button>
              <ArrowLeft className="h-4 w-4" />
              Voltar para Home
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
