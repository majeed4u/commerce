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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const formSchema = z.object({
  name: z.string().min(1, {
    message: 'name is required',
  }),
  genderId: z.string().min(1, {
    message: 'GenderId is required',
  }),
});

type formValues = z.infer<typeof formSchema>;
interface FormActionProps {
  initialData: Category | null;
  genders: Gender[];
}
export default function FormAction({ initialData, genders }: FormActionProps) {
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const router = useRouter();
  const title = initialData ? 'edit category' : 'create category ';
  const action = initialData ? 'save changes' : 'create';
  const toastMessage = initialData
    ? 'category has been updated'
    : ' category has been created';
  const form = useForm<formValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          name: initialData.name,
        }
      : {
          name: '',
          genderId: '',
        },
  });
  const onSubmit = async (values: formValues) => {
    setLoading(true);
    try {
      if (initialData) {
        await axios.patch(`/api/categories/${initialData.id}`, values);
      } else {
        await axios.post('/api/categories', values);
      }
      toast.success(<p className='capitalize '>{toastMessage}</p>);
      router.refresh();
      router.push('/admin/categories');
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
          <FormField
            control={form.control}
            name='genderId'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder='Select a Gender'
                        defaultValue={field.value}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {genders.map((item) => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.name}
                      </SelectItem>
                    ))}
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
