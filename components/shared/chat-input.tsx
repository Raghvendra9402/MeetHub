"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Plus, Send } from "lucide-react";
import qs from "query-string";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EmojiPicker } from "@/components/shared/emoji-picker";

interface ChatInputProps {
  apiUrl: string;
  //@ts-ignore
  query: Record<string, any>;
  name: string;
  type: "conversation" | "channel";
}

const formSchema = z.object({
  content: z.string().min(1),
});

export function ChatInput({ apiUrl, query, name, type }: ChatInputProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: apiUrl,
        query,
      });

      await axios.post(url, values);
      toast.success("Message sent!");
      form.reset();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex  items-center gap-2 px-4 py-2"
      >
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="flex-1 w-full">
              <FormControl>
                <div className="relative w-full">
                  <button
                    type="button"
                    onClick={() => {}}
                    className="absolute top-1/2 left-3 -translate-y-1/2 h-[24px] w-[24px] bg-zinc-500 dark:bg-zinc-400 hover:bg-zinc-600 dark:hover:bg-zinc-300 transition rounded-full p-1 flex items-center justify-center"
                  >
                    <Plus className="size-4" />
                  </button>
                  <div className="absolute top-1/2 right-3 -translate-y-1/2 text-zinc-500 dark:text-zinc-400 cursor-pointer hover:text-zinc-600 dark:hover:text-zinc-300">
                    <EmojiPicker
                      onChange={(emoji: string) =>
                        field.onChange(`${field.value} ${emoji}`)
                      }
                    />
                  </div>
                  <Input
                    {...field}
                    disabled={form.formState.isSubmitting}
                    placeholder={`Message ${
                      type === "conversation" ? name : "#" + name
                    }`}
                    className="w-full pl-12 pr-4 py-6 bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200"
                  />
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          variant={"outline"}
          size={"icon"}
          disabled={!form.formState.isValid}
        >
          <Send className="size-5" />
        </Button>
      </form>
    </Form>
  );
}
