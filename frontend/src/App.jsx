import EcommerceApp from "./ecommerce/EcommerceApp";
import HubflowApp from "./hubflow/HubFlowApp";
import StripeApp from "./stripe/StripeApp";

const applications = {
  "/ecommerce": EcommerceApp,
  "/stripe": StripeApp,
};

function App() {
  const Application = applications[window.location.pathname] ?? HubflowApp;

  return <Application />;
}

export default App;
