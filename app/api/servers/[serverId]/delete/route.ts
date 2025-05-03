import { currentProfile } from "@/lib/current-profile";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  try {
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 400 });
    }
    const { serverId } = await params;
    if (!serverId) {
      return new NextResponse("Missing serverid", { status: 401 });
    }

    const server = await prisma.server.delete({
      where: {
        id: serverId,
        profileId: profile.id,
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log("[DELETE_SERVER_ROUTE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
