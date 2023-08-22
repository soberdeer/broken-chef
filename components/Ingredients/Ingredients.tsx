import React from 'react';
import cx from 'clsx';
import Text from '../Text/Text';
import Title from '../Title/Title';
import classes from './Ingredients.module.scss';

export default function Ingredients({
  ingredients,
  equipment,
  timing,
  recipeYield,
  className,
  openModal,
  ...others
}) {

  return (
    <div className={cx(classes.centerContent, classes.ingredients)}>
      <Title order={3}>Ingredients</Title>
      <div className={classes.ingredientsWrapper}>
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
                  <span style={{ fontWeight: 'bold' }}>
                    <button
                      className={classes.itemButton}
                      onClick={() => openModal(item)}
                    >
                      {item.title}
                    </button>
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
          <div className={classes.ingredientYield}>
            {equipment?.length > 0 && (
              <div className={classes.equipment}>
                <Title order={4} className={classes.equipmentTitle}>
                  Equipment
                </Title>
                <div className={classes.list}>
                  {equipment.map((item, i) => (
                    <Text className={classes.equipmentText} key={i}>
                      {item.equipment.title
                        .replace(
                          /(.*?)\s?qt/g,
                          (match, p1) =>
                            `${(parseFloat(p1) * 0.95).toFixed(1)}l`,
                        )
                        .replace('N2O', `N<sub>2</sub>O`)}
                    </Text>
                  ))}
                </div>
              </div>
            )}
            <div className={classes.equipment}>
              <Title order={4} className={classes.equipmentTitle}>
                Timing
              </Title>
              <div className={classes.list}>
                <Text className={classes.equipmentText}>{timing}</Text>
              </div>
            </div>
            <div className={classes.equipment}>
              <Title order={4} className={classes.equipmentTitle}>
                Yield
              </Title>
              <div className={classes.list}>
                <Text className={classes.equipmentText}>{recipeYield}</Text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
