import { MapPin, Phone, Clock } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-warm-gold mb-3">
            Visit Us
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4">
            Make a <span className="italic text-primary">Reservation</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            We'd love to welcome you to our table. Walk-ins are welcome, 
            but reservations are recommended for dinner service.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center p-8 bg-card border border-border rounded-sm">
            <MapPin className="w-6 h-6 text-warm-gold mx-auto mb-4" />
            <h3 className="font-display text-xl text-foreground mb-2">Location</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              42 Rue de la Fusion<br />
              Paris, 75006<br />
              France
            </p>
          </div>

          <div className="text-center p-8 bg-card border border-border rounded-sm">
            <Clock className="w-6 h-6 text-warm-gold mx-auto mb-4" />
            <h3 className="font-display text-xl text-foreground mb-2">Hours</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Tue – Sat: 12:00 – 14:30<br />
              Tue – Sat: 19:00 – 22:30<br />
              Sun – Mon: Closed
            </p>
          </div>

          <div className="text-center p-8 bg-card border border-border rounded-sm">
            <Phone className="w-6 h-6 text-warm-gold mx-auto mb-4" />
            <h3 className="font-display text-xl text-foreground mb-2">Contact</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              +33 1 42 86 00 00<br />
              hello@jeanandmateo.com
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
