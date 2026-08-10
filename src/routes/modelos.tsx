import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import {
  carregarModelos,
  extrairTokens,
  novoId,
  preencherModelo,
  rotuloDoToken,
  salvarModelos,
  type ModeloEscritorio,
} from "@/lib/modelos";

export const Route = createFileRoute("/modelos")({
  head: () => ({
    meta: [
      { title: "Modelos do Escritório | Preenchimento Automático" },
      {
        name: "description",
        content:
          "Cadastre a petição modelo do seu escritório com marcadores e o sistema apenas insere os dados, mantendo a formatação original do texto.",
      },
      { property: "og:title", content: "Modelos do Escritório | Preenchimento Automático" },
      {
        property: "og:description",
        content: "Suba sua própria petição modelo e gere a peça preenchida sem alterar a formatação.",
      },
    ],
  }),
  component: ModelosEscritorio,
});

const EXEMPLO = `EXCELENTÍSSIMO(A) SENHOR(A) DOUTOR(A) JUIZ(ÍZA) DE DIREITO DA ___ VARA CÍVEL DA COMARCA DE {{comarca}}

{{autor}}, {{qualificacaoAutor}}, por seu advogado que esta subscreve, vem propor

AÇÃO DE COBRANÇA

em face de {{reu}}, {{qualificacaoReu}}, pelos fatos a seguir.

I – DOS FATOS

{{fatos}}

II – DOS PEDIDOS

Requer a condenação do réu ao pagamento de R$ {{valor}}.

{{cidade}}, {{data}}.

{{advogado}}
{{oab}}`;

function ModelosEscritorio() {
  const [modelos, setModelos] = useState<ModeloEscritorio[]>([]);
  const [selecionado, setSelecionado] = useState<string | null>(null);
  const [nome, setNome] = useState("");
  const [texto, setTexto] = useState("");
  const [valores, setValores] = useState<Record<string, string>>({});

  useEffect(() => {
    const lista = carregarModelos();
    setModelos(lista);
    if (lista[0]) {
      setSelecionado(lista[0].id);
      setNome(lista[0].nome);
      setTexto(lista[0].texto);
    }
  }, []);

  const tokens = useMemo(() => extrairTokens(texto), [texto]);
  const resultado = useMemo(() => preencherModelo(texto, valores), [texto, valores]);
  const preenchidos = tokens.filter((t) => (valores[t] ?? "").trim() !== "").length;

  const abrir = (m: ModeloEscritorio) => {
    setSelecionado(m.id);
    setNome(m.nome);
    setTexto(m.texto);
    setValores({});
  };

  const novo = () => {
    setSelecionado(null);
    setNome("");
    setTexto("");
    setValores({});
  };

  const salvar = () => {
    if (!nome.trim()) return toast.error("Dê um nome ao modelo.");
    if (!texto.trim()) return toast.error("Cole o texto da petição modelo.");
    const agora = Date.now();
    const id = selecionado ?? novoId();
    const registro: ModeloEscritorio = {
      id,
      nome: nome.trim().slice(0, 120),
      texto,
      atualizadoEm: agora,
    };
    const lista = [registro, ...modelos.filter((m) => m.id !== id)].sort(
      (a, b) => b.atualizadoEm - a.atualizadoEm,
    );
    setModelos(lista);
    salvarModelos(lista);
    setSelecionado(id);
    toast.success("Modelo salvo no seu navegador.");
  };

  const excluir = (id: string) => {
    const lista = modelos.filter((m) => m.id !== id);
    setModelos(lista);
    salvarModelos(lista);
    if (selecionado === id) novo();
    toast.success("Modelo removido.");
  };

  const importar = async (file: File) => {
    const conteudo = await file.text();
    setTexto(conteudo);
    if (!nome.trim()) setNome(file.name.replace(/\.[^.]+$/, ""));
    toast.success("Arquivo carregado. Revise os marcadores.");
  };

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(resultado);
      toast.success("Peça copiada para a área de transferência.");
    } catch {
      toast.error("Não foi possível copiar. Selecione o texto manualmente.");
    }
  };

  const baixar = () => {
    const blob = new Blob([resultado], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${(nome || "peca").replace(/[^\w-]+/g, "-").toLowerCase()}.txt`;
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
          <h1 className="mt-6 max-w-3xl text-3xl leading-tight sm:text-4xl">
            Modelos do escritório
          </h1>
          <div className="mt-5 h-px w-20 rule-gold" />
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-primary-foreground/75">
            Cole ou importe a petição modelo do escritório e marque os pontos variáveis com
            <span className="font-mono"> {"{{campo}}"}</span>. O sistema apenas insere os dados
            informados — toda a formatação, redação e estrutura originais são preservadas.
          </p>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-8 px-6 py-10 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        <section className="space-y-6">
          {modelos.length > 0 && (
            <div className="border border-border bg-card p-5">
              <p className="font-mono text-[0.65rem] tracking-[0.2em] text-gold uppercase">
                Modelos salvos
              </p>
              <ul className="mt-4 space-y-2">
                {modelos.map((m) => (
                  <li key={m.id} className="flex items-center gap-2">
                    <button
                      onClick={() => abrir(m)}
                      className={`flex-1 border px-3 py-2 text-left text-sm transition-colors ${
                        selecionado === m.id
                          ? "border-gold text-foreground"
                          : "border-border text-muted-foreground hover:border-gold"
                      }`}
                    >
                      {m.nome}
                    </button>
                    <button
                      onClick={() => excluir(m.id)}
                      className="border border-border px-2 py-2 font-mono text-[0.65rem] tracking-[0.12em] text-muted-foreground uppercase hover:border-destructive hover:text-destructive"
                    >
                      Excluir
                    </button>
                  </li>
                ))}
              </ul>
              <button
                onClick={novo}
                className="mt-4 font-mono text-[0.65rem] tracking-[0.15em] text-secondary uppercase hover:text-gold"
              >
                + Novo modelo
              </button>
            </div>
          )}

          <div className="border border-border bg-card p-5">
            <p className="font-mono text-[0.65rem] tracking-[0.2em] text-gold uppercase">
              Petição modelo
            </p>
            <label className="mt-4 block">
              <span className="font-mono text-[0.65rem] tracking-[0.18em] text-muted-foreground uppercase">
                Nome do modelo
              </span>
              <input
                value={nome}
                maxLength={120}
                onChange={(e) => setNome(e.target.value)}
                placeholder="ex.: Cobrança padrão do escritório"
                className="mt-2 w-full border border-border bg-card px-3 py-2.5 text-sm outline-none focus:border-gold"
              />
            </label>

            <label className="mt-4 block">
              <span className="font-mono text-[0.65rem] tracking-[0.18em] text-muted-foreground uppercase">
                Texto do modelo (com marcadores)
              </span>
              <textarea
                value={texto}
                rows={14}
                onChange={(e) => setTexto(e.target.value)}
                placeholder={EXEMPLO}
                className="mt-2 w-full border border-border bg-card px-3 py-2.5 font-mono text-xs leading-relaxed outline-none focus:border-gold"
              />
            </label>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <button
                onClick={salvar}
                className="border border-primary bg-primary px-4 py-2 font-mono text-[0.7rem] tracking-[0.15em] text-primary-foreground uppercase transition-colors hover:bg-secondary"
              >
                Salvar modelo
              </button>
              <label className="cursor-pointer border border-border bg-card px-4 py-2 font-mono text-[0.7rem] tracking-[0.15em] text-foreground uppercase transition-colors hover:border-gold">
                Importar .txt
                <input
                  type="file"
                  accept=".txt,.md,text/plain"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) void importar(f);
                    e.target.value = "";
                  }}
                />
              </label>
              {texto.trim() === "" && (
                <button
                  onClick={() => setTexto(EXEMPLO)}
                  className="font-mono text-[0.65rem] tracking-[0.15em] text-secondary uppercase hover:text-gold"
                >
                  Usar exemplo
                </button>
              )}
            </div>
          </div>

          <div className="border border-border bg-card p-5">
            <p className="font-mono text-[0.65rem] tracking-[0.2em] text-gold uppercase">
              Dados a inserir
            </p>
            {tokens.length === 0 ? (
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Nenhum marcador identificado. Insira no texto trechos como{" "}
                <span className="font-mono">{"{{autor}}"}</span> ou{" "}
                <span className="font-mono">{"{{valorDaCausa}}"}</span> nos pontos variáveis.
              </p>
            ) : (
              <>
                <p className="mt-2 font-mono text-[0.65rem] text-muted-foreground">
                  {preenchidos}/{tokens.length} preenchidos
                </p>
                <div className="mt-4 space-y-4">
                  {tokens.map((t) => (
                    <label key={t} className="block">
                      <span className="font-mono text-[0.65rem] tracking-[0.18em] text-muted-foreground uppercase">
                        {rotuloDoToken(t)}
                      </span>
                      <textarea
                        rows={t.toLowerCase().includes("fato") || t.length > 14 ? 3 : 1}
                        value={valores[t] ?? ""}
                        onChange={(e) =>
                          setValores((prev) => ({ ...prev, [t]: e.target.value }))
                        }
                        className="mt-2 w-full border border-border bg-card px-3 py-2.5 text-sm outline-none focus:border-gold"
                      />
                    </label>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        <section className="lg:sticky lg:top-8 lg:self-start">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-serif text-xl">Peça preenchida</h2>
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
            <div className="peca-texto text-card-foreground">
              {resultado || "Cole o modelo do escritório para visualizar a peça preenchida."}
            </div>
          </article>
        </section>
      </main>
    </div>
  );
}
