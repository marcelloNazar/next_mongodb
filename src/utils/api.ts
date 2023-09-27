import useSWR from "swr";

export function fetchOnClient(username: string) {
  const fetcher = (...args: Parameters<typeof fetch>) =>
    fetch(...args).then((res) => res.json());

  const { data, mutate, error, isLoading } = useSWR(
    `http://localhost:3000/api/posts?username=${username}`,
    fetcher
  );
  return {
    data,
    mutate,
    error,
    isLoading,
  };
}

export async function fetchTeste() {
  const res = await fetch("http://localhost:3000/api/posts", {
    cache: "no-cache",
  });
  const data = await res.json();
  return data;
}
export async function fetchOneTest(id: string) {
  const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data;
}
