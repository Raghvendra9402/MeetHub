import { currentProfile } from "@/lib/current-profile";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  try {
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 400 });
    }
    const values = await req.json();
    const { serverId } = await params;

    const updatedServer = await prisma.server.update({
      where: {
        id: serverId,
        profileId: profile.id,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(updatedServer);
  } catch (error) {
    console.log("[EDIT_SERVER_API_ROUTE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
