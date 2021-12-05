import React, { useEffect, useState } from 'react';
import cx from 'clsx';
import classes from './Wrapper.module.scss';

export default function Wrapper({
  children,
  className,
  backgroundColor = 'white',
  selection = false,
}: {className?: string, children: React.ReactNode, backgroundColor?: string, selection?: boolean}) {
  return (
    <div className={cx(className, classes.wrapper, { [classes.selection]: selection })} style={{ backgroundColor }}>
      {children}
    </div>
  );
}
