"use client";

import { Button } from "@/app/_components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { SearchIcon } from "lucide-react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";

const formSchema = z.object({
  search: z
    .string({ required_error: "Campo obrigatório!" })
    .trim()
    .min(2, "Sua pesquisa deve pelo menos 2 caracteres."),
});

export const Search = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data.search);
  };

  return (
    <div className="flex iten-center gap-2">
      <Form {...form}>
        <form
          className="flex w-full gap-4"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Busque por uma barbearia... "
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button variant="default">
            <SearchIcon size={20} />
          </Button>
        </form>
      </Form>
    </div>
  );
};
