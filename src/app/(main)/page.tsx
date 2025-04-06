"use client";

import AboutSection from "@/components/sections/main/AboutSection";
import FeaturesSection from "@/components/sections/main/FeaturesSection";
import ReviewSection from "@/components/sections/main/ReviewSection";
import { HeroParallax } from "@/components/ui/hero-parallax";

const products = [
  {
    title: "Dashboard",
    link: "/dashboard",
    thumbnail: "/img/demo/dashboard.png",
  },
  {
    title: "Journal",
    link: "/dashboard/journals/new",
    thumbnail: "/img/demo/journal.png",
  },
  {
    title: "Prompt",
    link: "/journals",
    thumbnail: "/img/demo/prompt.png",
  },
  {
    title: "Mood Trend",
    link: "/dashboard",
    thumbnail: "/img/demo/mood_trend.png",
  },
  {
    title: "Daily Dose of Positivity",
    link: "/dashboard",
    thumbnail: "/img/demo/quote.png",
  },
  {
    title: "Journals",
    link: "/journals",
    thumbnail: "/img/demo/journals.png",
  },
  {
    title: "Mood Trend",
    link: "/dashboard",
    thumbnail: "/img/demo/mood_trend.png",
  },
  {
    title: "Dashboard",
    link: "/dashboard",
    thumbnail: "/img/demo/dashboard.png",
  },
  {
    title: "Journals",
    link: "/journals",
    thumbnail: "/img/demo/journals.png",
  },
];

export default function Home() {
  return (
    <main>
      <HeroParallax products={products} />
      <AboutSection />
      <FeaturesSection />
      {/* <ReviewSection /> */}
    </main>
  );
}
