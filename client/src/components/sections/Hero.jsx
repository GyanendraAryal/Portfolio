import { motion } from "framer-motion";
import { smoothReveal } from "../../animations/motionVariants";

export default function Hero() {
  return (
    <section className="h-screen flex items-center">
      <motion.h1
        variants={smoothReveal}
        initial="hidden"
        animate="show"
        className="text-5xl"
      >
        Premium Portfolio
      </motion.h1>
    </section>
  );
}