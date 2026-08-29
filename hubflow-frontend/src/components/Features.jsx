const features = [
  {
    title: 'Workflow automation',
    text: 'Connect repetitive tasks into streamlined processes with flexible rules.',
  },
  {
    title: 'Shared visibility',
    text: 'Keep teams aligned with real-time updates, reporting, and dashboards.',
  },
  {
    title: 'Smarter collaboration',
    text: 'Manage approvals, handoffs, and customer communication in one place.',
  },
];

const Features = () => {
  return (
    <section className="features">
      <div className="container">
        <header>
          <span className="eyebrow">Features</span>
          <h2>Everything your team needs to scale.</h2>
        </header>
        <div className="feature-grid">
          {features.map((feature) => (
            <article key={feature.title} className="feature-card">
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
