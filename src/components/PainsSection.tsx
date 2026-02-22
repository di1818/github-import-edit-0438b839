import { motion } from "framer-motion";
import { AlertTriangle, BarChart3, Users, Shuffle, MessageSquareOff, TrendingDown } from "lucide-react";

const pains = [
  { icon: Shuffle, title: "Нанимаете не тех", desc: "Кандидаты не соответствуют ожиданиям — приходится увольнять и искать заново." },
  { icon: TrendingDown, title: "Текучка в первые месяцы", desc: "Новые сотрудники уходят в первые 1–3 месяца — вы теряете деньги и время." },
  { icon: BarChart3, title: "Сотрудники не дают результат", desc: "Люди работают, но не выполняют показатели — бизнес буксует." },
  { icon: Users, title: "Нет понимания ролей", desc: "Сотрудники не понимают свою зону ответственности и чего от них ждут." },
  { icon: MessageSquareOff, title: "HR не решает проблемы", desc: "HR-менеджер работает формально — нет системы, нет влияния на бизнес." },
  { icon: AlertTriangle, title: "Потери растут", desc: "Каждый неудачный найм обходится компании в сотни тысяч рублей." },
];

const PainsSection = () => (
  <section className="section-padding bg-secondary/50">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">Знакомо?</h2>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Эти проблемы стоят вашему бизнесу денег, времени и роста
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pains.map((pain, i) => (
          <motion.div
            key={pain.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="rounded-xl bg-card p-6 border border-border hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="h-12 w-12 rounded-lg bg-accent flex items-center justify-center mb-4">
              <pain.icon className="h-6 w-6 text-accent-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{pain.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{pain.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default PainsSection;
