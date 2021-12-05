import React from 'react';
import Link from 'next/link';
import cx from 'clsx';
import { ComponentType } from '../ComponentType';
import classes from './Button.module.scss';

export interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  type?: 'button' | 'submit' | 'reset';
  href?: string;
}

export default function Button<T extends React.ElementType = 'button'>({
  className,
  component = 'button',
  type = 'button',
  children = null,
  href = null,
  ...others
}: ButtonProps & ComponentType<T>) {
  const Element = component || 'button';

  if (Element === 'a') {
    return (
      <Link href={href} shallow>
        <a
          className={cx(className, classes.button)}
          type={type}
          {...others}
        >
          {children}
        </a>
      </Link>
    );
  }

  return (
    <Element
      className={cx(className, classes.button)}
      type={type || 'button'}
      {...others}
    >
      {children}
    </Element>
  );
}
