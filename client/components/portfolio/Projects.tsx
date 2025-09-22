import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "LoremIpsum",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse lacinia felis pulvinar vulputate pharetra.",
    image: "/placeholder.svg",
    tech: ["React", "Node.js", "PostgreSQL", "TailwindCSS", "Chart.js"],
    githubUrl: "#",
    liveUrl: "#",
    category: "Sustainability",
    year: "2024",
    status: "🏆 Hackathon Winner",
    gradient: "from-emerald-400 via-cyan-400 to-blue-500",
  },
  {
    id: 2,
    title: "Lorem Ipsum",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse lacinia felis pulvinar vulputate pharetra.",
    image: "/placeholder.svg",
    tech: ["Next.js", "TypeScript", "Socket.io", "Prisma", "PostgreSQL"],
    githubUrl: "#",
    liveUrl: "#",
    category: "Social Platform",
    year: "2024",
    status: "🚀 Live Production",
    gradient: "from-purple-400 via-pink-400 to-red-400",
  },
  {
    id: 3,
    title: "Lorem Ipsum",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse lacinia felis pulvinar vulputate pharetra.",
    image: "/placeholder.svg",
    tech: ["SvelteKit", "tRPC", "Prisma", "PostgreSQL", "Docker"],
    githubUrl: "#",
    liveUrl: "#",
    category: "Health & Fitness",
    year: "2024",
    status: "⚡ Active Development",
    gradient: "from-orange-400 via-red-400 to-pink-400",
  },
  {
    id: 4,
    title: "Lorem Ipsum",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse lacinia felis pulvinar vulputate pharetra.",
    image: "/placeholder.svg",
    tech: ["Svelte", "MongoDB", "TailwindCSS", "WebRTC", "PWA"],
    githubUrl: "#",
    liveUrl: "#",
    category: "Education Tech",
    year: "2024",
    status: "🥇 First Prize",
    gradient: "from-blue-400 via-purple-400 to-indigo-400",
  },
  {
    id: 5,
    title: "Portfolio Website",
    description:
      "A modern, responsive portfolio website showcasing projects with smooth animations, dark mode, and interactive elements.",
    image: "/placeholder.svg",
    tech: ["React", "Framer Motion", "TailwindCSS", "TypeScript", "Vite"],
    githubUrl: "https://github.com/Chirag8405/Portfolio",
    liveUrl: "https://chiragpoornamath.netlify.app",
    category: "Portfolio",
    year: "2024",
    status: "✨ Featured",
    gradient: "from-teal-400 via-blue-400 to-purple-400",
  },
];

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentProject, setCurrentProject] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextProject = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentProject((prev) => (prev + 1) % projects.length);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  const prevProject = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  const goToProject = (index: number) => {
    if (isTransitioning || index === currentProject) return;
    setIsTransitioning(true);
    setCurrentProject(index);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  // Auto scroll functionality
  useEffect(() => {
    if (!isAutoScrolling || isPaused) return;

    const interval = setInterval(() => {
      setCurrentProject((prev) => (prev + 1) % projects.length);
    }, 4000); // Change project every 4 seconds

    return () => clearInterval(interval);
  }, [isAutoScrolling, isPaused]);

  // Pause auto scroll when user interacts
  const handleUserInteraction = () => {
    setIsAutoScrolling(false);
    // Resume auto scroll after 10 seconds of no interaction
    setTimeout(() => {
      setIsAutoScrolling(true);
    }, 10000);
  };

  const getVisibleProjects = () => {
    const prev = (currentProject - 1 + projects.length) % projects.length;
    const next = (currentProject + 1) % projects.length;
    return { prev, current: currentProject, next };
  };

  const { prev, current, next } = getVisibleProjects();

  return (
    <section
      id="projects"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background"
      ref={ref}
    >
      {/* Section Title */}
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="absolute top-16 sm:top-32 text-xl sm:text-2xl font-medium tracking-[10px] sm:tracking-[20px] uppercase text-muted-foreground z-10"
      >
        Projects
      </motion.h3>

      {/* Projects Carousel Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={
          isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
        }
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-center"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="flex items-center justify-center gap-4 sm:gap-8 w-full">
          {/* Desktop: Previous Project (Dimmed) */}
          <motion.div
            className="hidden lg:block cursor-pointer"
            animate={{
              scale: 0.7,
              opacity: 0.4,
            }}
            whileHover={{ scale: 0.75, opacity: 0.6 }}
            onClick={() => {
              prevProject();
              handleUserInteraction();
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              duration: 0.6,
            }}
          >
            <div className="w-80 bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg overflow-hidden transition-all duration-300">
              <div className="h-64 bg-gradient-to-br from-muted/50 to-muted/30 flex items-center justify-center">
                <motion.img
                  key={`prev-${prev}`}
                  src={projects[prev].image}
                  alt={projects[prev].title}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    e.currentTarget.parentElement!.innerHTML =
                      '<div class="text-6xl text-muted-foreground">📱</div>';
                  }}
                />
              </div>
              <div className="p-6">
                <motion.h4
                  key={`prev-title-${prev}`}
                  className="text-lg font-semibold mb-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  {projects[prev].title}
                </motion.h4>
                <motion.p
                  key={`prev-desc-${prev}`}
                  className="text-sm text-muted-foreground line-clamp-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  {projects[prev].description}
                </motion.p>
              </div>
            </div>
          </motion.div>

          {/* Mobile: Previous Button */}
          <motion.button
            className="lg:hidden flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-card/80 backdrop-blur-sm border border-border/50 rounded-full text-muted-foreground hover:text-primary hover:bg-card transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              prevProject();
              handleUserInteraction();
            }}
            disabled={isTransitioning}
          >
            <ChevronLeft className="h-6 w-6 sm:h-7 sm:w-7" />
          </motion.button>

          {/* Current Project (Center & Active) */}
          <motion.div
            className="relative z-10 flex-1 lg:flex-none"
            animate={{
              scale: 1,
              opacity: 1,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              duration: 0.6,
            }}
          >
            <motion.div
              className="w-full lg:w-[32rem] relative group"
              key={`current-${current}`}
              initial={{ y: 20, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                duration: 0.6,
              }}
            >
              {/* 3D Card Container */}
              <div className="relative perspective-1000">
                <motion.div
                  className="relative bg-card/90 backdrop-blur-md border border-border/30 rounded-xl lg:rounded-2xl shadow-2xl overflow-hidden"
                  whileHover={{
                    rotateY: 5,
                    rotateX: 5,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  {/* Project Image with Advanced Overlay */}
                  <div className="relative h-48 sm:h-64 lg:h-80 overflow-hidden">
                    {/* Gradient Background */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${projects[current].gradient} opacity-80`}
                    />

                    {/* Project Image */}
                    <motion.img
                      key={`current-img-${current}`}
                      src={projects[current].image}
                      alt={projects[current].title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6 }}
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />

                    {/* Fallback Icon */}
                    <div className="absolute inset-0 flex items-center justify-center text-6xl sm:text-8xl opacity-50">
                      🚀
                    </div>

                    {/* Floating Elements */}
                    <div className="absolute inset-0 pointer-events-none">
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-2 h-2 bg-white/30 rounded-full"
                          style={{
                            left: `${20 + i * 15}%`,
                            top: `${10 + i * 12}%`,
                          }}
                          animate={{
                            y: [0, -20, 0],
                            opacity: [0.3, 0.8, 0.3],
                          }}
                          transition={{
                            duration: 3 + i * 0.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />
                      ))}
                    </div>

                    {/* Status Badge */}
                    <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                      <motion.div
                        className="bg-black/50 backdrop-blur-sm rounded-full px-2 py-1 sm:px-3 sm:py-1 text-xs font-medium text-white"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        {projects[current].status}
                      </motion.div>
                    </div>

                    {/* Category & Year */}
                    <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                      <motion.div
                        className="bg-black/50 backdrop-blur-sm rounded-full px-2 py-1 sm:px-3 sm:py-1 text-xs font-medium text-white"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <span className="hidden sm:inline">
                          {projects[current].category} • {projects[current].year}
                        </span>
                        <span className="sm:hidden">
                          {projects[current].year}
                        </span>
                      </motion.div>
                    </div>

                    {/* Interactive Overlay */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.3 }}
                    />
                  </div>

                  {/* Project Details */}
                  <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
                    {/* Title & Description */}
                    <div>
                      <motion.h4
                        key={`current-title-${current}`}
                        className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                      >
                        {projects[current].title}
                      </motion.h4>

                      <motion.p
                        key={`current-desc-${current}`}
                        className="text-sm sm:text-base text-muted-foreground leading-relaxed"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                      >
                        {projects[current].description}
                      </motion.p>
                    </div>

                    {/* Tech Stack */}
                    <motion.div
                      className="space-y-2 sm:space-y-3"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 }}
                    >
                      <p className="text-xs sm:text-sm font-medium text-muted-foreground">
                        Tech Stack
                      </p>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {projects[current].tech.map((tech, index) => (
                          <motion.span
                            key={`${current}-tech-${index}`}
                            className="px-2 py-1 sm:px-3 sm:py-1.5 bg-gradient-to-r from-primary/10 to-purple-600/10 border border-primary/20 rounded-full text-xs font-medium text-primary"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                              duration: 0.2,
                              delay: 0.5 + index * 0.05,
                            }}
                            whileHover={{ scale: 1.05, y: -2 }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>

                    {/* Action Buttons */}
                    <motion.div
                      className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.5 }}
                    >
                      <motion.a
                        href={projects[current].githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3 bg-muted hover:bg-muted/80 rounded-lg sm:rounded-xl text-sm font-medium transition-all duration-300"
                        whileHover={{ scale: 1.02, y: -1 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Github className="h-4 w-4" />
                        <span className="hidden sm:inline">Source Code</span>
                        <span className="sm:hidden">Code</span>
                      </motion.a>
                      <motion.a
                        href={projects[current].liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-primary-foreground rounded-lg sm:rounded-xl text-sm font-medium transition-all duration-300"
                        whileHover={{ scale: 1.02, y: -1 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <ExternalLink className="h-4 w-4" />
                        <span className="hidden sm:inline">Live Demo</span>
                        <span className="sm:hidden">Demo</span>
                      </motion.a>
                    </motion.div>
                  </div>
                </motion.div>

                {/* 3D Shadow */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-xl lg:rounded-2xl blur-xl opacity-50 -z-10 transform translate-y-2 sm:translate-y-4" />
              </div>
            </motion.div>
          </motion.div>

          {/* Desktop: Next Project (Dimmed) */}
          <motion.div
            className="hidden lg:block cursor-pointer"
            animate={{
              scale: 0.7,
              opacity: 0.4,
            }}
            whileHover={{ scale: 0.75, opacity: 0.6 }}
            onClick={() => {
              nextProject();
              handleUserInteraction();
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              duration: 0.6,
            }}
          >
            <div className="w-80 bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg overflow-hidden transition-all duration-300">
              <div className="h-64 bg-gradient-to-br from-muted/50 to-muted/30 flex items-center justify-center">
                <motion.img
                  key={`next-${next}`}
                  src={projects[next].image}
                  alt={projects[next].title}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    e.currentTarget.parentElement!.innerHTML =
                      '<div class="text-6xl text-muted-foreground">📱</div>';
                  }}
                />
              </div>
              <div className="p-6">
                <motion.h4
                  key={`next-title-${next}`}
                  className="text-lg font-semibold mb-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  {projects[next].title}
                </motion.h4>
                <motion.p
                  key={`next-desc-${next}`}
                  className="text-sm text-muted-foreground line-clamp-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  {projects[next].description}
                </motion.p>
              </div>
            </div>
          </motion.div>

          {/* Mobile: Next Button */}
          <motion.button
            className="lg:hidden flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-card/80 backdrop-blur-sm border border-border/50 rounded-full text-muted-foreground hover:text-primary hover:bg-card transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              nextProject();
              handleUserInteraction();
            }}
            disabled={isTransitioning}
          >
            <ChevronRight className="h-6 w-6 sm:h-7 sm:w-7" />
          </motion.button>
        </div>
      </motion.div>

      {/* Project Indicators */}
      <div className="absolute bottom-16 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              goToProject(index);
              handleUserInteraction();
            }}
            disabled={isTransitioning}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentProject
                ? "bg-primary w-6 sm:w-8"
                : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
            } ${isTransitioning ? "opacity-50 cursor-not-allowed" : ""}`}
          />
        ))}
      </div>

      {/* Auto scroll indicator */}
      <div className="absolute bottom-8 sm:bottom-3 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex items-center gap-2 text-xs text-muted-foreground/60">
          <div
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              isAutoScrolling && !isPaused
                ? "bg-primary animate-pulse"
                : "bg-muted-foreground/30"
            }`}
          />
          <span className="hidden sm:inline">
            {isAutoScrolling && !isPaused ? "Auto scrolling" : "Paused"}
          </span>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-64 sm:h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 sm:w-64 sm:h-64 bg-purple-500/5 rounded-full blur-3xl" />
      </div>
    </section>
  );
}
