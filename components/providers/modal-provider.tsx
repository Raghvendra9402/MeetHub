"use client";

import { useEffect, useState } from "react";
import { CreateServerModal } from "../shared/create-server-modal";
import { InviteModal } from "../shared/invite-modal";
import { EditServerModal } from "../shared/edit-server-modal";
import { MemberModal } from "../shared/member-modal";
import { CreateChannelModal } from "../shared/create-channel-modal";
import { LeaveServerModal } from "../shared/leave-server";
import { DeleteServerModal } from "../shared/delete-server-modal";
import { DeleteChannelModal } from "../shared/delete-channel-modal";
import { EditChannelModal } from "../shared/edit-channel-modal";
import { DeleteMessageModal } from "../shared/delete-message-modal";

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
