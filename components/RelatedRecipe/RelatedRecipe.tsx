import React, { useEffect, useState } from 'react';
import cx from 'clsx';
import Button from '../Button/Button';
import Text from '../Text/Text';
import Title from '../Title/Title';
import fetchRecipe from '../../fetchers/fetchRecipe';
import classes from './RelatedRecipe.module.scss';

export default function RelatedRecipe({
  link,
  className,
  last,
  ...others
}) {
  const [data, setData] = useState(null);

  async function fetch() {
    const a = await fetchRecipe(link).then(response => response.json());
    if (a) {
      setData(a)
    }
  }

  useEffect(() => {
    fetch()
  }, [])

  return (
    <div className={cx(className, classes.relatedRecipe)}>
      {data ? (
        <div className={cx(classes.recipe, {[classes.last]: last})}>
          <img className={classes.image} width={280} src={data.heroImage} />
          <div className={classes.content}>
            <Text className={classes.title}>{data.title}</Text>
            <Text className={classes.timing}>{`Cooking time: ${data.timing}`}</Text>
            <Button
              className={classes.button}
              href={link}
              target="_blank"
              component="a"
            >
              See the recipe
            </Button>
          </div>
        </div>
      ) : (
        null
      )}
    </div>
  );
}
