import React from "react";
import { JokeItem } from "./joke-item";
import { Joke } from "@/data-layer/fetch-jokes";

type JokeListProps = {
  jokes: Joke[];
  onSelectJoke: (joke: Joke) => void;
};

export const JokeList = ({ jokes, onSelectJoke }: JokeListProps) => {
  return (
    <div className="absolute top-12 left-0 w-full border-2 border-gray-500 rounded-md overflow-y-auto h-[300px]">
      {jokes.map((joke) => (
        <JokeItem key={joke.id} joke={joke} onSelect={onSelectJoke} />
      ))}
    </div>
  );
};
