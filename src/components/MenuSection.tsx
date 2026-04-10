const menuItems = [
  {
    category: "Starters",
    items: [
      { name: "Salteña Feuilletée", desc: "Bolivian salteña with French puff pastry, spiced beef, potatoes & aji", price: "14" },
      { name: "Llajwa Tartare", desc: "Beef tartare with Bolivian llajwa sauce, locoto pepper & toasted maize", price: "18" },
      { name: "Soupe à l'Oignon Andina", desc: "French onion soup with quinoa croutons & Gruyère", price: "12" },
    ],
  },
  {
    category: "Main Courses",
    items: [
      { name: "Coq au Vin con Aji", desc: "Classic coq au vin with aji amarillo, roasted vegetables & herb rice", price: "32" },
      { name: "Pique Macho Bourguignon", desc: "Bolivian pique macho meets beef bourguignon, with crispy frites", price: "34" },
      { name: "Trucha à la Meunière", desc: "Lake Titicaca-style trout with brown butter, capers & chuño purée", price: "28" },
    ],
  },
  {
    category: "Desserts",
    items: [
      { name: "Tarte Tatin de Tuna", desc: "Upside-down tart with Bolivian prickly pear & vanilla crème", price: "13" },
      { name: "Mousse au Chocolat & Quinua", desc: "Dark chocolate mousse with puffed quinoa & cinnamon", price: "11" },
      { name: "Crème Brûlée à la Canela", desc: "Classic crème brûlée infused with Bolivian cinnamon", price: "12" },
    ],
  },
];

const MenuSection = () => {
  return (
    <section id="menu" className="py-24 bg-warm-dark text-warm-cream">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-warm-gold mb-3">
            Culinary Creations
          </p>
          <h2 className="font-display text-4xl md:text-5xl mb-4">
            Our <span className="italic text-warm-gold">Menu</span>
          </h2>
          <p className="text-warm-cream/60 max-w-lg mx-auto">
            A curated selection of dishes that celebrate the bold flavors of Bolivia 
            and the refined techniques of France.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {menuItems.map((category) => (
            <div key={category.category}>
              <h3 className="font-display text-2xl text-warm-gold mb-6 text-center">
                {category.category}
              </h3>
              <div className="space-y-6">
                {category.items.map((item) => (
                  <div key={item.name} className="border-b border-warm-cream/10 pb-4">
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 className="font-display text-lg">{item.name}</h4>
                      <span className="text-warm-gold font-body text-sm ml-2">${item.price}</span>
                    </div>
                    <p className="text-warm-cream/50 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
