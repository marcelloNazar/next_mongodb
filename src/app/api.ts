export async function fetchTeste() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    cache: "no-cache",
  });
  const data = await res.json();
  return data;
}
