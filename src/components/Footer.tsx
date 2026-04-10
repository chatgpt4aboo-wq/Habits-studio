const Footer = () => {
  return (
    <footer className="bg-warm-dark text-warm-cream/60 py-12 border-t border-warm-cream/10">
      <div className="container mx-auto px-6 text-center">
        <p className="font-display text-2xl text-warm-cream mb-2">
          Jean <span className="text-warm-gold">&</span> Mateo
        </p>
        <p className="text-sm mb-6">Bolivian & French Fusion Cuisine</p>
        <div className="flex justify-center gap-8 text-xs uppercase tracking-widest mb-6">
          <a href="#home" className="hover:text-warm-gold transition-colors">Home</a>
          <a href="#about" className="hover:text-warm-gold transition-colors">About</a>
          <a href="#menu" className="hover:text-warm-gold transition-colors">Menu</a>
          <a href="#contact" className="hover:text-warm-gold transition-colors">Contact</a>
        </div>
        <p className="text-xs text-warm-cream/30">
          © {new Date().getFullYear()} Jean & Mateo. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
