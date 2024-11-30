'use client';
import { subscribe } from '@/app/actions/subscribe';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { handleError } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRightIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const newsletterSchema = z.object({
  email: z.string().email(),
});

export const Newsletter = () => {
  const form = useForm<z.infer<typeof newsletterSchema>>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: '',
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof newsletterSchema>) => {
    try {
      const response = await subscribe(values.email);

      if ('error' in response) {
        throw new Error(response.error);
      }

      form.reset();
      toast.success(response.message);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="relative">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel className="sr-only">Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="jane@acme.com"
                  {...field}
                  className="h-auto rounded-full bg-background px-8 py-4 pr-16"
                />
              </FormControl>
              <FormDescription className="py-2">
                I promise not to spam you or sell your email address.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="absolute top-[3px] right-[3px] aspect-square h-auto rounded-full"
          disabled={form.formState.isSubmitting || !form.formState.isValid}
        >
          <ArrowRightIcon size={16} />
        </Button>
      </form>
    </Form>
  );
};
