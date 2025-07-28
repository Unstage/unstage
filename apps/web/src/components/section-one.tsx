"use client";

import { Button } from "@unstage/ui/components/button";
import { Icons } from "@unstage/ui/components/icons";
import { motion } from "motion/react";
import Link from "next/link";

export function SectionOne() {
  return (
    <section
      id="hero"
      className="flex flex-col items-center min-h-[calc(100vh-60px)] md:pt-24 pt-16"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-xs md:text-sm font-display flex items-center gap-2 font-light">
          Introducing Unstage Beta Access <span className="text-muted-foreground">|</span>
          <Link
            href="/"
            className="text-blue-400 hover:text-blue-300 font-semibold flex items-center transition-colors duration-300 gap-1"
          >
            Join the waitlist <Icons.ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl md:text-5xl font-bold mt-8 md:mt-16 font-display leading-tight text-center tracking-tight">
          The Tech Interview is Broken,
          <br />
          <span className="text-blue-400 font-display text-6xl md:text-8xl">Unstage it.</span>
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <p className="text-muted-foreground/70 text-center mt-6 max-w-lg text-sm md:text-base">
          Unstage is a platform that helps you hire Software Engineers based on the skills they
          actually use.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Button className="mt-8">
          Book a demo
          <Icons.ArrowUpRight className="w-4 h-4" />
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 75 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.25 }}
        className="my-12 w-full flex justify-center"
      >
        <div className="w-full md:w-[75%] h-[500px] bg-muted-foreground/10 rounded-lg" />
      </motion.div>
    </section>
  );
}
