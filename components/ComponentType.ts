import React from "react";

export type ComponentType<T extends React.ElementType> =
  React.ComponentPropsWithoutRef<T> & {
    component?: T;
  };
