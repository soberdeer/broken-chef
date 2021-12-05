import React from 'react';
import cx from 'clsx';
import { ComponentType } from '../ComponentType';
import classes from './Text.module.scss';

export interface TextProps {
  className?: string;
  children?: React.ReactNode;
  htmlFor?: string;
}

export default function Text<T extends React.ElementType = 'p'>({
  className,
  component: Element = 'p',
  children = null,
  ...others
}: TextProps & ComponentType<T>) {
  const isHtml = /<\/?[a-z][\s\S]*>/i.test(children);

  if (children) {
    return isHtml ? (
      <Element className={cx(classes.text, className)} {...others} dangerouslySetInnerHTML={{ __html: children }} />
    ) : (
      <Element className={cx(classes.text, className)} {...others}>
        {children}
      </Element>
    );
  }

  return null;
}
