import aboutImage from "@/assets/about-restaurant.jpg";

const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="relative">
            <img
              src={aboutImage}
              alt="Jean & Mateo restaurant interior"
              loading="lazy"
              width={1024}
              height={1024}
              className="w-full h-[500px] object-cover shadow-2xl"
            />
            <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-warm-gold -z-10" />
          </div>

          {/* Text */}
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-warm-gold mb-3 font-body">
              Our Story
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-foreground mb-6 leading-tight">
              Two Cultures,<br />
              <span className="italic text-primary">One Table</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Born from the friendship of Jean, a classically trained French chef, and Mateo, 
              who grew up cooking traditional Bolivian dishes with his grandmother in Cochabamba, 
              our restaurant celebrates the unexpected harmony between two rich culinary traditions.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Every dish on our menu tells a story of discovery — from salteñas reimagined with 
              French pâte feuilletée to coq au vin simmered with aji amarillo. We invite you 
              to experience food that bridges continents.
            </p>
            <div className="flex gap-12">
              <div>
                <p className="font-display text-3xl text-warm-gold">12+</p>
                <p className="text-sm text-muted-foreground uppercase tracking-wider">Years Together</p>
              </div>
              <div>
                <p className="font-display text-3xl text-warm-gold">100%</p>
                <p className="text-sm text-muted-foreground uppercase tracking-wider">Fresh & Local</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
