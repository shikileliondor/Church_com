'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, useMemo, useState } from 'react';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const callbackUrl = useMemo(() => {
    const value = searchParams.get('callbackUrl');
    return value && value.startsWith('/') ? value : '/admin/dashboard';
  }, [searchParams]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl,
      });

      if (result?.error) {
        setErrorMessage('Identifiants incorrects');
        return;
      }

      router.push('/admin/dashboard');
      router.refresh();
    } catch {
      setErrorMessage('Identifiants incorrects');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FAFAFA] px-4 py-6 sm:px-6">
      <div className="mx-auto w-full max-w-5xl">
        <Link
          href="/"
          className="inline-flex items-center text-sm font-medium text-[#1A1A2E] transition hover:text-[#C0392B]"
        >
          ← Retour au site
        </Link>

        <section className="mx-auto mt-8 w-full max-w-[400px] rounded-2xl bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.08)] sm:mt-12 sm:p-8">
          <header className="mb-6 text-center">
            <div className="mx-auto mb-4 grid w-fit grid-cols-2 gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#C0392B] text-xl text-white" aria-hidden>
                ✝️
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#2980B9] text-xl text-white" aria-hidden>
                🏆
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F1C40F] text-xl" aria-hidden>
                🕊️
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#8E44AD] text-xl text-white" aria-hidden>
                👑
              </div>
            </div>

            <h1 className="font-[var(--font-playfair)] text-4xl font-bold text-[#C0392B]">Fourscom</h1>
            <p className="mt-2 text-sm text-[#6B7280]">Espace Administration</p>
          </header>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-medium text-[#1F2937]">
                Email
              </label>
              <div className="flex items-center gap-2 rounded-xl border border-[#D1D5DB] bg-white px-3 py-2.5 focus-within:border-[#C0392B] focus-within:ring-2 focus-within:ring-[#C0392B]/20">
                <span className="text-base" aria-hidden>
                  ✉️
                </span>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full border-0 bg-transparent text-sm outline-none placeholder:text-[#9CA3AF]"
                  placeholder="admin@fourscom.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="mb-1 block text-sm font-medium text-[#1F2937]">
                Mot de passe
              </label>
              <div className="flex items-center gap-2 rounded-xl border border-[#D1D5DB] bg-white px-3 py-2.5 focus-within:border-[#C0392B] focus-within:ring-2 focus-within:ring-[#C0392B]/20">
                <span className="text-base" aria-hidden>
                  🔒
                </span>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full border-0 bg-transparent text-sm outline-none placeholder:text-[#9CA3AF]"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  className="text-xs font-semibold text-[#6B7280] transition hover:text-[#C0392B]"
                >
                  {showPassword ? 'Masquer' : 'Afficher'}
                </button>
              </div>
            </div>

            {errorMessage ? (
              <p
                role="alert"
                className="rounded-xl border border-[#F5C2C7] bg-[#FDECEC] px-3 py-2 text-sm font-medium text-[#B91C1C]"
              >
                {errorMessage}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex w-full items-center justify-center rounded-xl bg-[#C0392B] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#A93226] disabled:cursor-not-allowed disabled:opacity-80"
            >
              {isLoading ? 'Connexion en cours…' : 'Se connecter'}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
