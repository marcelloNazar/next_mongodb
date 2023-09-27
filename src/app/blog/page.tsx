
import Link from "next/link";
import Image from "next/image";
import { fetchTeste } from "@/utils/api";
import { IPost } from "@/interfaces/Post";



const Blog: React.FC = async () => {

    const data = await fetchTeste();
  return (
    <div className="flex">
      {data?.map((item:IPost) => (
        <div key={item._id}>
          <a className="flex">
            <div className="flex">
              <Image
                src={item.img}
                alt=""
                width={400}
                height={250}
                className="flex"
              />
            </div>
            <div className="flex">
              <h1 className="flex">{item.title}</h1>
              <p className="flex">{item.desc}</p>
            </div>
          </a>
        </div>
      ))}
    </div>
  );
};

export default Blog;
