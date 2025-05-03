"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Picker, { EmojiClickData } from "emoji-picker-react";
import { Smile } from "lucide-react";

interface EmojiPickerProps {
  onChange: (value: string) => void;
}

export function EmojiPicker({ onChange }: EmojiPickerProps) {
  return (
    <Popover>
      <PopoverTrigger>
        <Smile className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition cursor-pointer" />
      </PopoverTrigger>
      <PopoverContent
        side="right"
        sideOffset={40}
        className="bg-transparent border-none shadow-none drop-shadow-none mb-16"
      >
        <Picker
          onEmojiClick={(emoji: EmojiClickData) => onChange(emoji.emoji)}
        />
      </PopoverContent>
    </Popover>
  );
}
