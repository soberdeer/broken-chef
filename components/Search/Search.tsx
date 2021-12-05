import React from 'react';
import cx from 'clsx';
import { X, Search as SearchIcon } from 'react-feather';
import Button from '../Button/Button';
import classes from './Search.module.scss';

export interface ButtonProps extends React.HTMLProps<HTMLDivElement> {
  clear(): void;
  onChange(any):void;
  value?: string,
}

export default function Search({
  className,
  clear,
  value,
  onChange,
  ...others
}: ButtonProps) {
  return (
    <div
      className={cx(className, classes.searchContainer)}
      {...others}
    >
      <SearchIcon size={30} />
      <div className={classes.inputForm}>

        <input
          className={classes.input}
          placeholder="Search for food..."
          onChange={(e) => onChange(e.target.value)}
          value={value}
        />
        {value.length > 0 && <button className={classes.clear} onClick={clear}><X size={26} /></button>}
      </div>
      <div className={classes.filterButton}>
        <Button className={classes.button}>Filter</Button>
      </div>
    </div>
  );
}
