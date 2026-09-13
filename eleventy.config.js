import { EleventyRenderPlugin } from "@11ty/eleventy";

export default function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/css");
  //Estilos internos de los proyectos
  eleventyConfig.addPassthroughCopy("src/proyectos/**/*.js");
  eleventyConfig.addPassthroughCopy("src/proyectos/**/*.css");

  return {
    dir: {
      input: "src",        
      output: "dist",
      includes: "templates" // Plantillas .html
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};