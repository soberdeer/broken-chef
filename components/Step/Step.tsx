import React, { useEffect, useState } from 'react';
import cx from 'clsx';
import fixText from '../../fixText';
import Title from '../Title/Title';
import Paddings from '../Paddings/Paddings';
import classes from './Step.module.scss';

export default function Step({
  title,
  directions,
  image,
  className,
  order,
  hideNumber,
  ...others
}) {
  const [text, setText] = useState('');
  const [arr, setArr] = useState([]);

  useEffect(() => {
    fixText(directions, setArr, setText);
  }, []);
  if (order === 2) {
    // console.log(others);
    // console.log(directions)
  }
  return (
    <div className={cx(className, classes.step, { [classes.noBottomPadding]: !directions && !image})}>
      {order > 0 && !hideNumber && (
        <Paddings className={classes.circleWrapper}>
          <div className={classes.circle}>{order}</div>
        </Paddings>
      )}
      <Paddings><Title order={3} center>{title.replace(/\[c (.*?)\]/g, '$1°C')}</Title></Paddings>
      <Paddings>
        {text.length > 0 && <div
          className={classes.directions}
          dangerouslySetInnerHTML={{ __html: text }}
        />}
        {arr.length > 0 && (
          <div>
            {arr}
          </div>
        )}
      </Paddings>
      {image && (
        <div className={classes.imageContainer}>
          <img src={image} className={classes.image}/>
        </div>
      )}
    </div>
  );
}
