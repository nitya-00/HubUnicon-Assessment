const plans = [
  {
    name: 'Starter',
    price: '$29',
    description: 'For small teams starting to automate.',
  },
  {
    name: 'Growth',
    price: '$79',
    description: 'For scaling operations and support teams.',
    featured: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For multi-team, high-volume organizations.',
  },
];

const Pricing = () => {
  return (
    <section className="pricing">
      <div className="container">
        <header>
          <span className="eyebrow">Pricing</span>
          <h2>Flexible plans that grow with you.</h2>
        </header>
        <div className="pricing-grid">
          {plans.map((plan) => (
            <article key={plan.name} className={`price-card ${plan.featured ? 'featured' : ''}`}>
              <h3>{plan.name}</h3>
              <div className="price">{plan.price}</div>
              <p>{plan.description}</p>
              <button>Choose plan</button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
