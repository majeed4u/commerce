'use client';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Palette,
  Shapes,
  ShoppingBasket,
  Ungroup,
  Users,
  Zap,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminMainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();

  const routes = [
    {
      href: '/admin',
      label: 'Dashboard',
      active: pathname === '/admin',
      icon: <LayoutDashboard />,
    },
    {
      href: '/admin/genders',
      label: 'Genders',
      active: pathname === '/admin/genders',
      icon: <Ungroup />,
    },
    {
      href: '/admin/categories',
      label: 'Categories',
      active: pathname === '/admin/categories',
      icon: <Shapes />,
    },
    {
      href: '/admin/colors',
      label: 'Colors',
      active: pathname === '/admin/colors',
      icon: <Palette />,
    },
    {
      href: '/admin/sizes',
      label: 'Sizes',
      active: pathname === '/admin/sizes',
      icon: <Zap />,
    },
    {
      href: '/admin/products',
      label: 'Products',
      active: pathname === '/admin/products',
      icon: <ShoppingBasket />,
    },
    {
      href: '/admin/users',
      label: 'Users',
      active: pathname === '/admin/users',
      icon: <Users />,
    },
  ];

  return (
    <nav className={cn('flex flex-col  gap-y-4  ', className)}>
      {routes.map((route) => (
        <Link
          href={route.href}
          key={route.href}
          className={cn(
            'text-xl font-medium transition-colors hover:text-primary flex items-center gap-x-2 pl-3',
            route.active
              ? ' text-gray-300 dark:text-white'
              : ' text-muted-foreground'
          )}
        >
          {route.icon}
          {route.label}
        </Link>
      ))}
    </nav>
  );
}
