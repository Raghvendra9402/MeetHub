import { ChatHeader } from "@/components/shared/chat-header";
import { ChatInput } from "@/components/shared/chat-input";
import { ChatMessages } from "@/components/shared/chat-messages";
import { MediaRoom } from "@/components/shared/media-room";
import { currentProfile } from "@/lib/current-profile";
import { prisma } from "@/lib/db";
import { ChannelType } from "@prisma/client";
import { redirect } from "next/navigation";

export default async function ChannelIdPage({
  params,
}: {
  params: { serverId: string; channelId: string };
}) {
  const profile = await currentProfile();
  if (!profile) {
    return redirect("/sign-in");
  }
  const { serverId, channelId } = await params;

  const channel = await prisma.channel.findUnique({
    where: {
      id: channelId,
    },
  });

  const member = await prisma.member.findFirst({
    where: {
      serverId,
      profileId: profile.id,
    },
  });

  if (!channel || !member) {
    return redirect("/");
  }
  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader
        name={channel.name}
        serverId={channel.serverId}
        type="channel"
      />
      {channel.type === ChannelType.TEXT && (
        <>
          <ChatMessages
            name={channel.name}
            member={member}
            type="channel"
            apiUrl="/api/message"
            socketUrl="/api/socket/messages"
            socketQuery={{
              channelId: channel.id,
              serverId: channel.serverId,
            }}
            paramKey="channelId"
            paramValue={channel.id}
            chatId={channel.id}
          />
          <ChatInput
            name={channel.name}
            type="channel"
            apiUrl="/api/socket/messages"
            query={{
              channelId: channel.id,
              serverId: channel.serverId,
            }}
          />
        </>
      )}
      {channel.type === ChannelType.AUDIO && (
        <MediaRoom chatId={channel.id} video={false} audio={true} />
      )}
      {channel.type === ChannelType.VIDEO && (
        <MediaRoom chatId={channel.id} video={true} audio={true} />
      )}
    </div>
  );
}
