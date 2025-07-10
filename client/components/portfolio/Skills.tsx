import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiSvelte,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiPython,
  SiCplusplus,
  SiC,
  SiGit,
  SiGithub,
  SiDocker,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { TbBrandFramerMotion } from "react-icons/tb";

const skillsData = [
  // Frontend Skills
  {
    name: "JavaScript",
    level: 80,
    category: "Frontend",
    color: "#F7DF1E",
    icon: SiJavascript,
  },
  {
    name: "React.js",
    level: 75,
    category: "Frontend",
    color: "#61DAFB",
    icon: SiReact,
  },
  {
    name: "Next.js",
    level: 65,
    category: "Frontend",
    color: "#6B7280",
    icon: SiNextdotjs,
  },
  {
    name: "TailwindCSS",
    level: 70,
    category: "Frontend",
    color: "#06B6D4",
    icon: SiTailwindcss,
  },
  {
    name: "TypeScript",
    level: 45,
    category: "Frontend",
    color: "#3178C6",
    icon: SiTypescript,
  },
  {
    name: "Svelte",
    level: 40,
    category: "Frontend",
    color: "#FF3E00",
    icon: SiSvelte,
  },
  {
    name: "Framer Motion",
    level: 60,
    category: "Frontend",
    color: "#FF0055",
    icon: TbBrandFramerMotion,
  },

  // Backend Skills
  {
    name: "Node.js",
    level: 70,
    category: "Backend",
    color: "#339933",
    icon: SiNodedotjs,
  },
  {
    name: "Express.js",
    level: 65,
    category: "Backend",
    color: "#68CC00",
    icon: SiExpress,
  },
  {
    name: "MongoDB",
    level: 60,
    category: "Backend",
    color: "#47A248",
    icon: SiMongodb,
  },
  {
    name: "MySQL",
    level: 55,
    category: "Backend",
    color: "#4479A1",
    icon: SiMysql,
  },
  {
    name: "Python",
    level: 65,
    category: "Backend",
    color: "#3776AB",
    icon: SiPython,
  },
  {
    name: "Docker",
    level: 50,
    category: "Backend",
    color: "#2496ED",
    icon: SiDocker,
  },

  // Programming Languages
  {
    name: "Java",
    level: 60,
    category: "Languages",
    color: "#ED8B00",
    icon: FaJava,
  },
  {
    name: "C++",
    level: 70,
    category: "Languages",
    color: "#00599C",
    icon: SiCplusplus,
  },
  { name: "C", level: 65, category: "Languages", color: "#A8B9CC", icon: SiC },

  // Tools & Version Control
  { name: "Git", level: 75, category: "Tools", color: "#F05032", icon: SiGit },
  {
    name: "GitHub",
    level: 70,
    category: "Tools",
    color: "#181717",
    icon: SiGithub,
  },
];

const categories = ["All", "Frontend", "Backend", "Languages", "Tools"];

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const filteredSkills =
    activeCategory === "All"
      ? skillsData
      : skillsData.filter((skill) => skill.category === activeCategory);

  const getSkillProficiency = (level: number) => {
    if (level >= 75) return "Proficient";
    if (level >= 60) return "Intermediate";
    if (level >= 45) return "Learning";
    return "Beginner";
  };

  return (
    <section
      id="skills"
      className="min-h-screen flex items-center justify-center py-20 relative overflow-hidden"
      ref={ref}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-7xl mx-auto px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-purple-600 bg-clip-text text-transparent leading-[1.3] pt-[0.15em]">
            Learning Journey
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            My current technical skills and ongoing learning path as I build
            experience in modern web development technologies and programming
            fundamentals.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-16"
        >
          <div className="flex bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl p-2 shadow-lg">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-8 py-3 rounded-xl font-medium transition-all duration-300 relative ${
                  activeCategory === category
                    ? "text-white shadow-lg"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {activeCategory === category && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 rounded-xl"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{category}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{
                duration: 0.5,
                delay: index * 0.05,
                layout: { duration: 0.3 },
              }}
              className="group relative"
              onHoverStart={() => setHoveredSkill(skill.name)}
              onHoverEnd={() => setHoveredSkill(null)}
            >
              <motion.div
                className="relative bg-card/80 backdrop-blur-sm border border-border/40 rounded-2xl p-6
                           hover:border-primary/30 transition-all duration-300 overflow-hidden
                           hover:shadow-2xl hover:shadow-primary/10"
                whileHover={{ y: -8 }}
              >
                {/* Skill Icon & Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <motion.div
                      className="w-12 h-12 rounded-xl flex items-center justify-center relative overflow-hidden"
                      style={{
                        background: `linear-gradient(135deg, ${skill.color}15, ${skill.color}25)`,
                        border: `1px solid ${skill.color}30`,
                      }}
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <skill.icon
                        className="w-6 h-6"
                        style={{ color: skill.color }}
                      />
                      {hoveredSkill === skill.name && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </motion.div>
                    <div>
                      <h3 className="font-semibold text-foreground text-lg">
                        {skill.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {getSkillProficiency(skill.level)}
                      </p>
                    </div>
                  </div>
                  <motion.div
                    className="text-right"
                    whileHover={{ scale: 1.1 }}
                  >
                    <div
                      className="text-2xl font-bold"
                      style={{ color: skill.color }}
                    >
                      {skill.level}%
                    </div>
                  </motion.div>
                </div>

                {/* Skill Details */}
                <div className="space-y-3">
                  {/* Progress Ring */}
                  <div className="relative w-full h-2 bg-muted/50 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        background: `linear-gradient(90deg, ${skill.color}, ${skill.color}80)`,
                      }}
                      initial={{ width: "0%" }}
                      animate={
                        isInView
                          ? { width: `${skill.level}%` }
                          : { width: "0%" }
                      }
                      transition={{
                        duration: 1.5,
                        delay: index * 0.05 + 0.5,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }}
                    />
                    {hoveredSkill === skill.name && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                        initial={{ x: "-100%" }}
                        animate={{ x: "100%" }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                    )}
                  </div>
                </div>

                {/* Hover Effect Overlay */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at center, ${skill.color}08, transparent 70%)`,
                  }}
                  transition={{ duration: 0.3 }}
                />

                {/* Corner Accent */}
                <div
                  className="absolute top-0 right-0 w-16 h-16 opacity-10 group-hover:opacity-20 transition-opacity"
                  style={{
                    background: `linear-gradient(135deg, ${skill.color}, transparent)`,
                  }}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20 grid md:grid-cols-4 gap-6"
        >
          {[
            { label: "Learning Journey", value: "1+ Year", icon: "📚" },
            { label: "Technologies Learning", value: "15+", icon: "🚀" },
            { label: "Projects Built", value: "7", icon: "🎯" },
            { label: "Lines of Code", value: "10K+", icon: "💻" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 1 + index * 0.1 }}
              className="text-center p-6 bg-card/60 backdrop-blur-sm border border-border/40 rounded-2xl
                         hover:border-primary/30 transition-all duration-300 group hover:shadow-lg"
            >
              <motion.div
                className="text-3xl mb-2"
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ duration: 0.3 }}
              >
                {stat.icon}
              </motion.div>
              <motion.div
                className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent mb-2"
                whileHover={{ scale: 1.1 }}
              >
                {stat.value}
              </motion.div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
