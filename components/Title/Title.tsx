import React from 'react';
import cx from 'clsx';
import Text, { TextProps } from '../Text/Text';
import classes from './Title.module.scss';

interface TitleProps extends TextProps, Omit<React.HTMLProps<HTMLHeadingElement>, 'style'> {
  className?: string,
  order?: 1 | 2 | 3 | 4 | 5 | 6;
  center?: boolean
}

export default function Title({
  order = 4,
  center = false,
  className,
  ...others
}: TitleProps) {
  const stringOrder = `h${order}` as React.ElementType;

  return (
    <Text
      {...others}
      component={stringOrder}
      className={cx(className, classes.title, classes[`h${order}`], {[classes.center]: center})}
    />
  );
}

Title.displayName = '@ioa/adapt/Title';
