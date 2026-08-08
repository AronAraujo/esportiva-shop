"use client";

import { useRef, useState } from "react";

export function ImagensManager({
  nomeCampo = "imagens",
  valoresIniciais = [],
}: {
  nomeCampo?: string;
  valoresIniciais?: string[];
}) {
  const [imagens, setImagens] = useState<string[]>(valoresIniciais);
  const [enviando, setEnviando] = useState<{
    atual: number;
    total: number;
  } | null>(null);
  const [arrastandoSobre, setArrastandoSobre] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const enviarArquivos = async (arquivos: FileList | File[]) => {
    const lista = Array.from(arquivos).filter((a) =>
      a.type.startsWith("image/"),
    );
    if (lista.length === 0) return;

    setErro(null);
    setEnviando({ atual: 0, total: lista.length });

    const novasUrls: string[] = [];

    for (let i = 0; i < lista.length; i++) {
      setEnviando({ atual: i + 1, total: lista.length });

      const formData = new FormData();
      formData.append("file", lista[i]);

      try {
        const resposta = await fetch("/admin/api/admin/upload-imagem", {
          method: "POST",
          body: formData,
        });
        const dados = await resposta.json();

        if (dados.url) {
          novasUrls.push(dados.url);
        } else {
          setErro(dados.erro ?? "Uma das imagens não pôde ser enviada.");
        }
      } catch {
        setErro("Falha de conexão ao enviar uma das imagens.");
      }
    }

    setImagens((atual) => [...atual, ...novasUrls]);
    setEnviando(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const removerImagem = (url: string) => {
    setImagens((atual) => atual.filter((u) => u !== url));
  };

  return (
    <div>
      <label className="block text-sm font-medium text-ink">
        Fotos do produto
      </label>

      <label
        onDragOver={(e) => {
          e.preventDefault();
          setArrastandoSobre(true);
        }}
        onDragLeave={() => setArrastandoSobre(false)}
        onDrop={(e) => {
          e.preventDefault();
          setArrastandoSobre(false);
          if (e.dataTransfer.files?.length)
            enviarArquivos(e.dataTransfer.files);
        }}
        className={`mt-1 flex cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed px-4 py-8 text-center transition-colors ${
          arrastandoSobre ? "border-gold bg-chalk-2" : "border-thread bg-chalk"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.length) enviarArquivos(e.target.files);
          }}
        />
        <span className="font-display text-sm font-semibold uppercase tracking-wide text-thread-dark">
          Arraste as fotos aqui ou clique pra escolher
        </span>
        <span className="mt-1 text-xs text-thread-dark/70">
          Pode escolher várias de uma vez · até 10MB cada
        </span>
      </label>

      {enviando && (
        <p className="mt-2 text-xs text-thread-dark">
          Enviando {enviando.atual} de {enviando.total}...
        </p>
      )}
      {erro && <p className="mt-2 text-xs text-red-600">{erro}</p>}

      {imagens.length > 0 && (
        <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-6">
          {imagens.map((url) => (
            <div
              key={url}
              className="group relative aspect-square overflow-hidden rounded-md bg-chalk-2"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="" className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => removerImagem(url)}
                aria-label="Remover foto"
                className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-pitch/80 text-sm text-chalk opacity-0 transition-opacity group-hover:opacity-100"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      <input type="hidden" name={nomeCampo} value={imagens.join(", ")} />
    </div>
  );
}
