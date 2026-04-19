"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { FaCheck, FaGithub, FaLinkedin } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { HiOutlineBars3, HiOutlineXMark } from "react-icons/hi2";
import { Tooltip } from "@/app/UI/tooltip-card";

const PAGE_LINKS = [
  { href: "/showcase", label: "Showcase" },
  { href: "/docs", label: "Docs" },
];

const SOCIAL_LINKS = [
  {
    href: "https://github.com/MilanDorfling",
    label: "GitHub",
    icon: FaGithub,
    iconClassName: "text-zinc-300",
    hoverIconClassName: "group-hover/social:text-white",
    ringClassName: "border-zinc-400",
  },
  {
    href: "https://www.linkedin.com/in/milan-dorfling-93a02a265/",
    label: "LinkedIn",
    icon: FaLinkedin,
    iconClassName: "text-zinc-300",
    hoverIconClassName: "group-hover/social:text-sky-400",
    ringClassName: "border-sky-400/80",
  },
  {
    href: "mailto:milandorfling80@gmail.com",
    label: "milandorfling80@gmail.com",
    copyValue: "milandorfling80@gmail.com",
    icon: SiGmail,
    iconClassName: "text-zinc-300",
    hoverIconClassName: "group-hover/social:text-rose-400",
    ringClassName: "border-rose-400/80",
  },
];

const mainVariant = {
  initial: {
    x: 0,
    y: 0,
  },
  animate: {
    x: 8,
    y: -8,
    opacity: 0.95,
  },
};

const secondaryVariant = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};

export default function Nav() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const touchHandledRef = useRef(false);
  const copyResetTimerRef = useRef(null);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((open) => !open);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    return () => {
      if (copyResetTimerRef.current) {
        window.clearTimeout(copyResetTimerRef.current);
      }
    };
  }, []);

  const handleSocialClick = async (event, item) => {
    if (!item.copyValue) return;

    event.preventDefault();

    try {
      await navigator.clipboard.writeText(item.copyValue);
      setCopiedEmail(true);

      if (copyResetTimerRef.current) {
        window.clearTimeout(copyResetTimerRef.current);
      }

      copyResetTimerRef.current = window.setTimeout(() => {
        setCopiedEmail(false);
      }, 1500);
    } catch {
      setCopiedEmail(false);
    }
  };

  const handleMobileSocialClick = async (event, item) => {
    if (item.copyValue) {
      await handleSocialClick(event, item);
    }

    closeMobileMenu();
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-[#050506]/90 text-zinc-100 backdrop-blur-md">
      <nav className="relative mx-auto flex h-18 w-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 pr-8">
          <span
            aria-hidden
            className="h-0 w-0 border-x-transparent border-b-zinc-100"
            style={{ borderLeftWidth: 10, borderRightWidth: 10, borderBottomWidth: 18 }}
          />
          <span className="text-zinc-600">/</span>
          <Link
            href="/"
            className="text-base font-extralight tracking-tight text-zinc-100 transition-colors hover:text-white sm:text-lg"
            style={{ fontFamily: "var(--font-roboto), sans-serif" }}
          >
            Milan Dorfling
          </Link>
        </div>

        <ul className="hidden items-center gap-2 text-sm md:flex">
          {PAGE_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`rounded-md px-3 py-1.5 transition-colors ${
                    active
                      ? "bg-white/10 text-zinc-50"
                      : "text-zinc-400 hover:text-zinc-100"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          className="absolute right-4 top-1/2 z-50 flex h-10 w-10 -translate-y-1/2 touch-manipulation items-center justify-center rounded-full border border-white/10 bg-[#0f1012] text-zinc-100 transition-colors hover:border-white/20 md:hidden"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-nav-menu"
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => {
            if (touchHandledRef.current) {
              touchHandledRef.current = false;
              return;
            }

            toggleMobileMenu();
          }}
          onTouchEnd={(event) => {
            event.preventDefault();
            touchHandledRef.current = true;
            toggleMobileMenu();
          }}
        >
          {mobileMenuOpen ? <HiOutlineXMark className="h-5 w-5" /> : <HiOutlineBars3 className="h-5 w-5" />}
        </button>

        <ul className="absolute right-4 top-1/2 hidden -translate-y-1/2 items-center gap-6 md:flex md:right-6 lg:right-8">
          {SOCIAL_LINKS.map((item) => {
            const Icon = copiedEmail && item.copyValue ? FaCheck : item.icon;
            const isExternal = item.href.startsWith("http");
            const tooltipContent = copiedEmail && item.copyValue ? "Copied!" : item.label;

            return (
              <li key={item.label}>
                <Tooltip content={tooltipContent}>
                  <motion.a
                    href={item.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    aria-label={copiedEmail && item.copyValue ? "Email copied" : item.label}
                    initial="initial"
                    whileHover="animate"
                    onClick={(event) => handleSocialClick(event, item)}
                    className="group/social relative block h-10 w-10"
                  >
                    <motion.span
                      variants={mainVariant}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className={`absolute inset-0 z-10 flex items-center justify-center rounded-full bg-[#0f1012] transition-colors ${
                        copiedEmail && item.copyValue
                          ? "text-emerald-400"
                          : `${item.iconClassName} ${item.hoverIconClassName}`
                      }`}
                    >
                      <Icon className="h-6 w-6" />
                    </motion.span>
                    <motion.span
                      variants={secondaryVariant}
                      className={`absolute inset-0 z-0 rounded-full border border-dashed opacity-0 ${
                        copiedEmail && item.copyValue ? "border-emerald-400" : item.ringClassName
                      }`}
                    />
                  </motion.a>
                </Tooltip>
              </li>
            );
          })}
        </ul>
      </nav>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-black/45 transition-opacity duration-300 md:hidden ${
          mobileMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden="true"
        onClick={closeMobileMenu}
      />

      <aside
        id="mobile-nav-menu"
        className={`fixed inset-y-0 right-0 z-50 flex w-[min(85vw,22rem)] flex-col border-l border-white/10 bg-[#050506]/95 px-5 pb-6 pt-24 shadow-[-24px_0_80px_rgba(0,0,0,0.45)] backdrop-blur-md transition-transform duration-300 ease-out md:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        <ul className="space-y-2">
          {PAGE_LINKS.map((link) => {
            const active = pathname === link.href;

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={closeMobileMenu}
                  className={`block rounded-xl px-4 py-3 text-base transition-colors ${
                    active
                      ? "bg-white/10 text-zinc-50"
                      : "text-zinc-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-auto border-t border-white/10 pt-5">
          <p className="mb-3 text-xs uppercase tracking-[0.22em] text-zinc-500">
            Connect
          </p>
          <ul className="flex items-center gap-3">
            {SOCIAL_LINKS.map((item) => {
              const Icon = copiedEmail && item.copyValue ? FaCheck : item.icon;
              const isExternal = item.href.startsWith("http");

              return (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    onClick={(event) => handleMobileSocialClick(event, item)}
                    aria-label={copiedEmail && item.copyValue ? "Email copied" : item.label}
                    className={`flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#0f1012] transition-colors hover:border-white/20 ${
                      copiedEmail && item.copyValue ? "text-emerald-400" : "text-zinc-300 hover:text-white"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>
    </>
  );
}