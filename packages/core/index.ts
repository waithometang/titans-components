import { makeInstaller } from "@titans-components/utils";
import components from "./components";
import "@titans-components/theme/index.scss";

const installer = makeInstaller(components);

export * from "@titans-components/components";
export default installer;
