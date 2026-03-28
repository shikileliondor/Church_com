'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const navLinks = [
  { href: '/', label: 'Accueil' },
  { href: '/annonces', label: 'Annonces' },
  { href: '/evenements', label: 'Événements' },
  { href: '/galerie', label: 'Galerie' },
  { href: '/statistiques', label: 'Statistiques' },
];

function FourscomLogo({ dark = false }: { dark?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className="grid h-8 w-8 grid-cols-2 gap-1">
        <span className="rounded-[3px] bg-[#C0392B]" />
        <span className="rounded-[3px] bg-[#2980B9]" />
        <span className="rounded-[3px] bg-[#F1C40F]" />
        <span className="rounded-[3px] bg-[#8E44AD]" />
      </div>
      <span
        className={`font-[var(--font-playfair)] text-2xl font-bold ${
          dark ? 'text-white' : 'text-[#C0392B]'
        }`}
      >
        Fourscom
      </span>
    </div>
  );
}

export default function PublicLayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsCompact(window.scrollY > 16);

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#1A1A2E]">
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b border-black/5 bg-white/95 shadow-sm backdrop-blur transition-all duration-300 ${
          isCompact ? 'py-2' : 'py-3.5'
        }`}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" aria-label="Aller à l'accueil Fourscom">
            <FourscomLogo />
          </Link>

          <nav className="hidden items-center gap-7 md:flex" aria-label="Navigation principale">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsDrawerOpen(false)}
                  className={`border-b-2 pb-1 text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'border-[#C0392B] text-[#1A1A2E]'
                      : 'border-transparent text-[#1A1A2E]/80 hover:text-[#1A1A2E]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            aria-label="Ouvrir le menu"
            aria-expanded={isDrawerOpen}
            className="flex h-10 w-10 items-center justify-center rounded-md border border-[#1A1A2E]/10 md:hidden"
            onClick={() => setIsDrawerOpen((prev) => !prev)}
          >
            <span className="sr-only">Menu</span>
            <div className="flex w-5 flex-col gap-1.5">
              <span
                className={`h-0.5 w-full bg-[#1A1A2E] transition-transform duration-300 ${
                  isDrawerOpen ? 'translate-y-2 rotate-45' : ''
                }`}
              />
              <span
                className={`h-0.5 w-full bg-[#1A1A2E] transition-opacity duration-300 ${
                  isDrawerOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`h-0.5 w-full bg-[#1A1A2E] transition-transform duration-300 ${
                  isDrawerOpen ? '-translate-y-2 -rotate-45' : ''
                }`}
              />
            </div>
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-[#1A1A2E]/40 transition-opacity duration-300 md:hidden ${
          isDrawerOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setIsDrawerOpen(false)}
      />

      <aside
        className={`fixed right-0 top-0 z-50 h-full w-72 bg-white p-6 shadow-2xl transition-transform duration-300 md:hidden ${
          isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-label="Menu mobile"
      >
        <div className="mb-8 flex items-center justify-between">
          <FourscomLogo />
          <button
            type="button"
            aria-label="Fermer le menu"
            className="rounded-md p-2 text-[#1A1A2E]"
            onClick={() => setIsDrawerOpen(false)}
          >
            ✕
          </button>
        </div>
        <nav className="flex flex-col gap-4">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsDrawerOpen(false)}
                className={`border-l-2 px-3 py-2 text-base font-medium transition-colors ${
                  isActive
                    ? 'border-[#C0392B] bg-[#C0392B]/5 text-[#C0392B]'
                    : 'border-transparent text-[#1A1A2E]/85 hover:text-[#1A1A2E]'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 pb-12 pt-24 sm:px-6 lg:px-8">{children}</main>

      <footer className="mt-12 bg-[#1A1A2E] text-white">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
          <div>
            <FourscomLogo dark />
            <p className="mt-4 max-w-xs text-sm text-white/80">
              Plateforme officielle de communication de l&apos;Église Foursquare.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-white/70">Liens rapides</h2>
            <ul className="mt-4 space-y-2 text-sm text-white/85">
              {navLinks.map((link) => (
                <li key={`footer-${link.href}`}>
                  <Link href={link.href} className="transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-white/70">Contact</h2>
            <p className="mt-4 text-sm text-white/80">
              Restons connectés pour suivre les annonces, événements et activités de la communauté.
            </p>
          </div>
        </div>
        <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-white/70 sm:px-6 lg:px-8">
          © 2026 Église Foursquare — Tous droits réservés
        </div>
      </footer>
    </div>
  );
}
