
export type Joke = {
  id: string;
  joke: string;
};

export type JokeResponse = {
  current_page: number;
  limit: number;
  next_page: number;
  previous_page: number;
  results: Joke[];
};
export async function fetchJokes(query: string = ""): Promise<JokeResponse> {
  const response = await fetch(
    `https://icanhazdadjoke.com/search?term=${query}`,
    {
      headers: {
        Accept: "application/json",
      },
  });

  const res = await response.json();

  return res
}
