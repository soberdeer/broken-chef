import React from "react";
import fetchRecipe from "../../fetchers/fetchRecipe";
import Recipe from "../../components/Recipe/Recipe";
import { normalizeText } from "../../utils/normalize-text";

export default function RecipeContainer({ data }) {
  return <Recipe {...data} />;
}

export async function getServerSideProps(context) {
  const { slug } = context.query;

  const data = await fetchRecipe(slug).then((response) => response.json());

  return {
    props: {
      data: {
        ...data,
        description: normalizeText(data.description),
        steps: data.steps?.map((step) => ({
          ...step,
          directions: normalizeText(step.directions),
        })),
      },
    },
  };
}
