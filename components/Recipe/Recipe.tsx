import React, { useEffect, useState } from "react";
import cx from "clsx";
import { Play, ArrowLeft, XCircle } from "react-feather";
import Wrapper from "../Wrapper/Wrapper";
import Button from "../Button/Button";
import Text from "../Text/Text";
import Title from "../Title/Title";
import Ingredients from "../Ingredients/Ingredients";
import Step from "../Step/Step";
import classes from "./Recipe.module.scss";
import { types } from "util";
import Ingredient from "../Ingredient/Ingredient";

export default function Recipe({
  description,
  equipment,
  heroImage,
  image,
  ingredients,
  shortDescription,
  sourceActivity,
  steps,
  tagList,
  timing,
  title,
  url,
  vimeoId,
  yield: recipeYield,
  youtubeId,
}) {
  const [desc, setDesc] = useState(description || "");
  const [arrowColor, setArrowColor] = useState("#ffffff");
  const [modal, setModal] = useState(false);
  const [ingredient, setIngredient] = useState(null);

  const openModal = (item) => {
    setIngredient(item.ingredient.id);
  };

  useEffect(() => {
    const newDesc =
      description
        ?.replaceAll("<br>", "")
        .replace(/\*\*(.*?)\*\*/g, '<span style="font-weight: bold">$1</span>')
        .replace(/\[c (.*?)\]/g, "$1°C")
        .replace(
          /\[f (.*?)\]/g,
          (match, p1) => `${((parseFloat(p1) - 32) * (5 / 9)).toFixed(1)}°C`
        )
        .replace(/\*(.*?)\*/g, '<span style="font-weight: bold">$1</span>')
        .replace(/\[link ([^\s]+) (.*?)\]/g, '<a href="$1">$2</a>') || "";
    setDesc(newDesc);
  }, []);
// console.log(`http://www.youtube.com/embed/${youtubeId}?wmode=opaque&modestbranding=1&rel=0&showinfo=0&width=1466&iv_load_policy=3&autoplay=1&loop=0&playsinline=0&controls=1&enablejsapi=1&origin=https%3A%2F%2Fwww.chefsteps.com&widgetid=1`)
  return (
    <div className={classes.wrapper}>
      <div className={classes.backArrow}>
        <Button className={classes.backButton} component="a" href="/recipes">
          <ArrowLeft size={32} color={arrowColor} />
        </Button>
      </div>
      <div
        className={classes.header}
        style={{ backgroundImage: `url(${heroImage || image})` }}
      >
        <div className={classes.overlay} />
        <div className={cx(classes.modal, { [classes.hideModal]: !modal })}>
          <Button
            className={classes.closeButton}
            onClick={() => setModal(false)}
          >
            <XCircle size={40} color="white" />
          </Button>
          <div className={classes.video}>
            <iframe
              className={classes.iframe}
              src={`https://www.youtube.com/embed/${youtubeId}?wmode=opaque&modestbranding=1&rel=0&showinfo=0&width=1466&iv_load_policy=3&autoplay=1&loop=0&playsinline=0&controls=1&enablejsapi=1&origin=https%3A%2F%2Fwww.chefsteps.com&widgetid=1`}
              frameBorder="0"
            />
          </div>
        </div>
        <Ingredient id={ingredient} onClose={() => setIngredient(null)} />
        <div className={classes.description}>
          {(youtubeId || vimeoId) && (
            <button
              className={classes.playButton}
              onClick={() => setModal(true)}
            >
              <Play
                style={{ marginLeft: 4 }}
                size={32}
                color="#3D3935"
                fill="#3D3935"
              />
            </button>
          )}
          <Title order={1} className={classes.title}>
            {title}
          </Title>
          <Text className={classes.timing}>{timing}</Text>
        </div>
      </div>
      {description ? (
        <Wrapper backgroundColor="white" selection>
          <div className={classes.centerContent}>
            {desc.split("\n\n").map((item, i) => (
              <p
                className={classes.text}
                key={i}
                dangerouslySetInnerHTML={{ __html: item }}
              />
            ))}
          </div>
        </Wrapper>
      ) : (
        <div />
      )}
      {ingredients?.length > 0 && (
        <Wrapper backgroundColor="#edecea">
          <Ingredients
            className={null}
            ingredients={ingredients}
            equipment={equipment}
            recipeYield={recipeYield}
            openModal={openModal}
            timing={timing}
          />
        </Wrapper>
      )}

      {steps.map((item, i) => (
        <Wrapper key={i} className={i > 0 ? classes.noTop : ""}>
          <Step className={null} {...item} />
        </Wrapper>
      ))}
    </div>
  );
}
