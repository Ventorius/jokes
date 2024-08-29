"use client";

import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Joke, JokeResponse } from "@/data-layer/fetch-jokes";

type SearchBoxProps = {
  jokes: JokeResponse;
  setSelectedJoke: (joke: Joke) => void;
};

export const SearchBox = ({ jokes, setSelectedJoke }: SearchBoxProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const searchBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const debouncedSearch = useDebouncedCallback((value: string) => {
    if (value.trim() === "") {
      router.push("/");
    } else {
      router.push(`?q=${encodeURIComponent(value)}`);
    }

    setIsLoading(false);
    setIsOpen(true);
  }, 300);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    debouncedSearch(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  const handleSelectJoke = (joke: Joke) => {
    setSelectedJoke(joke);
    setIsOpen(false);
  };

  return (
    <div className="relative w-1/3" ref={searchBoxRef}>
      <Input
        icon={isOpen ? <ChevronDown /> : <ChevronUp />}
        isLoading={isLoading}
        onChange={handleSearch}
        onKeyDown={handleKeyDown}
      />
      {isOpen && jokes?.results?.length > 0 && (
        <div className="absolute top-12 left-0 w-full border-2 border-gray-500 rounded-md overflow-y-auto h-[300px]">
          {jokes?.results?.map((joke) => (
            <div
              key={joke.id}
              className="m-2 p-2 rounded-md hover:bg-blue-500/20 hover:text-blue-300 overflow-hidden text-ellipsis whitespace-nowrap py-4 text-gray-300 cursor-pointer"
              title={joke.joke}
              onClick={() => handleSelectJoke(joke)}
            >
              {joke.joke}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
