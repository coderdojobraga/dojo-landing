'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavItemSetting } from '@/lib/settings';

interface NavbarClientProps {
  items: NavItemSetting[];
}

export default function NavbarClient({ items }: NavbarClientProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isOpen]);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-b from-white via-white/67 to-transparent">
        <nav className="py-6 backdrop-blur-lg">
          <div className="w-full px-8 sm:px-14 lg:px-20 xl:px-24 flex h-fit items-center justify-between">
            {/* Left aligned: Logo + Navigation Links */}
            <div className="flex items-center gap-8 md:gap-10">
              <div className="shrink-0 flex items-center">
                <Link href="/" className="flex items-center select-none">
                  <Image
                    src="/img/logo.svg"
                    alt="CoderDojo Braga"
                    width={52}
                    height={52}
                    priority
                    className="h-11 w-11 sm:h-12 sm:w-12 cursor-pointer object-contain transition-opacity hover:opacity-80"
                  />
                </Link>
              </div>

              <div className="hidden sm:flex items-center">
                <div className="flex items-center gap-6 md:gap-8">
                  {items.map((item) => {
                    const isExternal = item.path.startsWith("http");
                    const isActive = !isExternal && pathname === item.path;
                    return (
                      <Link
                        key={item.path}
                        href={item.path}
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noopener noreferrer" : undefined}
                        className={`text-base font-medium transition-colors duration-200 ease-in whitespace-nowrap ${
                          isActive
                            ? 'text-primary border-b-2 border-primary/30 font-semibold'
                            : 'text-gray-900 hover:text-primary'
                        }`}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Mobile menu trigger */}
            <div className="block sm:hidden">
              <button
                id="open-nav-button"
                type="button"
                onClick={() => setIsOpen(true)}
                className="cursor-pointer p-1.5 text-gray-900 transition-colors hover:text-primary"
                aria-label="Navegação"
              >
                <svg
                  className="h-7 w-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Modal with Smooth Fade Transition */}
      <div
        id="menu-modal"
        aria-hidden={!isOpen}
        className={`fixed inset-0 z-50 bg-white/98 px-4 py-4 text-gray-900 backdrop-blur-md transition-all duration-300 ease-in-out sm:px-8 ${
          isOpen
            ? 'visible opacity-100 pointer-events-auto'
            : 'invisible opacity-0 pointer-events-none'
        }`}
      >
        <div
          className={`flex h-full w-full flex-col space-y-4 transition-transform duration-300 ease-out ${
            isOpen ? 'translate-y-0 scale-100' : '-translate-y-1 scale-98'
          }`}
          role="dialog"
          aria-modal={isOpen}
        >
          <header className="text-right">
            <button
              id="close-nav-button"
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded p-2 text-gray-900 transition-colors hover:bg-gray-100"
              aria-label="Fechar navegação"
            >
              <svg
                className="h-6 w-6 sm:h-8 sm:w-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </header>

          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="flex justify-center py-4"
          >
            <Image
              src="/img/logo.svg"
              alt="CoderDojo Braga"
              width={70}
              height={70}
              className="h-16 w-16"
            />
          </Link>

          <nav className="mt-4">
            <ul className="flex flex-col space-y-2">
              {items.map((item) => {
                const isExternal = item.path.startsWith("http");
                return (
                  <li key={item.path}>
                    <Link
                      href={item.path}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                      onClick={() => setIsOpen(false)}
                      className="block py-3 text-center text-lg font-medium text-gray-900 transition-colors hover:text-primary sm:py-4 sm:text-xl"
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
