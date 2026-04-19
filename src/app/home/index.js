import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import ContactSection from "./ContactSection";

export const homeSections = [
  {
    id: "hero",
    label: "Home",
    Component: HeroSection,
  },
  {
    id: "about",
    label: "About",
    Component: AboutSection,
  },
  {
    id: "contact",
    label: "Contact",
    Component: ContactSection,
  },
];

export const homeSectionNavItems = homeSections.map(({ id, label }) => ({
  id,
  label,
}));
