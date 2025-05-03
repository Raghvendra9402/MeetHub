"use client";

import { useEffect, useState } from "react";
import { CreateServerModal } from "@/components/shared/create-server-modal";
import { InviteModal } from "@/components/shared/invite-modal";
import { EditServerModal } from "@/components/shared/edit-server-modal";
import { MemberModal } from "@/components/shared/member-modal";
import { CreateChannelModal } from "@/components/shared/create-channel-modal";
import { LeaveServerModal } from "@/components/shared/leave-server";
import { DeleteServerModal } from "@/components/shared/delete-server-modal";
import { DeleteChannelModal } from "@/components/shared/delete-channel-modal";
import { EditChannelModal } from "@/components/shared/edit-channel-modal";
import { DeleteMessageModal } from "@/components/shared/delete-message-modal";

export function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <CreateServerModal />
      <InviteModal />
      <EditServerModal />
      <MemberModal />
      <CreateChannelModal />
      <LeaveServerModal />
      <DeleteServerModal />
      <DeleteChannelModal />
      <EditChannelModal />
      <DeleteMessageModal />
    </>
  );
}
