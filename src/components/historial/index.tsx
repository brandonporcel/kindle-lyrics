import { Input } from "@/components/ui/input";

function Historial() {
  const recentPdfs = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    title: `PDF ${i + 1}`,
    artist: "Artist Name",
    date: "2024-01-15",
  }));

  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-4 flex flex-col flex-nowrap items-center justify-between gap-2 sm:flex-row sm:justify-center">
          <h2 className="w-full text-left text-2xl font-semibold">
            Recent pdf
          </h2>
          <div className="relative w-full rounded-lg sm:max-w-[260px]">
            <Input placeholder="Search..." type="text" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {recentPdfs.map((pdf) => (
            <div
              key={pdf.id}
              className="aspect-[3/4] bg-card border-border hover:bg-accent/50 transition-colors relative overflow-hidden "
            >
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-gray-200/80 to-gray-300/90 dark:from-gray-800/80 dark:to-gray-900/90 backdrop-blur-sm">
                <div className="h-full w-full relative overflow-hidden">
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                    style={{
                      animation: "shimmer 2s infinite linear",
                      backgroundSize: "200% 100%",
                      transform: "translateX(-100%)",
                    }}
                  />
                </div>
              </div>
              <div className="flex h-full items-center justify-center">
                <div className="text-center text-card-foreground/50">
                  <div className="text-sm font-medium">PDF {pdf.id}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default Historial;
