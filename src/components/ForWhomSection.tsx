import { motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";

const suitable = [
  "Собственники с командой от 10 человек",
  "Есть HR-менеджер, но нет системы",
  "Текучка и проблемы с наймом",
  "Готовы инвестировать в рост команды",
];

const notSuitable = [
  "Нет HR-менеджера в штате",
  "Нет готовности к изменениям",
  "Компания на стадии стартапа без команды",
  "Ищете разовую услугу, а не систему",
];

const ForWhomSection = () => (
  <section className="section-padding">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">Для кого эта программа</h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-primary/20 bg-accent p-8"
        >
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-primary" />
            Подходит
          </h3>
          <ul className="space-y-4">
            {suitable.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-2xl border border-border bg-card p-8"
        >
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 text-muted-foreground">
            <XCircle className="h-6 w-6" />
            Не подходит
          </h3>
          <ul className="space-y-4 text-muted-foreground">
            {notSuitable.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground mt-1.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  </section>
);

export default ForWhomSection;
