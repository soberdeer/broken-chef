import React, { useEffect, useState } from "react";
import Text from "../Text/Text";
import Title from "../Title/Title";
import Modal from "../Modal/Modal";
import { XCircle } from "react-feather";
import Button from "../Button/Button";
import classes from "./Ingredient.module.scss";

export default function Ingredient({ id, onClose }) {
  const [ingredientData, setIngredientData] = useState(null);

  const fetchIngredient = async (id: string) => {
    await fetch("/api/fetch_ingredient", {
      body: JSON.stringify({ id }),
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        setIngredientData(data.ingredient);
      })
      .catch(() => {});
  };

  useEffect(() => {
    if (id && !ingredientData) {
      fetchIngredient(id);
    }
    if (!id) {
      setTimeout(() => {
        setIngredientData(null);
      }, 200);
    }
  }, [id]);
// console.log(ingredientData)
  return (
    <Modal
      //@ts-ignore
      opened={!!id}
      onClose={onClose}
      width={500}
      className={classes.modal}
      innerClassName={classes.inner}
      contentClassName={classes.content}
    >
      {!ingredientData ? (
        <div className={classes.loading}>
          <div className={classes.dualRing}></div>
        </div>
      ) : (
        <div className={classes.root}>
          <div className={classes.imageWrapper}>
            <img src={ingredientData.image} className={classes.image} />
            <div className={classes.titleWrapper}>
              <Title className={classes.title} order={3}>
                {ingredientData.title}
              </Title>
            </div>
            <Button className={classes.closeButton} onClick={onClose}>
              <XCircle size={40} color="white" />
            </Button>
          </div>
          <div className={classes.description}>
            <Text className={classes.text}>
              {ingredientData?.textFields?.description}
            </Text>
          </div>
        </div>
      )}
    </Modal>
  );
}
