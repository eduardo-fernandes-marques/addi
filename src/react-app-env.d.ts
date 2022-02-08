/// <reference types="react-scripts" />

type DynamicObject<T> = { [key: string]: T };


declare module "*.svg" {
  import * as React from "react";

  export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;

  const src: string;
  export default src;
}