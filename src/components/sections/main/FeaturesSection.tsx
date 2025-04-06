import { motion } from "framer-motion";
import { ReactNode } from "react";
import {
  Bot,
  ChartArea,
  ChartNoAxesColumn,
  Eye,
  Hourglass,
  MessageCircle,
  MessageSquare,
  PenTool,
  Trophy,
  Users,
} from "lucide-react";
import { fadeIn } from "@/animations/variants";

interface BoxProps {
  title: string;
  description: string;
  children: ReactNode;
}

function Box({ title, description, children }: BoxProps) {
  return (
    <div className="bg-accent p-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-2">
      <div className="w-16 h-16 rounded-full bg-accent-foreground flex justify-center items-center text-accent text-xl">
        {children}
      </div>
      <h3 className="font-semibold text-[1.1rem] mt-4 mb-2">{title}</h3>
      <p className="text-sm">{description}</p>
    </div>
  );
}

//hella minor performance opt
const featuresFadeIn = fadeIn({ once: true });
export default function FeaturesSection() {
  return (
    <section className="section-container">
      <motion.div {...featuresFadeIn}>
        <div className="text-center">
          <h2 className="heading-sm">App Features</h2>
          <h1 className="heading-lg">
            Empower Your Well-Being with EASE’s Powerful Features
          </h1>
        </div>
        <div className="absolute -top-20" id="feature" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
          <Box
            title="Journaling with Prompts"
            description="Reflect on your thoughts and emotions with private, guided journaling sessions designed to reduce stress and promote clarity."
          >
            <PenTool />
          </Box>

          <Box
            title="Mood Tracker"
            description="Track your daily moods and visualize emotional trends over time, helping you better understand your emotional health."
          >
            <ChartArea />
          </Box>

          <Box
            title="AI Listener"
            description="Chat with our AI, which acts as a supportive listener, providing personalized feedback and empathy."
          >
            <Bot />
          </Box>

          <Box
            title="AI Feedback on Journal"
            description="Receive positive and supportive comments from the AI on your journal entries, boosting your mood and fostering a sense of validation."
          >
            <MessageCircle />
          </Box>

          <Box
            title="Focus & Relax Mode"
            description="Activate 'Stare Mode' to engage in calming ambient visuals designed to reduce stress and promote mental clarity."
          >
            <Eye />
          </Box>

          <Box
            title="Mental Health Community"
            description="Join a supportive community of like-minded individuals who are focused on improving mental health and well-being."
          >
            <Users />
          </Box>
        </div>
      </motion.div>
    </section>
  );
}
