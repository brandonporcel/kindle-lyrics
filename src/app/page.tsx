import FormAction from "@/components/form/form-action";
import Historial from "@/components/historial";

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center py-[15vh] sm:py-[20vh]">
        <h1 className="mb-3 text-4xl font-medium duration-1000 ease-in-out animate-in fade-in slide-in-from-bottom-3">
          Generate PDF to your kindle
        </h1>
        <p className="mb-6 text-base duration-1200 ease-in-out animate-in fade-in slide-in-from-bottom-4 opacity-60">
          Enjoy music lyrics and expand knowledge
        </p>

        <FormAction />
      </div>
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col items-stretch pb-28 px-4 sm:px-6">
        <Historial />
      </div>
    </>
  );
}
