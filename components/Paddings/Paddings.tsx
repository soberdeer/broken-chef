import React from 'react';
import cx from 'clsx';
import { ComponentType } from '../ComponentType';
import classes from './Paddings.module.scss';

export default function Paddings<T extends React.ElementType = 'div'>({
  children,
  className,
  ...others
}: { children?: React.ReactNode, className?: string } & ComponentType<T>) {
  return <div className={cx(className, classes.paddings)} {...others}>{children}</div>;
}
