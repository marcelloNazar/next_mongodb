import { fetchOneTest } from "@/utils/api";



export default async function Blog({ params }: { params: { id: string } }) {
  const teste = await fetchOneTest(params.id);
  return (
    <div>
      <div>
        <h2>{teste.title}</h2>
        <h2>{teste.body}</h2>
      </div>
    </div>
  );
}
