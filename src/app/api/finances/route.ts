import { NextRequest, NextResponse } from "next/server";
import connect from "@/utils/db";
import Finance from "@/models/Finance";
import { IFinance } from "@/interfaces/Post";

export const GET = async (request: NextRequest) => {
  const url = new URL(request.url);

  const username = url.searchParams.get("username");
  try {
    await connect();

    const finances = await Finance.find({ username: username });

    return new NextResponse(JSON.stringify(finances), { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const POST = async (request: NextRequest) => {
  const body = await request.json();

  const newFinance = new Finance(body as IFinance);

  try {
    await connect();

    await newFinance.save();

    return new NextResponse("Post has been created", { status: 201 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
