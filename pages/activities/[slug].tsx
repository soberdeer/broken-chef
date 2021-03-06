import React from 'react';
import fetchRecipe from '../../fetchers/fetchRecipe';
import Recipe from '../../components/Recipe/Recipe';

export default function RecipeContainer({ data }) {
  return (
    <Recipe {...data} />
  );
}

export async function getServerSideProps(context) {
  const { slug } = context.query;

  const data = await fetchRecipe(slug).then(response => response.json())

  return {
    props: {
      data
    },
  };
}







