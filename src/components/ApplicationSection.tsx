import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const steps = [
  { step: "1", text: "Заявка" },
  { step: "2", text: "Консультация" },
  { step: "3", text: "Старт обучения" },
];

const ApplicationSection = () => (
  <section id="application" className="section-padding">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto text-center"
      >
        <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">
          Записаться на <span className="text-gradient">консультацию</span>
        </h2>
        <p className="text-muted-foreground text-lg mb-10">
          Оставьте заявку, напишите в Telegram или позвоните — мы ответим на все вопросы
        </p>

        <div className="bg-card border border-border rounded-2xl p-8 md:p-10 text-left">
          <div className="space-y-5">
            <div>
              <label className="text-sm font-medium mb-2 block">Имя</label>
              <input
                type="text"
                placeholder="Как вас зовут?"
                className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring transition-shadow"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Телефон или Telegram</label>
              <input
                type="text"
                placeholder="+7 (___) ___-__-__ или @username"
                className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring transition-shadow"
              />
            </div>
            <button className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-0.5">
              Отправить заявку
              <ArrowRight className="h-5 w-5" />
            </button>
            <p className="text-xs text-muted-foreground text-center">
              Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground">
          <a href="tel:+79871837315" className="flex items-center gap-2 hover:text-foreground transition-colors">
            <span>📞</span> +7 (987) 183-73-15 — Екатерина
          </a>
          <span className="hidden sm:inline text-border">|</span>
          <a href="https://t.me/" className="flex items-center gap-2 hover:text-foreground transition-colors">
            <span>💬</span> Написать в Telegram
          </a>
        </div>

        <div className="mt-12 grid grid-cols-3 gap-4 text-center">
          {steps.map((item) => (
            <div key={item.step} className="flex flex-col items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                {item.step}
              </div>
              <span className="text-sm text-muted-foreground">{item.text}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

export default ApplicationSection;
