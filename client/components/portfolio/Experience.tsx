import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Award } from "lucide-react";

const timelineData = [
  {
    date: "Dec 2024",
    type: "project",
    title: "Portfolio Website",
    description:
      "Redesigned and rebuilt my portfolio website with modern UI/UX, animations, and improved performance using React and Framer Motion.",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    technologies: [
      { name: "React", icon: "⚛️" },
      { name: "TypeScript", icon: "📘" },
      { name: "Framer Motion", icon: "🌊" },
      { name: "TailwindCSS", icon: "🎨" },
      { name: "Vite", icon: "⚡" },
    ],
    link: "#",
    award: undefined,
  },


  {
    date: "2023",
    type: "education",
    title: "Started IT Engineering",
    description:
      "Began pursuing Bachelor of Technology in Information Technology at Vivekanand Education Society's Institute of Technology, focusing on software development and emerging technologies.",
    logo: "🎓",
    award: undefined,
  },
  
  {
    date: "2020",
    type: "milestone",
    title: "Programming Journey Begins",
    description:
      "Started learning programming in 10th grade with Javascript, HTML, and CSS. This marked the beginning of my passion for software development.",
    technologies: [
      { name: "Java", icon: "☕" },
      { name: "HTML", icon: "🌐" },
      { name: "CSS", icon: "🎨" },
    ],
    award: undefined,
  },
];

export function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="experience"
      className="min-h-screen py-20 bg-background relative"
      ref={ref}
    >
      {/* Page Title */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-[48px] font-bold leading-[48px] mb-4 tracking-tight">
          My tech timeline
        </h2>
        <div className="w-24 h-px bg-border mx-auto" />
      </motion.div>

      <div className="container max-w-4xl mx-auto px-8">
        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-20 top-0 bottom-0 w-px bg-border" />

          {/* Timeline Entries */}
          <div className="space-y-40">
            {timelineData.map((entry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
                }
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative flex items-start gap-20"
              >
                {/* Sticky Date */}
                <div className="sticky top-40 w-40 flex-shrink-0">
                  <div className="text-right">
                    <h3 className="text-[48px] font-bold leading-[48px] text-foreground">
                      {entry.date}
                    </h3>
                  </div>

                  {/* Timeline Dot */}
                  <div className="absolute -right-10 top-6 w-10 h-10 bg-muted rounded-full border-4 border-background flex items-center justify-center">
                    <div className="w-4 h-4 bg-muted-foreground rounded-full" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pb-20">
                  {entry.title && (
                    <h4 className="text-lg font-semibold mb-2 flex items-center gap-2">
                      {entry.title}
                      {entry.award && (
                        <span className="text-xs bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 px-2 py-1 rounded-full flex items-center gap-1">
                          <Award className="w-3 h-3" />
                          {entry.award.replace("🥇 ", "").replace("🏆 ", "")}
                        </span>
                      )}
                    </h4>
                  )}

                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    {entry.description}
                  </p>

                  {/* Images Grid */}
                  {entry.images && (
                    <div className="grid grid-cols-3 gap-1 mb-6">
                      {entry.images.map((image, imgIndex) => (
                        <div
                          key={imgIndex}
                          className="aspect-square bg-muted rounded-md overflow-hidden group cursor-pointer"
                        >
                          <img
                            src={image}
                            alt={`${entry.title} screenshot ${imgIndex + 1}`}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                              e.currentTarget.parentElement!.innerHTML =
                                '<div class="w-full h-full bg-gradient-to-br from-primary/20 to-purple-600/20 flex items-center justify-center text-2xl">📱</div>';
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Logo for Education/Company */}
                  {entry.logo && (
                    <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center text-2xl mb-6">
                      {entry.logo}
                    </div>
                  )}

                  {/* Technologies */}
                  {entry.technologies && (
                    <div className="flex items-center gap-3 mb-4">
                      {entry.technologies.map((tech, techIndex) => (
                        <div
                          key={techIndex}
                          className="flex items-center gap-1 text-xs font-medium"
                          title={tech.name}
                        >
                          <span className="text-base">{tech.icon}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Project Link */}
                  {entry.link && (
                    <a
                      href={entry.link}
                      className="inline-flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors"
                    >
                      View project details
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
