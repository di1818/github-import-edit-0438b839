import { Check, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import Reveal from "./Reveal";

const DEADLINE = new Date("2026-03-15T23:59:59");

const useCountdown = (target: Date) => {
  const calc = () => {
    const diff = Math.max(0, target.getTime() - Date.now());
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
      expired: diff <= 0,
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
};

const plans = [
  {
    name: "Базовый",
    price: "120 000",
    desc: "Полная программа с конфиденциальностью. Ваши кейсы и компания — только ваши.",
    features: ["Полная программа обучения", "Все артефакты и шаблоны", "6 месяцев сопровождения", "Разбор кейсов 1 раз/мес", "Полная конфиденциальность"],
    highlighted: false,
  },
  {
    name: "Со скидкой 50%",
    price: "60 000",
    oldPrice: "120 000",
    desc: "Скидка в обмен на возможность показать результаты обучения по изменению метрик в вашей компании",
    features: ["Полная программа обучения", "Все артефакты и шаблоны", "6 месяцев сопровождения", "Разбор кейсов 1 раз/мес", "Замер метрик 6 и 12 месяцев"],
    highlighted: true,
  },
  {
    name: "Обучение + Аудит",
    price: null,
    desc: "Программа + аудит HR-процессов вашей компании + внедрение под контролем эксперта",
    features: ["Всё из базового пакета", "Аудит HR-процессов компании", "Внедрение под контролем", "Индивидуальное сопровождение", "Максимальный результат"],
    highlighted: false,
  },
];

const PricingSection = () => {
  const countdown = useCountdown(DEADLINE);

  return (
    <section id="pricing" className="section-padding bg-secondary/50">
      <div className="container section-glow">
        <Reveal className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">Стоимость</h2>
          <p className="text-muted-foreground text-lg">Выберите формат участия. Цены одинаковы для офлайн и онлайн.</p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 100}>
               <div
                className={`relative rounded-2xl p-8 flex flex-col h-full transition-all duration-500 ${
                  plan.highlighted
                    ? "bg-foreground text-background border-2 border-foreground shadow-2xl md:scale-105 shimmer"
                    : "bg-card border border-border glow-card hover:-translate-y-1"
                }`}
              >
                {plan.highlighted && (
                  <>
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-semibold px-4 py-1 rounded-full">
                      🔥 Успей записаться!
                    </span>

                    {/* Countdown */}
                    {!countdown.expired && (
                      <div className="mb-5 rounded-xl bg-background/10 border border-background/20 p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Clock className="h-4 w-4 text-primary" />
                          <span className="text-sm font-semibold">До 15 марта — скидка 50%</span>
                        </div>
                        <div className="grid grid-cols-4 gap-2 text-center">
                          {[
                            { val: countdown.days, label: "дн" },
                            { val: countdown.hours, label: "ч" },
                            { val: countdown.minutes, label: "мин" },
                            { val: countdown.seconds, label: "сек" },
                          ].map((t) => (
                            <div key={t.label}>
                              <span className="text-2xl font-bold font-display block">{String(t.val).padStart(2, "0")}</span>
                              <span className="text-[10px] uppercase opacity-60">{t.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}

                <h3 className={`text-2xl font-bold font-display mb-2 ${plan.highlighted ? "" : "text-gradient"}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm mb-6 ${plan.highlighted ? "opacity-70" : "text-muted-foreground"}`}>
                  {plan.desc}
                </p>
                <div className="mb-6">
                  {plan.price ? (
                    <div className="flex items-baseline gap-3">
                      <span className="text-4xl font-bold font-display">{plan.price}</span>
                      <span className={`text-sm ${plan.highlighted ? "opacity-60" : "text-muted-foreground"}`}>₽</span>
                      {"oldPrice" in plan && plan.oldPrice && (
                        <span className="text-lg line-through opacity-40">{plan.oldPrice} ₽</span>
                      )}
                    </div>
                  ) : (
                    <p className={`text-sm ${plan.highlighted ? "opacity-70" : "text-muted-foreground"}`}>
                      Цена будет доступна после индивидуальной консультации
                    </p>
                  )}
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm">
                      <Check className="h-4 w-4 shrink-0 text-primary" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="#application"
                  className={`inline-flex items-center justify-center rounded-lg px-6 py-3 font-semibold transition-all duration-300 ${
                    plan.highlighted
                      ? "bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/30"
                      : "bg-secondary text-secondary-foreground hover:bg-accent"
                  }`}
                >
                  {plan.highlighted ? "Записаться со скидкой" : "Записаться"}
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
