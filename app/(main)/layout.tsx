import React from 'react';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>Nav{children}</div>;
}
