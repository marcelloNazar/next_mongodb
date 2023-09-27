import { fetchOneTest } from "@/utils/api";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const post = await fetchOneTest(params.id);
  return {
    title: post.title,
    description: post.desc,
  };
}

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
