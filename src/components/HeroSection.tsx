import heroImage from "@/assets/hero-restaurant.jpg";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <img
        src={heroImage}
        alt="Beautifully plated Bolivian-French fusion dishes"
        width={1920}
        height={1080}
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-warm-dark/60" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl animate-fade-in-up">
        <p className="text-sm uppercase tracking-[0.3em] text-warm-gold mb-4 font-body">
          Bolivian & French Fusion
        </p>
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-warm-cream leading-tight mb-6">
          Jean <span className="text-warm-gold italic">&</span> Mateo
        </h1>
        <p className="text-warm-cream/80 text-lg md:text-xl font-light max-w-xl mx-auto mb-10 font-body">
          Where the warmth of Bolivia meets the elegance of France, one plate at a time.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#menu"
            className="border-2 border-warm-gold bg-warm-gold/10 text-warm-gold px-8 py-3 uppercase tracking-widest text-sm hover:bg-warm-gold hover:text-warm-dark transition-all duration-300"
          >
            Explore Menu
          </a>
          <a
            href="#contact"
            className="border border-warm-cream/40 text-warm-cream px-8 py-3 uppercase tracking-widest text-sm hover:border-warm-cream hover:bg-warm-cream/10 transition-all duration-300"
          >
            Make a Reservation
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-warm-cream/50">
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-px h-8 bg-warm-cream/30 animate-pulse" />
      </div>
    </section>
  );
};

export default HeroSection;
