const FooterSection = () => (
  <footer className="border-t border-border py-10 px-4">
    <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
      <p>© 2025 HR Инструментарий. Казань.</p>
      <nav className="flex gap-6">
        <a href="#program" className="hover:text-foreground transition-colors">Программа</a>
        <a href="#pricing" className="hover:text-foreground transition-colors">Стоимость</a>
        <a href="#application" className="hover:text-foreground transition-colors">Записаться</a>
      </nav>
    </div>
  </footer>
);

export default FooterSection;
