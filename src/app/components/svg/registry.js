import HeroSectionGrid from "./HeroSectionGrid";

export const animatedSvgRegistry = [
  {
    id: "hero-section-grid",
    name: "Hero Section Grid",
    component: HeroSectionGrid,
    bestFor: ["hero", "landing", "intro"],
    description:
      "Dotted structural guide lines that animate in once and then remain static.",
    file: "src/app/components/svg/HeroSectionGrid.jsx",
  },
];

export function getAnimatedSvgById(id) {
  return animatedSvgRegistry.find((item) => item.id === id);
}
