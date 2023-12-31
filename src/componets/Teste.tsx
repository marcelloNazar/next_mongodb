import { fetchTeste } from "../utils/api";

export default async function Teste() {
  const teste = await fetchTeste();
  return (
    <div>
      {teste.map((teste: any) => (
        <div key={teste.id}>
          <h2>{teste.title}</h2>
          <h2>{teste.body}</h2>
        </div>
      ))}
    </div>
  );
}
