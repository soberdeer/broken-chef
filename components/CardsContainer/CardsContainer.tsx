import React, { useEffect, useState } from "react";
import classes from "./CardsContainer.module.scss";

export default function CardsContainer({ children }) {
  return <div className={classes.matrix}>{children}</div>;
}
