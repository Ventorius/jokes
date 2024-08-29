import { fetchJokes, JokeResponse } from "@/data-layer/fetch-jokes";
import { Container } from "@/components/container";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const jokes = searchParams.q
    ? await fetchJokes(searchParams.q as string)
    : [];

  return (
    <main className="flex flex-col items-center justify-center h-full text-white">
      <h1 className="text-3xl font-semibold mb-8 mt-4 text-white">
        Search jokes
      </h1>
      <Container jokes={jokes as JokeResponse} />
    </main>
  );
}
