"use client";
import React from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useSound } from "../../lib/useSound";



export const HeroParallax = ({
  products,
  containerClassName = ""
}) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1000]), springConfig);
  const translateXReverse = useSpring(useTransform(scrollYProgress, [0, 1], [0, -1000]), springConfig);
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.2], [15, 0]), springConfig);
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.2], [0.2, 1]), springConfig);
  const rotateZ = useSpring(useTransform(scrollYProgress, [0, 0.2], [20, 0]), springConfig);
  const translateY = useSpring(useTransform(scrollYProgress, [0, 0.2], [-800, 600]), springConfig);
  return (
    <div
      ref={ref}
      className={`h-[300vh] pt-130 overflow-hidden antialiased relative flex flex-col self-auto perspective-[1000px] transform-3d ${containerClassName}`.trim()}>
      <div aria-hidden className="h-56 md:h-80 w-full shrink-0" />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className="mx-auto w-full max-w-450">
        <motion.div className="mb-20 flex flex-row-reverse justify-center space-x-20 space-x-reverse">
          {firstRow.map((product) => (
            <ProductCard product={product} translate={translateX} key={product.title} />
          ))}
        </motion.div>
        <motion.div className="mb-20 flex flex-row justify-center space-x-20">
          {secondRow.map((product) => (
            <ProductCard product={product} translate={translateXReverse} key={product.title} />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse justify-center space-x-20 space-x-reverse">
          {thirdRow.map((product) => (
            <ProductCard product={product} translate={translateX} key={product.title} />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const ProductCard = ({
  product,
  translate
}) => {
  const playCardHover = useSound("/sounds/hover.mp3", { volume: 0.1, cooldownMs: 120 });
  const hasLink = Boolean(product.link);

  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      onHoverStart={playCardHover}
      key={product.title}
      className="group/product h-96 w-120 relative shrink-0">
      {hasLink ? (
        <a
          href={product.link}
          target={product.target || "_blank"}
          rel="noopener noreferrer"
          className="block group-hover/product:shadow-2xl"
        >
          <Image
            src={product.thumbnail}
            fill
            sizes="(max-width: 768px) 80vw, 40vw"
            className="object-cover object-center absolute h-full w-full inset-0"
            alt={product.title} />
        </a>
      ) : (
        <div className="block group-hover/product:shadow-2xl">
          <Image
            src={product.thumbnail}
            fill
            sizes="(max-width: 768px) 80vw, 40vw"
            className="object-cover object-center absolute h-full w-full inset-0"
            alt={product.title} />
        </div>
      )}
      <div
        className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none"></div>
      <h2
        className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white">
        {product.title}
      </h2>
    </motion.div>
  );
};
