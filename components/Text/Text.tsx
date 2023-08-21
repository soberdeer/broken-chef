import React from 'react';
import cx from 'clsx';
import { ComponentType } from '../ComponentType';
import classes from './Text.module.scss';

export interface TextProps {
  className?: string;
  children?: React.ReactNode | string;
  htmlFor?: string;
}

export default function Text<T extends React.ElementType = 'p'>({
  className,
  component,
  children = null,
  ...others
}: TextProps & ComponentType<T>) {
  const Element = component || 'p';
  const isHtml = typeof children === 'string' ? /<\/?[a-z][\s\S]*>/i.test(children) : false;

  if (children) {
    return isHtml ? (
      //@ts-ignore
      <Element className={cx(classes.text, className)} {...others} dangerouslySetInnerHTML={{ __html: children }} />
    ) : (
      //@ts-ignore
      <Element className={cx(classes.text, className)} {...others}>
        {children}
      </Element>
    );
  }

  return null;
}
