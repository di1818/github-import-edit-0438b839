import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { X } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import GridScan from "./GridScan";

const stats = [
  { value: "20", label: "мест офлайн · Казань" },
  { value: "40", label: "мест онлайн · любая точка" },
];

// Вставьте сюда ссылку на embed-видео (VK, Rutube, YouTube)
// VK пример: "https://vk.com/video_ext.php?oid=-12345&id=456789"
// Rutube пример: "https://rutube.ru/play/embed/VIDEO_ID"
const VIDEO_EMBED_URL = "";

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMini, setIsMini] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const videoY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const videoRotate = useTransform(scrollYProgress, [0, 1], [2, -4]);
  const videoScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  // Track when video section scrolls out of view → switch to mini player
  const handleScroll = useCallback(() => {
    if (!isPlaying || !videoContainerRef.current) return;
    const rect = videoContainerRef.current.getBoundingClientRect();
    const outOfView = rect.bottom < 100;
    setIsMini(outOfView);
  }, [isPlaying]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handlePlay = () => {
    if (!VIDEO_EMBED_URL) return;
    setIsPlaying(true);
  };

  const handleCloseMini = () => {
    setIsPlaying(false);
    setIsMini(false);
  };

  const videoIframe = (
    <iframe
      src={VIDEO_EMBED_URL}
      className="w-full h-full"
      allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
      allowFullScreen
      style={{ border: 0 }}
    />
  );

  return (
    <>
      <section ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img src={heroBg} alt="" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background/80 to-transparent" />
        </div>

        <div className="container relative z-10 py-20 md:py-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 mb-8"
              >
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm font-medium text-accent-foreground">
                  Казань · Офлайн 20 мест + Онлайн
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-3 font-display"
              >
                <span className="text-gradient">HR Инструментарий</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="text-xl md:text-2xl font-semibold text-foreground mb-6"
              >
                Сильный HR отдел, который управляет системой — а не тушит пожары
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed"
              >
                8 недель практики и внедрения: найм, адаптация, метрики,
                роль HR в бизнесе — чтобы HR мог влиять на результат
                и говорить с руководством на языке бизнеса.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <a
                  href="#application"
                  className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-0.5"
                >
                  Записаться на консультацию
                </a>
                <a
                  href="#program"
                  className="inline-flex items-center justify-center rounded-lg border border-border px-8 py-4 text-lg font-medium text-foreground hover:bg-secondary transition-colors duration-300"
                >
                  Подробнее о программе
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="mt-12 flex items-center gap-8 text-sm text-muted-foreground"
              >
                {stats.map((s, i) => (
                  <div key={s.label} className="flex items-center gap-2">
                    {i > 0 && <div className="h-4 w-px bg-border mr-6" />}
                    <span className="font-semibold text-foreground text-2xl">{s.value}</span> {s.label}
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Video */}
            <motion.div
              ref={videoContainerRef}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={{ y: videoY, rotate: videoRotate, scale: videoScale }}
              className="hidden lg:block"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-primary/10 border border-border bg-card">
                <div className="aspect-video relative">
                  {isPlaying && !isMini ? (
                    videoIframe
                  ) : (
                    <button
                      onClick={handlePlay}
                      className="absolute inset-0 flex flex-col items-center justify-center bg-muted cursor-pointer group"
                    >
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                        <svg className="w-8 h-8 text-primary ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                      <p className="text-muted-foreground text-sm font-medium">Видео о программе</p>
                      <p className="text-muted-foreground/60 text-xs mt-1">HR Инструментарий</p>
                      {!VIDEO_EMBED_URL && (
                        <p className="text-destructive/60 text-xs mt-3">Ссылка на видео не указана</p>
                      )}
                    </button>
                  )}
                </div>
                <div className="absolute -top-3 -right-3 w-24 h-24 rounded-full bg-primary/5 -z-10" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 rounded-full bg-accent -z-10" />
              </div>
            </motion.div>

            {/* Mobile video */}
            <div className="lg:hidden">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-border bg-card">
                <div className="aspect-video relative">
                  {isPlaying && !isMini ? (
                    videoIframe
                  ) : (
                    <button
                      onClick={handlePlay}
                      className="absolute inset-0 flex flex-col items-center justify-center bg-muted cursor-pointer group"
                    >
                      <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                        <svg className="w-7 h-7 text-primary ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                      <p className="text-muted-foreground text-sm font-medium">Видео о программе</p>
                      {!VIDEO_EMBED_URL && (
                        <p className="text-destructive/60 text-xs mt-2">Ссылка на видео не указана</p>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mini player — fixed in corner when scrolled away */}
      <AnimatePresence>
        {isPlaying && isMini && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-4 right-4 z-50 w-[320px] sm:w-[400px] rounded-xl overflow-hidden shadow-2xl border border-border bg-card"
          >
            <div className="aspect-video relative">
              {videoIframe}
            </div>
            <button
              onClick={handleCloseMini}
              className="absolute top-2 right-2 h-8 w-8 rounded-full bg-foreground/80 text-background flex items-center justify-center hover:bg-foreground transition-colors"
              aria-label="Закрыть видео"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HeroSection;
