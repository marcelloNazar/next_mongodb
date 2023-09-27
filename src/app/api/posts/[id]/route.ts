import { NextRequest, NextResponse } from "next/server";
import connect from "@/utils/db";
import Post from "@/models/Post";

export const GET = async (request: NextRequest, { params }: { params: { id: string } }) => {
    const { id } = params;
  
    try {
      await connect();
  
      const post = await Post.findById(id);
  
      if (!post) {
        return new NextResponse("Post not found", { status: 404 });
      }
  
      return new NextResponse(JSON.stringify(post), { status: 200 });
    } catch (err) {
      return new NextResponse("Database Error", { status: 500 });
    }
  };