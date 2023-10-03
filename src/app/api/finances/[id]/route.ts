import { NextRequest, NextResponse } from "next/server";
import connect from "@/utils/db";
import Finance from "@/models/Finance";

export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;

  try {
    await connect();

    const finance = await Finance.findById(id);

    if (!finance) {
      return new NextResponse("finance not found", { status: 404 });
    }

    return new NextResponse(JSON.stringify(finance), { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const DELETE = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;

  try {
    await connect();

    const post = await Finance.findByIdAndDelete(id);

    return new NextResponse("Post deletado", { status: 204 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
