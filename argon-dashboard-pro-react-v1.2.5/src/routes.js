/*!

=========================================================
* Argon Dashboard PRO React - v1.2.5
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Calendar from "views/pages/Calendar.js";
import Charts from "views/pages/Charts.js";
import Buttons from "views/pages/components/Buttons.js";
import Cards from "views/pages/components/Cards.js";
import Grid from "views/pages/components/Grid.js";
import Icons from "views/pages/components/Icons.js";
import Notifications from "views/pages/components/Notifications.js";
import Typography from "views/pages/components/Typography.js";
import Alternative from "views/pages/dashboards/Alternative.js";
import Dashboard from "views/pages/dashboards/Dashboard.js";
import BonusHuntViewPage from "views/pages/databases/BonusHuntViewPage";
import ViewBonusBuyBattlePage from "views/pages/databases/ViewBonusBuyBattlePage";
import ViewSlotPage from "views/pages/databases/ViewSlotPage.js";
import ViewTournamentPage from "views/pages/databases/ViewTournamentPage";
import Lock from "views/pages/examples/Lock.js";
import Login from "views/pages/examples/Login.js";
import Pricing from "views/pages/examples/Pricing.js";
import Profile from "views/pages/examples/Profile.js";
import Register from "views/pages/examples/Register.js";
import RTLSupport from "views/pages/examples/RTLSupport.js";
import Timeline from "views/pages/examples/Timeline.js";
import Components from "views/pages/forms/Components.js";
import Elements from "views/pages/forms/Elements.js";
import Validation from "views/pages/forms/Validation.js";
import Google from "views/pages/maps/Google.js";
import Vector from "views/pages/maps/Vector.js";
import CreateBonusBuyBattlePage from "views/pages/minigames/CreateBonusBuyBattlePage";
import CreateBonusHuntPage from "views/pages/minigames/CreateBonusHuntPage";
import CreatePaymentPage from "views/pages/minigames/CreatePaymentPage";
import CreateSlotPage from "views/pages/minigames/CreateSlotPage";
import CreateTournamentPage from "views/pages/minigames/CreateTournamentPage";
import ReactBSTables from "views/pages/tables/ReactBSTables.js";
import Sortable from "views/pages/tables/Sortable.js";
import Tables from "views/pages/tables/Tables.js";
import Widgets from "views/pages/Widgets.js";
const routes = [
  {
    collapse: true,
    name: "Dashboards",
    icon: "ni ni-shop text-primary",
    state: "dashboardsCollapse",
    views: [
      {
        path: "/dashboard",
        name: "Dashboard",
        miniName: "D",
        component: <Dashboard />,
        layout: "/admin",
      },
      {
        path: "/alternative-dashboard",
        name: "Alternative",
        miniName: "A",
        component: <Alternative />,
        layout: "/admin",
      },
    ],
  },
  {
    collapse: true,
    name: "Mini Games",
    icon: "ni ni-shop text-primary",
    state: "minigamesCollapse",
    views: [
      {
        path: "/main-slot",
        name: "Main Slot",
        miniName: "D",
        component: <CreatePaymentPage />,
        layout: "/admin",
      },{
        path: "/slot-admin/create",
        name: "Criar Slot",
        miniName: "D",
        component: <CreateSlotPage />,
        layout: "/admin",
      },
      {
        path: "/bonus-hunt/create",
        name: "Criar Bonus Hunt",
        miniName: "D",
        component: <CreateBonusHuntPage />,
        layout: "/admin",
      },{
        path: "/bonus-buy-battle/create",
        name: "Criar BBB",
        miniName: "D",
        component: <CreateBonusBuyBattlePage />,
        layout: "/admin",
      },{
        path: "/tournaments/create",
        name: "Criar Torneio",
        miniName: "TOR",
        component: <CreateTournamentPage />,
        layout: "/admin",
      },{
        path: "/bonus-hunt/create",
        name: "Criar KOH",
        miniName: "D",
        component: <CreateBonusHuntPage />,
        layout: "/admin",
      },{
        path: "/bonus-hunt/create",
        name: "Criar CTQ",
        miniName: "D",
        component: <CreateBonusHuntPage />,
        layout: "/admin",
      },{
        path: "/bonus-hunt/create",
        name: "Criar Elo mais fraco",
        miniName: "D",
        component: <CreateBonusHuntPage />,
        layout: "/admin",
      },
    ],
  },{
    collapse: true,
    name: "Database",
    icon: "ni ni-shop text-primary",
    state: "databaseCollapse",
    views: [
      {
        path: "/slot-admin/view",
        name: "View Slots",
        miniName: "D",
        component: <ViewSlotPage />,
        layout: "/admin",
      },
      {
        path: "/bonus-hunt/view",
        name: "Visualizar Bonus Hunts",
        miniName: "V",
        component: <BonusHuntViewPage />,
        layout: "/admin",
      },{
        path: "/bonus-buy-battle/view",
        name: "Visualizar BBB",
        miniName: "V",
        component: <ViewBonusBuyBattlePage />,
        layout: "/admin",
      },{
        path: "/tournaments",
        name: "Visualizar Torneios",
        miniName: "V",
        component: <ViewTournamentPage />,
        layout: "/admin",
      },{
        path: "/bonus-hunt/view",
        name: "Visualizar KOH",
        miniName: "V",
        component: <BonusHuntViewPage />,
        layout: "/admin",
      },{
        path: "/bonus-hunt/view",
        name: "Visualizar CTQ",
        miniName: "V",
        component: <BonusHuntViewPage />,
        layout: "/admin",
      },{
        path: "/bonus-hunt/view",
        name: "Visualizar Elo mais fraco",
        miniName: "V",
        component: <BonusHuntViewPage />,
        layout: "/admin",
      },
    ],
  },{
    collapse: true,
    name: "Gestao",
    icon: "ni ni-shop text-primary",
    state: "gestaoCollapse",
    views: [
      {
        path: "/main-slot",
        name: "Loja",
        miniName: "D",
        component: <CreatePaymentPage />,
        layout: "/admin",
      },
      {
        path: "/bonus-hunt/view",
        name: "Raffles",
        miniName: "V",
        component: <BonusHuntViewPage />,
        layout: "/admin",
      },{
        path: "/bonus-hunt/view",
        name: "Sondagens",
        miniName: "V",
        component: <BonusHuntViewPage />,
        layout: "/admin",
      },{
        path: "/bonus-hunt/view",
        name: "Giveaways",
        miniName: "V",
        component: <BonusHuntViewPage />,
        layout: "/admin",
      },
    ],
  },
  {
    collapse: true,
    name: "Examples",
    icon: "ni ni-ungroup text-orange",
    state: "examplesCollapse",
    views: [
      {
        path: "/pricing",
        name: "Pricing",
        miniName: "P",
        component: <Pricing />,
        layout: "/auth",
      },
      {
        path: "/login",
        name: "Login",
        miniName: "L",
        component: <Login />,
        layout: "/auth",
      },
      {
        path: "/register",
        name: "Register",
        miniName: "R",
        component: <Register />,
        layout: "/auth",
      },
      {
        path: "/lock",
        name: "Lock",
        miniName: "L",
        component: <Lock />,
        layout: "/auth",
      },
      {
        path: "/timeline",
        name: "Timeline",
        miniName: "T",
        component: <Timeline />,
        layout: "/admin",
      },
      {
        path: "/profile",
        name: "Profile",
        miniName: "P",
        component: <Profile />,
        layout: "/admin",
      },
      {
        path: "/rtl-support",
        name: "RTL Support",
        miniName: "RS",
        component: <RTLSupport />,
        layout: "/rtl",
      },
    ],
  },
  {
    collapse: true,
    name: "Components",
    icon: "ni ni-ui-04 text-info",
    state: "componentsCollapse",
    views: [
      {
        path: "/buttons",
        name: "Buttons",
        miniName: "B",
        component: <Buttons />,
        layout: "/admin",
      },
      {
        path: "/cards",
        name: "Cards",
        miniName: "C",
        component: <Cards />,
        layout: "/admin",
      },
      {
        path: "/grid",
        name: "Grid",
        miniName: "G",
        component: <Grid />,
        layout: "/admin",
      },
      {
        path: "/notifications",
        name: "Notifications",
        miniName: "N",
        component: <Notifications />,
        layout: "/admin",
      },
      {
        path: "/icons",
        name: "Icons",
        miniName: "I",
        component: <Icons />,
        layout: "/admin",
      },
      {
        path: "/typography",
        name: "Typography",
        miniName: "T",
        component: <Typography />,
        layout: "/admin",
      },
      {
        collapse: true,
        name: "Multi Level",
        miniName: "M",
        state: "multiCollapse",
        views: [
          {
            path: "#pablo",
            name: "Third level menu",
            component: () => { },
            layout: "/",
          },
          {
            path: "#pablo",
            name: "Just another link",
            component: () => { },
            layout: "/",
          },
          {
            path: "#pablo",
            name: "One last link",
            component: () => { },
            layout: "/",
          },
        ],
      },
    ],
  },
  {
    collapse: true,
    name: "Forms",
    icon: "ni ni-single-copy-04 text-pink",
    state: "formsCollapse",
    views: [
      {
        path: "/elements",
        name: "Elements",
        miniName: "E",
        component: <Elements />,
        layout: "/admin",
      },
      {
        path: "/components",
        name: "Components",
        miniName: "C",
        component: <Components />,
        layout: "/admin",
      },
      {
        path: "/validation",
        name: "Validation",
        miniName: "V",
        component: <Validation />,
        layout: "/admin",
      },
    ],
  },
  {
    collapse: true,
    name: "Tables",
    icon: "ni ni-align-left-2 text-default",
    state: "tablesCollapse",
    views: [
      {
        path: "/tables",
        name: "Tables",
        miniName: "T",
        component: <Tables />,
        layout: "/admin",
      },
      {
        path: "/sortable",
        name: "Sortable",
        miniName: "S",
        component: <Sortable />,
        layout: "/admin",
      },
      {
        path: "/react-bs-table",
        name: "React BS Tables",
        miniName: "RBT",
        component: <ReactBSTables />,
        layout: "/admin",
      },
    ],
  },
  {
    collapse: true,
    name: "Maps",
    icon: "ni ni-map-big text-primary",
    state: "mapsCollapse",
    views: [
      {
        path: "/google",
        name: "Google",
        miniName: "G",
        component: <Google />,
        layout: "/admin",
      },
      {
        path: "/vector",
        name: "Vector",
        miniName: "V",
        component: <Vector />,
        layout: "/admin",
      },
    ],
  },
  {
    path: "/widgets",
    name: "Widgets",
    icon: "ni ni-archive-2 text-green",
    component: <Widgets />,
    layout: "/admin",
  },
  {
    path: "/charts",
    name: "Charts",
    icon: "ni ni-chart-pie-35 text-info",
    component: <Charts />,
    layout: "/admin",
  },
  {
    path: "/calendar",
    name: "Calendar",
    icon: "ni ni-calendar-grid-58 text-red",
    component: <Calendar />,
    layout: "/admin",
  },
];

export default routes;
