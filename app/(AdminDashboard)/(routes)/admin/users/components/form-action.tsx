'use client';
import { Category, Gender } from '@prisma/client';
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
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const formSchema = z.object({
  role: z.string().min(1, {
    message: 'name is required',
  }),
});

type formValues = z.infer<typeof formSchema>;
interface FormActionProps {
  initialData: Category | null;
}
export default function FormAction({ initialData }: FormActionProps) {
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const router = useRouter();
  const title = initialData ? 'edit user' : 'create user ';
  const action = initialData ? 'save changes' : 'create';
  const toastMessage = initialData
    ? 'user has been updated'
    : ' user has been created';
  const form = useForm<formValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: '',
    },
  });
  const onSubmit = async (values: formValues) => {
    setLoading(true);
    try {
      if (initialData) {
        await axios.patch(`/api/users/${initialData.id}`, values);
      } else {
        await axios.post('/api/users', values);
      }
      toast.success(<p className='capitalize '>{toastMessage}</p>);
      router.refresh();
      router.push('/admin/users');
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
          <FormField
            control={form.control}
            name='role'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        defaultValue={field.value}
                        placeholder='Select a Role'
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='USER'>USER</SelectItem>
                    <SelectItem value='ADMIN'>ADMIN</SelectItem>
                    <SelectItem value='SELLER'>SELLER</SelectItem>
                  </SelectContent>
                </Select>
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
