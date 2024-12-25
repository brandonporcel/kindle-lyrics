import Footer from "@/components/footer";
import FormAction from "@/components/form/form-action";
import Historial from "@/components/historial";

export default function Home() {
  return (
    <main>
      <section className="flex flex-col items-center justify-center py-[15vh] sm:py-[20vh]">
        <h1 className="mb-3 text-4xl font-medium duration-1000 ease-in-out animate-in fade-in slide-in-from-bottom-3">
          Generate PDF with lyrics to your kindle
        </h1>
        <p className="mb-6 text-base duration-1200 ease-in-out animate-in fade-in slide-in-from-bottom-4 opacity-60">
          Enjoy music lyrics and expand knowledge
        </p>

        <FormAction />
      </section>

      <section className="mx-auto flex max-w-5xl flex-col items-stretch pb-28 px-4 sm:px-6">
        <Historial />
      </section>

      <footer className="max-w-5xl mx-auto">
        <Footer />
      </footer>
    </main>
  );
}
