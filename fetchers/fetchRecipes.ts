export default async function fetcher(page, query) {
  return await fetch(
    process.env.RECIPES_URL,
    {
      method: 'POST',
      headers: {
        Host: 'jgv2odt81s-dsn.algolia.net',
        Origin: 'https://www.chefsteps.com',
        Referer: 'https://www.chefsteps.com/',
      },
      body: JSON.stringify({
        query,
        hitsPerPage: 100,
        page,
        numericFilters: ['chefsteps_generated=1', 'published=1', 'include_in_gallery=1'],
        tagFilters: '',
        facetFilters: [],
        facets: '*',
        advancedSyntax: true,
        attributesToRetrieve: 'objectid,title,url,slug,image,likes_count,description,has_video,activity_type,premium,studio,featured_image_tag',
        attributesToHighlight: '',
        attributesToSnippet: '',
      }),
    },
  );
}
