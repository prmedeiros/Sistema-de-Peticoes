import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { CAMPOS_COMUNS, gerarTexto, getPeticao, type Campo } from "@/data/peticoes";

export const Route = createFileRoute("/peticao/$id")({
  loader: ({ params }) => {
    const pet = getPeticao(params.id);
    if (!pet) throw notFound();
    return { pet };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Peça não encontrada" }, { name: "robots", content: "noindex" }] };
    }
    const { pet } = loaderData;
    const titulo = `${pet.titulo} — Modelo e Gerador`;
    return {
      meta: [
        { title: titulo },
        { name: "description", content: pet.descricao },
        { property: "og:title", content: titulo },
        { property: "og:description", content: pet.descricao },
      ],
    };
  },
  component: Gerador,
});

function CampoInput({
  campo,
  valor,
  onChange,
}: {
  campo: Campo;
  valor: string;
  onChange: (v: string) => void;
}) {
  const base =
    "mt-2 w-full border border-border bg-card px-3 py-2.5 text-sm outline-none focus:border-gold";
  return (
    <label className="block">
      <span className="font-mono text-[0.65rem] tracking-[0.18em] text-muted-foreground uppercase">
        {campo.label}
      </span>
      {campo.tipo === "textarea" ? (
        <textarea
          rows={4}
          value={valor}
          placeholder={campo.placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={base}
        />
      ) : (
        <input
          type={campo.tipo === "date" ? "date" : "text"}
          value={valor}
          placeholder={campo.placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={base}
        />
      )}
    </label>
  );
}

function Gerador() {
  const { pet } = Route.useLoaderData();
  const [valores, setValores] = useState<Record<string, string>>({});

  const campos = useMemo(() => {
    const comuns = CAMPOS_COMUNS;
    const especificos = pet.campos.filter((c) => !comuns.some((x) => x.id === c.id));
    return { comuns, especificos };
  }, [pet]);

  const texto = useMemo(() => gerarTexto(pet, valores), [pet, valores]);

  const set = (id: string, v: string) => setValores((prev) => ({ ...prev, [id]: v }));

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(texto);
      toast.success("Petição copiada para a área de transferência.");
    } catch {
      toast.error("Não foi possível copiar. Selecione o texto manualmente.");
    }
  };

  const baixar = () => {
    const blob = new Blob([texto], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${pet.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-6xl px-6 py-10 sm:px-8">
          <Link
            to="/"
            className="font-mono text-[0.65rem] tracking-[0.2em] text-gold uppercase hover:underline"
          >
            ← Acervo
          </Link>
          <p className="mt-6 font-mono text-[0.65rem] tracking-[0.2em] text-primary-foreground/60 uppercase">
            {pet.area}
          </p>
          <h1 className="mt-3 max-w-3xl text-3xl leading-tight sm:text-4xl">{pet.titulo}</h1>
          <div className="mt-5 h-px w-20 rule-gold" />
          <p className="mt-5 max-w-2xl text-sm text-primary-foreground/75">{pet.descricao}</p>
          <p className="mt-4 font-mono text-[0.7rem] text-primary-foreground/55">
            Base legal: {pet.base.join(" · ")}
          </p>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-8 px-6 py-10 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        <section>
          <h2 className="font-serif text-xl">Dados da peça</h2>
          <div className="mt-6 space-y-5">
            {campos.especificos.length > 0 && (
              <div className="border border-border bg-card p-5">
                <p className="font-mono text-[0.65rem] tracking-[0.2em] text-gold uppercase">
                  Específicos desta ação
                </p>
                <div className="mt-4 space-y-4">
                  {campos.especificos.map((c) => (
                    <CampoInput
                      key={c.id}
                      campo={c}
                      valor={valores[c.id] ?? ""}
                      onChange={(v) => set(c.id, v)}
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="border border-border bg-card p-5">
              <p className="font-mono text-[0.65rem] tracking-[0.2em] text-gold uppercase">
                Partes, fatos e assinatura
              </p>
              <div className="mt-4 space-y-4">
                {campos.comuns.map((c) => (
                  <CampoInput
                    key={c.id}
                    campo={c}
                    valor={valores[c.id] ?? ""}
                    onChange={(v) => set(c.id, v)}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="lg:sticky lg:top-8 lg:self-start">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-serif text-xl">Peça gerada</h2>
            <div className="flex gap-2">
              <button
                onClick={copiar}
                className="border border-primary bg-primary px-4 py-2 font-mono text-[0.7rem] tracking-[0.15em] text-primary-foreground uppercase transition-colors hover:bg-secondary"
              >
                Copiar
              </button>
              <button
                onClick={baixar}
                className="border border-border bg-card px-4 py-2 font-mono text-[0.7rem] tracking-[0.15em] text-foreground uppercase transition-colors hover:border-gold"
              >
                Baixar .txt
              </button>
            </div>
          </div>
          <article className="mt-5 max-h-[70vh] overflow-y-auto border border-border bg-card p-6 shadow-panel sm:p-10">
            <div className="peca-texto text-card-foreground">{texto}</div>
          </article>
        </section>
      </main>
    </div>
  );
}
