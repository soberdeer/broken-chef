import React, {useEffect, useState} from 'react';
import cx from 'clsx';
import fixText, {replaceText} from '../../fixText';
import Title from '../Title/Title';
import Paddings from '../Paddings/Paddings';
import Text from "../Text/Text";
import classes from './Step.module.scss';

export default function Step({
                               title,
                               directions,
                               image,
                               className,
                               order,
                               hideNumber,
                               ingredients,
isAside,
...others
                             }) {
  const [text, setText] = useState('');
  const [_title, setTitle] = useState('');
  const [arr, setArr] = useState([]);

  useEffect(() => {
    fixText(directions, setArr, setText);
    setTitle(replaceText(title));
  }, []);


  return !isAside? (
    <div className={cx(className, classes.step, {[classes.noBottomPadding]: !directions && !image})}>
      {order > 0 && !hideNumber && (
        <Paddings className={classes.circleWrapper}>
          <div className={classes.circle}>{order}</div>
        </Paddings>
      )}
      <Paddings><Title order={3} center>{_title}</Title></Paddings>
      {image && (
        <div className={classes.imageContainer}>
          <img src={image} className={classes.image}/>
        </div>
      )}

      {ingredients && ingredients.length > 0 && (
        <Paddings className={classes.ingredientsWrapper}>
          <div className={classes.inner}>
            {ingredients.map((item, i) => (
              <div className={classes.ingredient} key={i}>
                <div className={classes.quantity}>
                  <Text className={classes.quantityText}>
                    {item.quantity !== '0.0'
                      ? parseFloat(item.quantity) % 1 === 0
                        ? `${parseInt(item.quantity, 10)}${item.unit}`
                        : `${item.quantity}${item.unit}`
                      : '-'}
                  </Text>
                </div>
                <div className={classes.ingredientTitle}>
                  <Text className={classes.ingredientTitleText}>
                  <span style={{textDecoration: 'underline'}}>
                      {item.title}
                  </span>
                    {(item.note || item.unit === 'a/n') && (
                      <span>
                      {`${item.note !== '' ? `, ${item.note}` : ''}${
                        item.unit === 'a/n' ? ', as needed' : ''
                      }`.replace(/\[link ([^\s]+) (.*?)\]/g, '')}
                    </span>
                    )}
                  </Text>
                </div>
              </div>
            ))}
          </div>
          </Paddings>
      )}
      <Paddings>
        {text.length > 0 && <div
          className={classes.directions}
          style={{paddingTop: ingredients && ingredients.length > 0 ? 40 : 0}}
          dangerouslySetInnerHTML={{__html: text}}
        />}
        {arr.length > 0 && (
          <div>
            {arr}
          </div>
        )}
      </Paddings>
    </div>
  ) : (
    <div className={cx(className, classes.step, classes.gray, {[classes.noBottomPadding]: !directions && !image, })}>
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', paddingBottom: 15}}>
        <svg
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.5"
          width={30}
          height={30}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 12h1m8-9v1m8 8h1M5.6 5.6l.7.7m12.1-.7l-.7.7M9 16a5 5 0 116 0 3.5 3.5 0 00-1 3 2 2 0 01-4 0 3.5 3.5 0 00-1-3m.7 1h4.6"/>
        </svg>
        <Text style={{marginBlockEnd: 0, fontSize: 21}}>Tip </Text>
      </div>
      {order > 0 && !hideNumber && (
        <Paddings className={classes.circleWrapper}>
          <div className={classes.circle}>{order}</div>
        </Paddings>
      )}
      <Paddings><Title order={3} center>{_title}</Title></Paddings>
      {image && (
        <div className={classes.imageContainer}>
          <img src={image} className={classes.image}/>
        </div>
      )}
      <Paddings>
        {text.length > 0 && <div
          className={classes.directions}
          style={{paddingTop: ingredients && ingredients.length > 0 ? 40 : 0}}
          dangerouslySetInnerHTML={{__html: text}}
        />}
        {arr.length > 0 && (
          <div>
            {arr}
          </div>
        )}
      </Paddings>
    </div>
  );
}
