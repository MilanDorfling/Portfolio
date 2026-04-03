"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { useSound } from "../../lib/useSound";
import { FileUpload } from "../UI/File-download";
import { FaGithub, FaLinkedin, FaInstagram, FaTiktok } from "react-icons/fa";
import { FiCheck } from "react-icons/fi";
import { SiGmail } from "react-icons/si";
import { Tooltip } from "../UI/tooltip-card";


const CONTACT_INFO = {
	email: "milandorfling80@gmail.com",
	linkedin: "https://www.linkedin.com/in/milan-dorfling-93a02a265/",
	github: "https://github.com/MilanDorfling",
	instagram: "https://www.instagram.com/milandorfling/",
	tiktok: "https://www.tiktok.com/@milan.dorfling3",
	cvPath: "/assets/cv/CV.pdf",
};

const SOCIAL_LINKS = [
	{
		label: "Email",
		href: `mailto:${CONTACT_INFO.email}`,
		icon: SiGmail,
		borderClass: "border-red-500",
	},
	{
		label: "LinkedIn",
		href: CONTACT_INFO.linkedin,
		icon: FaLinkedin,
		borderClass: "border-sky-500",
	},
	{
		label: "GitHub",
		href: CONTACT_INFO.github,
		icon: FaGithub,
		borderClass: "border-white",
	},
	{
		label: "Instagram",
		href: CONTACT_INFO.instagram,
		icon: FaInstagram,
		borderClass: "border-pink-400",
	},
	{
		label: "TikTok",
		href: CONTACT_INFO.tiktok,
		icon: FaTiktok,
		borderClass: "border-violet-500",
	},
];

const socialMainVariant = {
	initial: {
		x: 0,
		y: 0,
	},
	animate: {
		x: 10,
		y: -10,
		opacity: 0.9,
	},
};

const socialSecondaryVariant = {
	initial: {
		opacity: 0,
	},
	animate: {
		opacity: 1,
	},
};

export function GridPattern({ columns = 41, rows = 11, className = "" } = {}) {
  return (
    <div
			className={`flex shrink-0 scale-105 flex-wrap items-center justify-center gap-x-px gap-y-px bg-gray-200/80 dark:bg-neutral-800/80 ${className}`}>
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: columns }).map((_, col) => {
          const index = row * columns + col;
          return (
            <div
              key={`${col}-${row}`}
              className={`flex h-10 w-10 shrink-0 rounded-xs ${
                index % 2 === 0
									? "bg-gray-100 dark:bg-neutral-900"
									: "bg-gray-100 shadow-[0px_0px_1px_2px_rgba(255,255,255,0.95)_inset] dark:bg-neutral-900 dark:shadow-[0px_0px_1px_2px_rgba(0,0,0,0.95)_inset]"
              }`} />
          );
        }))}
    </div>
  );
}

export default function Contact() {
	const [emailCopied, setEmailCopied] = useState(false);
	const copyResetTimerRef = useRef(null);

  const playPopSound = useSound("/sounds/pop.mp3", { volume: 0.5, cooldownMs: 120 });
  const playHoverSound = useSound("/sounds/hover.mp3", { volume: 0.1, cooldownMs: 120 });

	useEffect(() => {
		return () => {
			if (copyResetTimerRef.current) {
				window.clearTimeout(copyResetTimerRef.current);
			}
		};
	}, []);

	const handleCopyEmail = async e => {
		e.preventDefault();

		try {
			await navigator.clipboard.writeText(CONTACT_INFO.email);
			setEmailCopied(true);

			if (copyResetTimerRef.current) {
				window.clearTimeout(copyResetTimerRef.current);
			}

			copyResetTimerRef.current = window.setTimeout(() => {
				setEmailCopied(false);
			}, 1800);
		} catch (error) {
			console.error("Failed to copy email", error);
		}
	};

	return (
		<section
			id="contact"
			className="relative overflow-hidden w-screen left-1/2 -translate-x-1/2 min-h-screen flex flex-col justify-center"
		>
			<div
				aria-hidden
				className="pointer-events-none absolute inset-0 opacity-55 mask-[radial-gradient(ellipse_at_center,white,transparent_80%)]"
			>
				<GridPattern columns={70} rows={28} className="h-full w-full scale-125" />
			</div>

			<div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-0 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-2 items-center">
				<div className="flex w-full justify-center md:justify-center mb-5">
					<FileUpload 
            fileUrl={CONTACT_INFO.cvPath} 
            fileName="Milan-Dorfling-CV.pdf" 
            onMouseEnter={playHoverSound}
						onFocus={playHoverSound} />
				</div>

				<div className="w-full max-w-xl">
					<div className="mb-8">
						<h2 className="text-3xl md:text-4xl font-bold text-accent">Contact Me</h2>
						<p className="mt-3 text-foreground/80 text-base md:text-lg leading-relaxed">
							I am always open to new opportunities and collaborations. 
              Whether you have a question, want to discuss a project, or just want to say hello, feel free to reach out using the contact information below. 
              I look forward to connecting with you!
						</p>
						<div className="mt-6 flex flex-wrap items-center gap-4 text-2xl text-foreground/75">
							{SOCIAL_LINKS.map(({ label, href, icon: Icon, hoverTextClass, borderClass }) => (
								<Tooltip
									key={label}
									content={label === "Email" ? (emailCopied ? "Copied" : CONTACT_INFO.email) : label}
								>
									<a
										href={href}
										target={label !== "Email" && href.startsWith("http") ? "_blank" : undefined}
										rel={label !== "Email" && href.startsWith("http") ? "noopener noreferrer" : undefined}
										aria-label={label}
										onClick={label === "Email" ? handleCopyEmail : undefined}
                    onMouseEnter={playPopSound}
										onFocus={playPopSound}
										className="group/social relative block cursor-pointer"
									>
										<motion.div
											whileHover="animate"
											className="relative"
										>
											<motion.div
												variants={socialMainVariant}
												transition={{
													type: "spring",
													stiffness: 300,
													damping: 20,
												}}
												className={`relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-white text-foreground/75 shadow-[0px_10px_50px_rgba(0,0,0,0.1)] transition-colors dark:bg-neutral-900 ${hoverTextClass || ""}`}
											>
												{label === "Email" && emailCopied ? <FiCheck className="text-green-500" /> : <Icon />}
											</motion.div>
											<motion.div
												variants={socialSecondaryVariant}
												className={`absolute inset-0 z-0 rounded-full border border-dashed opacity-0 ${label === "Email" && emailCopied ? "border-green-500" : borderClass}`}
											/>
										</motion.div>
									</a>
								</Tooltip>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
