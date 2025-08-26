import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function debounce<T extends (...args: any[]) => void>(
  callback: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}

export const onErrorImage = (event: React.SyntheticEvent<HTMLImageElement>) => {
  event.currentTarget.src =
    "https://images.squarespace-cdn.com/content/v1/5d2e2c5ef24531000113c2a4/1564770283101-36J6KM8EIK71FOCGGDM2/album-placeholder.png?format=1000w";
};

export const getSpotifyId = (input: string): string | null => {
  // regex para IDs de spotify (22 caracteres alfanuméricos)
  const idRegex = /^[A-Za-z0-9]{22}$/;

  if (idRegex.test(input)) {
    // ya es un ID válido
    return input;
  }

  try {
    const url = new URL(input);
    // el pathname es algo como /album/2lbVK9NP3QKqEeA8NrOjbx
    const parts = url.pathname.split("/");
    const idCandidate = parts.pop() || parts.pop(); // último segmento (evita trailing slash)

    if (idCandidate && idRegex.test(idCandidate)) {
      return idCandidate;
    }
  } catch {}

  return null; // no es un ID válido ni una URL de spotify
};
