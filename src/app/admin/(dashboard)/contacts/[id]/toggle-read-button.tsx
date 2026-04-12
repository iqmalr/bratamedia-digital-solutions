"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  markContactAsRead,
  markContactAsUnread,
} from "@/lib/actions/admin/contacts";

interface ToggleReadButtonProps {
  contactId: string;
  isRead: boolean;
}

export function ToggleReadButton({ contactId, isRead }: ToggleReadButtonProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleToggle() {
    startTransition(async () => {
      if (isRead) {
        await markContactAsUnread(contactId);
      } else {
        await markContactAsRead(contactId);
      }
      router.refresh();
    });
  }

  return (
    <Button
      variant={isRead ? "outline" : "brand"}
      onClick={handleToggle}
      disabled={isPending}
      aria-busy={isPending}
    >
      {isPending ? "Updating..." : isRead ? "Mark as unread" : "Mark as read"}
    </Button>
  );
}
