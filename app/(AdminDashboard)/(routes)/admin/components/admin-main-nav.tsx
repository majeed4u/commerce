'use client';

import { cn } from '@/lib/utils';
import {
  Bitcoin,
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
import { useEffect, useState } from 'react';

interface AdminNavProps {
  profiles: any;
  className?: string;
  props?: React.HTMLAttributes<HTMLElement>;
}

export default function AdminMainNav({
  profiles,
  className,
  ...props
}: AdminNavProps) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const routes = [
    {
      id: 1,
      href: '/admin',
      label: 'Dashboard',
      active: pathname === '/admin',
      icon: <LayoutDashboard />,
    },
    {
      id: 2,
      href: '/admin/genders',
      label: 'Genders',
      active: pathname === '/admin/genders',
      icon: <Ungroup />,
    },
    {
      id: 3,
      href: '/admin/categories',
      label: 'Categories',
      active: pathname === '/admin/categories',
      icon: <Shapes />,
    },
    {
      id: 4,
      href: '/admin/colors',
      label: 'Colors',
      active: pathname === '/admin/colors',
      icon: <Palette />,
    },
    {
      id: 5,
      href: '/admin/sizes',
      label: 'Sizes',
      active: pathname === '/admin/sizes',
      icon: <Zap />,
    },
    {
      id: 5,
      href: '/admin/brands',
      label: 'Brands',
      active: pathname === '/admin/brands',
      icon: <Bitcoin />,
    },
    {
      id: 6,
      href: '/admin/products',
      label: 'Products',
      active: pathname === '/admin/products',
      icon: <ShoppingBasket />,
    },
  ];

  if (!mounted) return null;
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
          {...props}
        >
          {route.icon}
          {route.label}
        </Link>
      ))}
      {profiles?.role !== 'SELLER' && (
        <Link
          href='/admin/users'
          className={cn(
            'text-xl font-medium transition-colors hover:text-primary flex items-center gap-x-2 pl-3',
            pathname === '/admin/users'
              ? ' text-gray-300 dark:text-white'
              : ' text-muted-foreground'
          )}
          {...props}
        >
          <Users />
          Users
        </Link>
      )}
    </nav>
  );
}
