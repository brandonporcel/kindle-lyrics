import Image from "next/image";
import { Input } from "../ui/input";
import styles from "./styles.module.css";

function Historial() {
  const elems: any[] = [
    { image: "1" },
    { image: "1" },
    { image: "1" },
    { image: "1" },
    { image: "1" },
    { image: "1" },
    { image: "1" },
    { image: "1" },
    { image: "1" },
    { image: "1" },
    { image: "1" },
    { image: "1" },
    { image: "1" },
    { image: "1" },
    { image: "1" },
    { image: "1" },
    { image: "1" },
    { image: "1" },
  ];

  return (
    <div className="duration-1200 ease-in-out animate-in fade-in slide-in-from-bottom-4">
      <div className="mb-4 flex flex-col flex-nowrap items-center justify-between gap-2 sm:flex-row sm:justify-center">
        <h2 className="w-full text-left text-2xl font-semibold">Recent pdf</h2>
        <div className="relative w-full rounded-lg sm:max-w-[260px]">
          <Input placeholder="Search..." type="text" />
        </div>
      </div>
      <ul className="grid w-full auto-rows-fr grid-cols-3 justify-items-stretch gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
        {elems.map((elem, i) => {
          return (
            <li
              key={i}
              className="group relative isolate flex select-none flex-col flex-nowrap items-center gap-1.5 overflow-hidden"
            >
              <Image
                width={768}
                height={768}
                alt="ai generated emoji"
                className="aspect-square w-full rounded-xl"
                src="https://aaah0mnbncqtinas.public.blob.vercel-storage.com/TR8rvUKXr5-no-background-73jDXghtn8dsHdWik1rVH1JUFyj9Zx.png"
                loading="lazy"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 aspect-square overflow-hidden rounded-xl bg-white transition-opacity duration-200 ease-out z-10 opacity-100"
              >
                <div
                  className={`skeleton h-full w-full bg-gray-200 relative ${styles.animate}`}
                ></div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Historial;
