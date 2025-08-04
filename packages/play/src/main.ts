import { createApp } from "vue";
import App from "./App.vue";
import TitansComponents from "titans-components";
// import "@titans-components/theme/index.scss";
import "titans-components/dist/index.css";

const app = createApp(App);
app.use(TitansComponents);
app.mount("#app");
