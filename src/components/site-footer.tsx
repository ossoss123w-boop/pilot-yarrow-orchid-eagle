export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-8 text-sm text-muted sm:flex-row sm:items-start sm:justify-between">
        <p className="font-display text-base font-semibold tracking-widest text-fg">BY MONTA</p>
        <p className="max-w-xl leading-relaxed">
          Fichas, portadas y tráilers salen del catálogo público. El reproductor abre ese tráiler o una fuente
          directa de prueba (HLS o MP4) para calidades y subtítulos en español y árabe. Tu lista y tu historial se
          quedan en este dispositivo.
        </p>
      </div>
    </footer>
  );
}
