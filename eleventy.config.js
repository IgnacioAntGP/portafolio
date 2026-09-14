module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/proyectos/**/*.js");
  eleventyConfig.addPassthroughCopy("src/proyectos/**/*.css");

  return {
    pathPrefix: "/portafolio/",
    dir: {
      input: "src",
      output: "dist",
      includes: "templates"
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};