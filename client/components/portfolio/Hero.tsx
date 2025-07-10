import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useEffect, useCallback, useState } from "react";
import { ChevronDown, Sparkles } from "lucide-react";

const FloatingElement = ({ delay, duration, children, className }: any) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 100, rotate: 0 }}
    animate={{
      opacity: [0, 1, 1, 0.7],
      y: [100, -20, -40, -60],
      rotate: [0, 180, 360],
      scale: [0.8, 1.2, 1, 0.9],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    }}
  >
    {children}
  </motion.div>
);

const TypewriterText = ({ text, delay = 0, speed = 100, onComplete }: any) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (isComplete) return;

    const timeout = setTimeout(() => {
      let index = 0;
      const interval = setInterval(() => {
        if (index < text.length) {
          setDisplayedText(text.slice(0, index + 1));
          index++;
        } else {
          setIsComplete(true);
          clearInterval(interval);
          if (onComplete) onComplete();
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, delay, speed, onComplete, isComplete]);

  return <span>{displayedText}</span>;
};

const CyclingTypewriter = ({ words, staticText, delay = 0 }: any) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [staticTyped, setStaticTyped] = useState(false);
  const [staticDisplayed, setStaticDisplayed] = useState("");

  useEffect(() => {
    if (!hasStarted) {
      const timeout = setTimeout(() => {
        setHasStarted(true);
      }, delay);
      return () => clearTimeout(timeout);
    }

    if (!hasStarted) return;

    // Type the static text first
    if (!staticTyped) {
      const timeout = setTimeout(() => {
        if (staticDisplayed.length < staticText.length) {
          setStaticDisplayed(staticText.slice(0, staticDisplayed.length + 1));
        } else {
          setStaticTyped(true);
        }
      }, 100);
      return () => clearTimeout(timeout);
    }

    // Then handle the cycling words
    const currentWord = words[currentWordIndex];
    const speed = isDeleting ? 50 : 150;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayedText.length < currentWord.length) {
          setDisplayedText(currentWord.slice(0, displayedText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayedText.length > 0) {
          setDisplayedText(displayedText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentWordIndex, words, hasStarted, delay, staticTyped, staticDisplayed, staticText]);

  return (
    <span>
      {staticDisplayed}
      <span className="text-primary font-semibold">
        {displayedText}
        <motion.span
          className="inline-block w-0.5 h-8 bg-primary ml-1"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </span>
    </span>
  );
};

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const [showSecondLine, setShowSecondLine] = useState(false);
  const [showDescription, setShowDescription] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / 20;
        const y = (e.clientY - rect.top - rect.height / 2) / 20;
        mouseX.set(x);
        mouseY.set(y);
        mousePositionRef.current = { x: e.clientX, y: e.clientY };
      }
    },
    [mouseX, mouseY],
  );

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={ref}
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 25% 25%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 75% 25%, rgba(255, 111, 97, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 25% 75%, rgba(132, 204, 22, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 75% 75%, rgba(236, 72, 153, 0.3) 0%, transparent 50%),
          linear-gradient(135deg, hsl(var(--background)) 0%, hsl(var(--background)) 100%)
        `,
      }}
    >
      {/* Interactive floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <FloatingElement
          delay={0}
          duration={8}
          className="absolute top-20 left-20"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-violet-500/20 to-purple-600/20 backdrop-blur-sm rounded-3xl rotate-45 border border-violet-500/30" />
        </FloatingElement>

        <FloatingElement
          delay={1}
          duration={10}
          className="absolute top-40 right-32"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-emerald-500/20 to-teal-600/20 backdrop-blur-sm rounded-full border border-emerald-500/30" />
        </FloatingElement>

        <FloatingElement
          delay={2}
          duration={12}
          className="absolute bottom-40 left-40"
        >
          <div
            className="w-20 h-20 bg-gradient-to-br from-rose-500/20 to-pink-600/20 backdrop-blur-sm border border-rose-500/30"
            style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
          />
        </FloatingElement>

        <FloatingElement
          delay={0.5}
          duration={9}
          className="absolute top-60 left-1/2"
        >
          <div className="w-12 h-12 bg-gradient-to-br from-amber-500/20 to-orange-600/20 backdrop-blur-sm rounded-xl rotate-12 border border-amber-500/30" />
        </FloatingElement>

        <FloatingElement
          delay={1.5}
          duration={11}
          className="absolute bottom-20 right-20"
        >
          <div className="w-32 h-8 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 backdrop-blur-sm rounded-full border border-cyan-500/30" />
        </FloatingElement>
      </div>

      {/* Main content with magnetic effect */}
      <motion.div
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8"
        style={{
          x: springX,
          y: springY,
        }}
      >
        {/* Animated text reveal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="mb-8"
        >
          <motion.div
            className="mb-6 flex items-center justify-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Sparkles className="w-6 h-6 text-primary" />
            <span 
              className="text-muted-foreground font-semibold"
              style={{ fontSize: "clamp(1.25rem, 4vw, 1.75rem)" }}
            >
              <TypewriterText
                text="Hey, I am"
                delay={800}
                speed={100}
                onComplete={() => setShowSecondLine(true)}
              />
            </span>
            <Sparkles className="w-6 h-6 text-primary" />
          </motion.div>

          {/* Name typing animation */}
          <div className="relative mb-8">
            <motion.h1
              className="font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 bg-clip-text text-transparent leading-tight"
              style={{
                fontSize: "clamp(2rem, 6vw, 4rem)",
                lineHeight: "1.1",
                minHeight: "clamp(2.5rem, 8vw, 5rem)",
              }}
              initial={{ opacity: 0, scale: 0.5, rotateX: -90 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              transition={{
                duration: 1.2,
                delay: 0.5,
                type: "spring",
                stiffness: 100,
              }}
            >
              {showSecondLine && (
                <div className="flex flex-col items-center gap-1">
                  <TypewriterText
                    text="CHIRAG"
                    delay={200}
                    speed={100}
                    onComplete={() => {}}
                  />
                  <TypewriterText
                    text="POORNAMATH"
                    delay={800}
                    speed={80}
                    onComplete={() => setShowDescription(true)}
                  />
                </div>
              )}
            </motion.h1>

            <motion.div
              className="absolute inset-0 font-bold leading-tight"
              style={{
                fontSize: "clamp(2rem, 6vw, 4rem)",
                lineHeight: "1.1",
                background: `linear-gradient(
                  45deg,
                  transparent 30%,
                  rgba(255, 255, 255, 0.1) 50%,
                  transparent 70%
                )`,
                backgroundSize: "200% 200%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {showSecondLine && (
                <div className="flex flex-col items-center gap-1">
                  <span>CHIRAG</span>
                  <span>POORNAMATH</span>
                </div>
              )}
            </motion.div>
          </div>

          {/* Description with cycling typewriter */}
          <motion.div
            className="max-w-3xl mx-auto px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <p
              className="text-muted-foreground leading-relaxed font-semibold"
              style={{
                fontSize: "clamp(1.25rem, 4vw, 1.75rem)",
                minHeight: "clamp(3rem, 6vw, 4rem)",
              }}
            >
              {showDescription && (
                <CyclingTypewriter
                  staticText="I am a "
                  words={["web designer.", "software developer.", "student.", "tech enthusiast."]}
                  delay={500}
                />
              )}
            </p>
          </motion.div>
        </motion.div>

        {/* Interactive CTA buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-16 px-4"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <motion.button
            onClick={() => scrollToSection("#projects")}
            className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-semibold overflow-hidden w-full sm:w-auto max-w-xs"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-pink-600 to-cyan-500"
              initial={{ x: "100%" }}
              whileHover={{ x: "0%" }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative z-10 text-sm sm:text-base">Explore My Work</span>
            <motion.div
              className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-30"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.button>

          <motion.button
            onClick={() => scrollToSection("#contact")}
            className="group relative px-6 sm:px-8 py-3 sm:py-4 border-2 border-primary/50 rounded-full text-foreground font-semibold hover:bg-primary/10 transition-all duration-300 w-full sm:w-auto max-w-xs"
            whileHover={{ scale: 1.05, borderColor: "rgba(124, 58, 237, 1)" }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-sm sm:text-base">Let's Connect</span>
            <motion.div
              className="absolute inset-0 rounded-full"
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1, opacity: 0.1 }}
              style={{
                background:
                  "radial-gradient(circle, rgba(124, 58, 237, 1) 0%, transparent 70%)",
              }}
            />
          </motion.button>
        </motion.div>

        {/* Scroll indicator with physics */}
        <motion.div
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 translate-y-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <motion.button
            onClick={() => scrollToSection("#skills")}
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-sm font-medium">Scroll to explore</span>
            <motion.div
              className="w-6 h-10 border-2 border-current rounded-full flex justify-center"
              whileHover={{ scale: 1.1 }}
            >
              <motion.div
                className="w-1 h-3 bg-current rounded-full mt-2"
                animate={{ y: [0, 12, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}