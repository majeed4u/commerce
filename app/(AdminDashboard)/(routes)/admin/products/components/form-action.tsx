'use client';
import { Category, Color, Size, Brand, Product } from '@prisma/client';
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
  description: z.string().min(1, {
    message: 'description is required',
  }),
  imageUrl: z.string().min(1, {
    message: 'imageUrl is required',
  }),

  brandId: z.string().min(1, {
    message: 'BrandId is required',
  }),
  colorId: z.string().min(1, {
    message: 'colorId is required',
  }),
  categoryId: z.string().min(1, {
    message: 'categoryId is required',
  }),
  sizeId: z.string().min(1, {
    message: 'sizeId is required',
  }),
  price: z.coerce.number(),
  isNew: z.boolean(),
  isFeatured: z.boolean(),
});

type formValues = z.infer<typeof formSchema>;
interface FormActionProps {
  initialData: Product | null;
  categories: Category[];
  colors: Color[];
  brands: Brand[];
  sizes: Size[];
}
export default function FormAction({
  initialData,
  categories,
  colors,
  brands,
  sizes,
}: FormActionProps) {
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const router = useRouter();
  const title = initialData ? 'edit product' : 'create product ';
  const action = initialData ? 'save changes' : 'create';
  const toastMessage = initialData
    ? 'product has been updated'
    : ' product has been created';
  const form = useForm<formValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          name: initialData.name,
          price: parseFloat(String(initialData?.price)),
        }
      : {
          name: '',
          brandId: '',
          categoryId: '',
          colorId: '',
          description: '',
          imageUrl: '',
          price: 0,
          sizeId: '',
          isFeatured: false,
          isNew: false,
        },
  });
  const onSubmit = async (values: formValues) => {
    setLoading(true);
    try {
      if (initialData) {
        await axios.patch(`/api/products/${initialData.id}`, values);
      } else {
        await axios.post('/api/products', values);
      }
      toast.success(<p className='capitalize '>{toastMessage}</p>);
      router.refresh();
      router.push('/admin/products');
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
            name='categoryId'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder='Select a Category'
                        defaultValue={field.value}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((item) => (
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
