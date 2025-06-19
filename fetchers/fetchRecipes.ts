export default async function fetcher(page, query) {
  return await fetch(
    process.env.RECIPES_URL ||
      "https://jgv2odt81s-dsn.algolia.net/1/indexes/ChefStepsPromoted_production/query?x-algolia-agent=Algolia%20for%20JavaScript%20(3.33.0)%3B%20Browser&x-algolia-application-id=JGV2ODT81S&x-algolia-api-key=890e558aa5ce0acb553f4d251add31cb",
    {
      method: "POST",
      headers: {
        Host: "jgv2odt81s-dsn.algolia.net",
        Origin: "https://www.chefsteps.com",
        Referer: "https://www.chefsteps.com/",
      },
      body: JSON.stringify({
        query,
        hitsPerPage: 12,
        page,
        numericFilters: [
          "chefsteps_generated=1",
          "published=1",
          "include_in_gallery=1",
        ],
        tagFilters: "",
        facetFilters: [],
        facets: "*",
        advancedSyntax: true,
        attributesToRetrieve:
          "objectid,title,url,slug,image,likes_count,description,has_video,activity_type,premium,studio,featured_image_tag,source",
        attributesToHighlight: "",
        attributesToSnippet: "",
      }),
    },
  );
}
