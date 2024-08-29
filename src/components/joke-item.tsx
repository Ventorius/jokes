import { Joke } from "@/data-layer/fetch-jokes";
import React from "react";

type JokeItemProps = {
  joke: Joke;
  onSelect: (joke: Joke) => void;
};

export const JokeItem = ({ joke, onSelect }: JokeItemProps) => {
  return (
    <div
      className="m-2 p-2 rounded-md hover:bg-blue-500/20 hover:text-blue-300 overflow-hidden text-ellipsis whitespace-nowrap py-4 text-gray-300 cursor-pointer"
      title={joke.joke}
      onClick={() => onSelect(joke)}
    >
      {joke.joke}
    </div>
  );
};
