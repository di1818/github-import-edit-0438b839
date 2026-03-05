import { CheckCircle, XCircle } from "lucide-react";
import Reveal from "./Reveal";

const suitable = [
  "Слабая конверсия — мало кандидатов доходят до следующих этапов и до выхода на стажировку",
  "Ручной труд — большая часть времени уходит на оценку резюме, первичные звонки, отсев кандидатов и на другие задачи, которые можно автоматизировать",
  "Низкая эффективность — много задач и действий, но нет чёткого понимания, какие из них действительно влияют на результат",
  "Сложно аргументировать HR-решения перед руководством",
];

const suitableCompanies = [
  "Есть HR, но процессы ещё не выстроены системно",
  "Найм занимает много времени и зависит от ручного контроля",
  "Нет понятных метрик и прозрачных процессов работы с людьми",
];

const notSuitable = [
  "Вы только начинаете карьеру в HR",
  "В компании нет HR-специалиста",
  "Нет задачи развивать HR-процессы и систему работы с персоналом",
];

const ForWhomSection = () => (
  <section className="section-padding">
    <div className="container">
      <Reveal className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">Для кого эта программа</h2>
        <p className="text-muted-foreground text-lg">HR-менеджер · HR-генералист · HRBP</p>
      </Reveal>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Reveal direction="left">
          <div className="rounded-2xl border border-primary/20 bg-accent p-8 h-full">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <CheckCircle className="h-6 w-6 text-primary" />
              Подойдёт
            </h3>
            <p className="text-sm font-medium text-muted-foreground mb-3">HR которые сталкиваются с:</p>
            <ul className="space-y-4 mb-6">
              {suitable.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-sm font-medium text-muted-foreground mb-3">Подойдёт компаниям, где:</p>
            <ul className="space-y-4">
              {suitableCompanies.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal direction="right" delay={100}>
          <div className="rounded-2xl border border-border bg-card p-8 h-full">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 text-muted-foreground">
              <XCircle className="h-6 w-6" />
              Не подойдёт
            </h3>
            <ul className="space-y-4 text-muted-foreground">
              {notSuitable.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground mt-1.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

export default ForWhomSection;
