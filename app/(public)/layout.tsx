import PublicLayoutShell from './_components/public-layout-shell';

export default function PublicLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <PublicLayoutShell>{children}</PublicLayoutShell>;
}
