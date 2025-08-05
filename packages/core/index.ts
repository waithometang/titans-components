import { makeInstaller } from "@titans-components/utils";
import components from "./components";
import "@titans-components/theme/index.scss";

const installer = makeInstaller(components);

export * from "../components";
export default installer;
