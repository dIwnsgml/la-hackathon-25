"use client";

import { motion } from "framer-motion";
import { ArrowRightIcon } from "lucide-react";
import { FlipWords } from "@/components/ui/flip-words";
import { Button } from "@/components/ui/button";
import { fadeIn } from "@/animations/variants";
import { IconApple, IconGoogle } from "@/components/others/Svgs";

const words = ["Focus", "Learning", "Productivity"];

export default function AboutSection() {
  return (
    <section className="section-container">
      <motion.div {...fadeIn({ once: true })}>
        <h2 className="heading-sm">About App</h2>

        <h1 className="heading-lg">
          #1 App for Empowering Your <FlipWords words={words} />
        </h1>

        <div className="absolute -top-20" id="about" />

        <p className="leading-relaxed">
          EASE is the #1 app that helps you regain control of your mental
          well-being and boost your emotional health. With intuitive features
          like journaling, mood tracking, and AI-driven support, EASE is your
          personal companion in your journey to healing and balance.
          <br />
          <br />
          Experience the power of reflective journaling with helpful prompts and
          a supportive AI that offers personalized feedback. Track your mood
          over time with our visual mood tracker and see how your emotional
          landscape evolves.
          <br />
          <br />
          {`Engage with our AI Listener, who’s always there to lend a listening ear, or relax with our ambient "Stare Mode" to calm your mind. EASE’s tools are designed to help you reflect, grow, and enhance your well-being, all in one place.`}
          <br />
          <br />
          Join a community of users who are committed to bettering their mental
          health and fostering a positive mindset. Whether you’re looking for a
          space to reflect, relax, or seek guidance, EASE is here to support you
          every step of the way.
          <br />
          <br />
          Start today and unlock a healthier, happier version of yourself with
          EASE.
        </p>

        <div className="flex flex-wrap gap-3 mt-6">
          <Button
            effect="expandIcon"
            icon={ArrowRightIcon}
            iconPlacement="right"
            onClick={() =>
              window.open("https://apps.apple.com/us/app/flozable/id6739476657")
            }
          >
            <div className="download-button-inner">
              <IconApple className="icon-spacing" />
              <p>Download on the App Store</p>
            </div>
          </Button>

          <Button
            effect="expandIcon"
            icon={ArrowRightIcon}
            variant="outline"
            iconPlacement="right"
            onClick={() => {
              window.open("https://play.google.com/store/apps");
            }}
          >
            <div className="download-button-inner">
              <IconGoogle className="icon-spacing" />
              <p>Download on the Google Play</p>
            </div>
          </Button>
        </div>
      </motion.div>

      <motion.div {...fadeIn({ direction: "right", once: true })}></motion.div>
    </section>
  );
}
