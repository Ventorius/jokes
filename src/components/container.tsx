"use client";

import { Joke, JokeResponse } from "@/data-layer/fetch-jokes";
import React, { useState } from "react";
import { SearchBox } from "./search-box";

type ContainerProps = {
  jokes: JokeResponse;
};

export const Container = ({ jokes }: ContainerProps) => {
  const [selectedJoke, setSelectedJoke] = useState<Joke | null>(null);

  return (
    <div className="w-full flex-col justify-center items-center">
      {selectedJoke && (
        <div className="w-full flex justify-center">
          <h1 className="text-xl mb-8 mt-4 text-white">{selectedJoke.joke}</h1>
        </div>
      )}
      <div className="w-full flex justify-center">
        <SearchBox jokes={jokes} setSelectedJoke={setSelectedJoke} />
      </div>
    </div>
  );
};
