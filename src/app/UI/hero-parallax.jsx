"use client";

import React, { useEffect } from "react";
import { motion, useMotionTemplate, useScroll, useSpring, useTransform } from "motion/react";
import { cn } from "../../lib/utils";

function ProductCard({ product, translate, isActivated }) {
  return (
    <motion.div
      style={{ x: translate }}
      whileHover={isActivated ? { y: -20 } : undefined}
      className="group/product relative h-96 w-[30rem] shrink-0"
    >
      <a
        href={product.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full w-full overflow-hidden rounded-2xl border border-white/10 group-hover/product:shadow-2xl"
      >
        <img
          src={product.thumbnail}
          alt={product.title}
          className="absolute inset-0 h-full w-full object-cover object-left-top"
        />
      </a>
      <div className="pointer-events-none absolute inset-0 h-full w-full rounded-2xl bg-black opacity-0 transition-opacity duration-300 group-hover/product:opacity-80" />
      <div className="absolute bottom-4 left-4 opacity-0 transition-opacity duration-300 group-hover/product:opacity-100">
        <h3 className="text-white text-lg font-medium">{product.title}</h3>
      </div>
    </motion.div>
  );
}

export function HeroParallax({ products, className, isActivated = true, showHeader = true }) {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);

  const { scrollYProgress } = useScroll();

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };
  const activation = useSpring(0, { stiffness: 120, damping: 20, bounce: 0 });

  useEffect(() => {
    activation.set(isActivated ? 1 : 0);
  }, [isActivated, activation]);

  const translateX = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1000]), springConfig);
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.2], [15, 0]), springConfig);
  const scrollOpacity = useSpring(useTransform(scrollYProgress, [0, 0.2], [0.2, 1]), springConfig);
  const rotateZ = useSpring(useTransform(scrollYProgress, [0, 0.2], [20, 0]), springConfig);
  const rotateY = useSpring(useTransform(scrollYProgress, [0, 0.2], [-14, 0]), springConfig);
  const translateY = useSpring(useTransform(scrollYProgress, [0, 0.2], [-700, 500]), springConfig);

  const firstRowTranslate = useTransform([activation, translateX], ([a, x]) => a * x);
  const secondRowTranslate = useTransform([activation, translateXReverse], ([a, x]) => a * x);
  const thirdRowTranslate = useTransform([activation, translateX], ([a, x]) => a * x);

  const blendedRotateX = useTransform([activation, rotateX], ([a, x]) => (1 - a) * 15 + a * x);
  const blendedRotateY = useTransform([activation, rotateY], ([a, y]) => (1 - a) * -14 + a * y);
  const blendedRotateZ = useTransform([activation, rotateZ], ([a, z]) => (1 - a) * 20 + a * z);
  const blendedTranslateY = useTransform([activation, translateY], ([a, y]) => (1 - a) * -700 + a * y);
  const blendedOpacity = useTransform([activation, scrollOpacity], ([a, o]) => (1 - a) * 0.2 + a * o);
  const blurPx = useTransform(activation, [0, 1], [8, 0]);
  const saturation = useTransform(activation, [0, 1], [0.7, 1]);
  const layerFilter = useMotionTemplate`blur(${blurPx}px) saturate(${saturation})`;

  return (
    <section
      className={cn(
        "relative flex h-[300vh] w-full flex-col overflow-hidden py-40 antialiased perspective-[1000px] transform-3d",
        className
      )}
    >
      {showHeader && (
        <div className="mx-auto mb-10 w-full max-w-4xl px-4 md:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">Featured Projects</h2>
          <p className="mt-3 max-w-2xl text-sm text-zinc-300 md:text-base">
            Scroll to explore selected work in a parallax gallery.
          </p>
        </div>
      )}

      <motion.div
        initial={false}
        style={{
          pointerEvents: isActivated ? "auto" : "none",
          filter: layerFilter,
        }}
      >
        <motion.div
          style={{
            rotateX: blendedRotateX,
            rotateY: blendedRotateY,
            rotateZ: blendedRotateZ,
            translateY: blendedTranslateY,
            opacity: blendedOpacity,
            transformOrigin: "50% 10%",
          }}
        >
          <motion.div className="mb-20 flex flex-row-reverse space-x-20 space-x-reverse">
            {firstRow.map((product) => (
              <ProductCard
                product={product}
                translate={firstRowTranslate}
                isActivated={isActivated}
                key={product.title}
              />
            ))}
          </motion.div>
          <motion.div className="mb-20 flex flex-row space-x-20">
            {secondRow.map((product) => (
              <ProductCard
                product={product}
                translate={secondRowTranslate}
                isActivated={isActivated}
                key={product.title}
              />
            ))}
          </motion.div>
          <motion.div className="flex flex-row-reverse space-x-20 space-x-reverse">
            {thirdRow.map((product) => (
              <ProductCard
                product={product}
                translate={thirdRowTranslate}
                isActivated={isActivated}
                key={product.title}
              />
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
