import { currentProfile } from "@/lib/current-profile";
import { prisma } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  try {
    const { serverId } = await params;
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 400 });
    }
    if (!serverId) {
      return new NextResponse("Missing fields", { status: 400 });
    }

    const server = await prisma.server.update({
      where: {
        id: serverId,
        profileId: profile.id,
      },
      data: {
        inviteCode: uuidv4(),
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log("[INVITE_CODE_API_ROUTE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
