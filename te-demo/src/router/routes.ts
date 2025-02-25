import EconomicCalendarApi from "@/components/EconomicCalendarApi/EconomicCalendarApi.vue";
import Home from "@/components/Home.vue";
import IndicatorApi from "@/components/IndicatorApi/IndicatorApi.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/indicators", name: "Indicators API", component: IndicatorApi },
  {
    path: "/economic_calendar",
    name: "Economic Calendar API",
    component: EconomicCalendarApi,
  },
];
export default routes;
