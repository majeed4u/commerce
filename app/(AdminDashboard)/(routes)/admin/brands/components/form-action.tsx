'use client';
import { Gender } from '@prisma/client';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { useState } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
const formSchema = z.object({
  name: z.string().min(1, {
    message: 'name is required',
  }),
});

type formValues = z.infer<typeof formSchema>;
interface FormActionProps {
  initialData: Gender | null;
}
export default function FormAction({ initialData }: FormActionProps) {
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const router = useRouter();
  const title = initialData ? 'edit brand' : 'create brand ';
  const action = initialData ? 'save changes' : 'create';
  const toastMessage = initialData
    ? 'brand has been updated'
    : ' brand has been created';
  const form = useForm<formValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          name: initialData.name,
        }
      : {
          name: '',
        },
  });
  const onSubmit = async (values: formValues) => {
    setLoading(true);
    try {
      if (initialData) {
        await axios.patch(`/api/brands/${initialData.id}`, values);
      } else {
        await axios.post('/api/brands', values);
      }
      toast.success(<p className='capitalize '>{toastMessage}</p>);
      router.refresh();
      router.push('/admin/brands');
    } catch (error) {
      console.log(error);
      toast.error(<p className='capitalize '>something went wrong</p>);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className='max-w-sm '>
      <h1 className='mb-4 text-2xl font-semibold capitalize '>{title}</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          {' '}
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder='Name' {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={loading} size='lg' className='mt-5 ' type='submit'>
            {action}
          </Button>
        </form>
      </Form>
    </div>
  );
}
