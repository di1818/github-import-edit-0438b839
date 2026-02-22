const FooterSection = () => (
  <footer className="border-t border-border py-10 px-4">
    <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
      <p>© 2025 HR Инструментарий. Казань.</p>
      <div className="flex flex-col md:flex-row items-center gap-4">
        <nav className="flex gap-6">
          <a href="#program" className="hover:text-foreground transition-colors">Программа</a>
          <a href="#pricing" className="hover:text-foreground transition-colors">Стоимость</a>
          <a href="#application" className="hover:text-foreground transition-colors">Записаться</a>
        </nav>
        <span className="hidden md:inline text-border">|</span>
        <a href="tel:+79871837315" className="hover:text-foreground transition-colors">+7 (987) 183-73-15</a>
      </div>
    </div>
  </footer>
);

export default FooterSection;
