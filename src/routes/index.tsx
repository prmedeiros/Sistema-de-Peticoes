import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AREAS, PETICOES } from "@/data/peticoes";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Acervo de Petições | Modelos para Advocacia" },
      {
        name: "description",
        content:
          "Biblioteca com modelos de petições cível, trabalhista, família, penal, consumidor, previdenciário, tributário e empresarial, com gerador de peça preenchida.",
      },
      { property: "og:title", content: "Acervo de Petições | Modelos para Advocacia" },
      {
        property: "og:description",
        content: "Modelos de petições organizados por área, com gerador de peça pronta para protocolo.",
      },
    ],
  }),
  component: Biblioteca,
});

function Biblioteca() {
  const [busca, setBusca] = useState("");
  const [area, setArea] = useState<string | null>(null);

  const lista = useMemo(() => {
    const q = busca.trim().toLowerCase();
    return PETICOES.filter((p) => {
      const okArea = !area || p.area === area;
      const okBusca =
        !q ||
        p.titulo.toLowerCase().includes(q) ||
        p.descricao.toLowerCase().includes(q) ||
        p.area.toLowerCase().includes(q) ||
        p.base.join(" ").toLowerCase().includes(q);
      return okArea && okBusca;
    });
  }, [busca, area]);

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-6xl px-6 pt-14 pb-16 sm:px-8">
          <p className="font-mono text-[0.7rem] tracking-[0.35em] text-gold uppercase">
            Acervo processual
          </p>
          <h1 className="mt-5 max-w-2xl text-4xl leading-tight sm:text-5xl">
            Petições para todas as frentes do escritório
          </h1>
          <div className="mt-6 h-px w-24 rule-gold" />
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-primary-foreground/75">
            {PETICOES.length} modelos redigidos e fundamentados, distribuídos em {AREAS.length} áreas
            de atuação. Escolha a peça, preencha a qualificação das partes e os fatos, e obtenha o
            texto pronto para revisão e protocolo.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12 sm:px-8">
        <div className="flex flex-col gap-5">
          <label className="block">
            <span className="font-mono text-[0.7rem] tracking-[0.25em] text-muted-foreground uppercase">
              Buscar peça
            </span>
            <input
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="ex.: despejo, danos morais, habeas corpus"
              className="mt-2 w-full border border-border bg-card px-4 py-3 text-sm outline-none focus:border-gold"
            />
          </label>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setArea(null)}
              className={`border px-3 py-1.5 font-mono text-[0.7rem] tracking-[0.12em] uppercase transition-colors ${
                area === null
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-gold"
              }`}
            >
              Todas
            </button>
            {AREAS.map((a) => (
              <button
                key={a}
                onClick={() => setArea(a)}
                className={`border px-3 py-1.5 font-mono text-[0.7rem] tracking-[0.12em] uppercase transition-colors ${
                  area === a
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-muted-foreground hover:border-gold"
                }`}
              >
                {a}
              </button>
            ))}
          </div>
        </div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {lista.map((p) => (
            <li key={p.id}>
              <Link
                to="/peticao/$id"
                params={{ id: p.id }}
                className="group flex h-full flex-col border border-border bg-card p-5 transition-shadow hover:shadow-panel"
              >
                <span className="font-mono text-[0.65rem] tracking-[0.2em] text-gold uppercase">
                  {p.area}
                </span>
                <h2 className="mt-3 font-serif text-lg leading-snug text-card-foreground">
                  {p.titulo}
                </h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {p.descricao}
                </p>
                <span className="mt-5 font-mono text-[0.7rem] tracking-[0.18em] text-secondary uppercase group-hover:text-gold">
                  Abrir gerador →
                </span>
              </Link>
            </li>
          ))}
        </ul>

        {lista.length === 0 && (
          <p className="mt-12 text-center text-sm text-muted-foreground">
            Nenhuma peça encontrada para esta busca.
          </p>
        )}
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-8 sm:px-8">
          <p className="text-xs leading-relaxed text-muted-foreground">
            Os modelos são referências de redação e devem ser adaptados ao caso concreto e à
            legislação vigente pelo advogado responsável.
          </p>
        </div>
      </footer>
    </div>
  );
}
