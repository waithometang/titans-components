import { type App, type Component, type Plugin } from "vue";
import { each } from "lodash-es";

type SFCWithInstall<T> = T & Plugin;

export function makeInstaller(components: Plugin[]) {
  const installer = (app: App) => each(components, (c) => app.use(c));

  return installer;
}

export function withInstall<T extends Component>(component: T) {
  (component as SFCWithInstall<T>).install = (app: App) => {
    const { name } = (component as any).name;
    app.component(name, component);
  };

  return component as SFCWithInstall<T>;
}
