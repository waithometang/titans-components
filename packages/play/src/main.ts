import { createApp } from "vue";
import App from "./App.vue";
import TitansComponents from "titans-components";
import "@titans-components/theme/index.scss";

createApp(App).use(TitansComponents).mount("#app");
