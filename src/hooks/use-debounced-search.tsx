import { useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

const DEBOUNCE_TIME = 300;

export const useDebouncedSearch = (
  setIsLoading: (isLoading: boolean) => void,
  setIsOpen: (isOpen: boolean) => void,
) => {
  const router = useRouter();

  return useDebouncedCallback((value: string) => {
    if (value.trim() === "") {
      router.push("/");
    } else {
      router.push(`?q=${encodeURIComponent(value)}`);
    }

    setIsLoading(false);
    setIsOpen(true);
  }, DEBOUNCE_TIME);
};
