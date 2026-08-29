import DashboardApp from "./dashboard/DashboardApp";
import EcommerceApp from "./ecommerce/EcommerceApp";
import HubflowApp from "./hubflow/HubFlowApp";
import StripeApp from "./stripe/StripeApp";

const applications = {
  "/dashboard": DashboardApp,
  "/ecommerce": EcommerceApp,
  "/stripe": StripeApp,
};

function App() {
  const Application = applications[window.location.pathname] ?? HubflowApp;

  return <Application />;
}

export default App;
