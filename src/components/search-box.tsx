"use client";

import React, { useState, useRef } from "react";
import { Input } from "@/components/ui/input";

import { ChevronDown, ChevronUp } from "lucide-react";

import { Joke, JokeResponse } from "@/data-layer/fetch-jokes";
import { JokeList } from "./joke-list";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { useDebouncedSearch } from "@/hooks/use-debounced-search";

type SearchBoxProps = {
  jokes: JokeResponse;
  setSelectedJoke: (joke: Joke) => void;
};

export const SearchBox = ({ jokes, setSelectedJoke }: SearchBoxProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const searchBoxRef = useRef<HTMLDivElement>(null);

  useOutsideClick(searchBoxRef, setIsOpen);

  const debouncedSearch = useDebouncedSearch(setIsLoading, setIsOpen);

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
        <JokeList jokes={jokes.results} onSelectJoke={handleSelectJoke} />
      )}
    </div>
  );
};
