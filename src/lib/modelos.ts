export type ModeloEscritorio = {
  id: string;
  nome: string;
  texto: string;
  atualizadoEm: number;
};

const STORAGE_KEY = "acervo.modelos.escritorio";

/** Extrai os marcadores {{campo}} na ordem em que aparecem, sem repetir. */
export function extrairTokens(texto: string): string[] {
  const encontrados = texto.match(/\{\{\s*[\wÀ-ÿ]+\s*\}\}/g) ?? [];
  const ids = encontrados.map((m) => m.replace(/[{}\s]/g, ""));
  return Array.from(new Set(ids));
}

/** Transforma "valorDaCausa" ou "valor_da_causa" em "Valor da causa". */
export function rotuloDoToken(token: string): string {
  const espacado = token
    .replace(/_+/g, " ")
    .replace(/([a-zà-ÿ0-9])([A-ZÀ-Þ])/g, "$1 $2")
    .toLowerCase()
    .trim();
  return espacado.charAt(0).toUpperCase() + espacado.slice(1);
}

/**
 * Substitui os marcadores pelos dados informados preservando integralmente
 * o texto original: espaços, quebras de linha, maiúsculas e pontuação.
 */
export function preencherModelo(texto: string, valores: Record<string, string>): string {
  return texto.replace(/\{\{\s*([\wÀ-ÿ]+)\s*\}\}/g, (_, token: string) => {
    const valor = valores[token]?.trim();
    return valor ? valor : "____________";
  });
}

export function carregarModelos(): ModeloEscritorio[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const lista = raw ? (JSON.parse(raw) as ModeloEscritorio[]) : [];
    return Array.isArray(lista) ? lista.sort((a, b) => b.atualizadoEm - a.atualizadoEm) : [];
  } catch {
    return [];
  }
}

export function salvarModelos(lista: ModeloEscritorio[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lista));
}

export function novoId() {
  return `m-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}
