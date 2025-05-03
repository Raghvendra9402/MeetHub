import { currentProfile } from "@/lib/current-profile";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function Server({
  params,
}: {
  params: {
    serverId: string;
  };
}) {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/sign-in");
  }

  const { serverId } = await params;
  const server = await prisma.server.findUnique({
    where: {
      id: serverId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
    include: {
      channels: {
        where: {
          name: "general",
        },
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });

  const initialChannel = server?.channels[0];

  if (initialChannel?.name !== "general") {
    return null;
  }
  return redirect(`/servers/${serverId}/channels/${initialChannel?.id}`);
}
