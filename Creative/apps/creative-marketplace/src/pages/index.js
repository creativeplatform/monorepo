import Collection from "./Collection";
import Contact from "./Contact";
import Create from "./Create";
import Dashboard from "./Dashboard";
import Explore03 from "./Explore03";
import Explore04 from "./Explore04";
import Faqs from "./Faqs";
import HelpCenter from "./HelpCenter";
import Home01 from "./Home01";
import ItemDetails01 from "./ItemDetails01";
import ItemDetails02 from "./ItemDetails02";
import LiveAuctions02 from "./LiveAuctions02";
import Ranking from "./Ranking";



const routes = [
  { path: '/', component: <Home01 />},
  { path: '/explore-v3', component: <Explore03 />},
  { path: '/explore-v4', component: <Explore04 />},
  { path: '/collection', component: <Collection />},
  { path: '/live-auctions-v2', component: <LiveAuctions02 />},
  { path: '/item-details-v1', component: <ItemDetails01 />},
  { path: '/item-details-v2', component: <ItemDetails02 />},
  { path: '/dashboard', component: <Dashboard />},
  { path: '/ranking', component: <Ranking />},
  { path: '/help-center', component: <HelpCenter />},
  { path: '/faqs', component: <Faqs />},
  { path: '/create', component: <Create />},
  { path: '/contact', component: <Contact />},



]

export default routes;