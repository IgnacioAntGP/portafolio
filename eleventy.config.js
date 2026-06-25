import { EleventyRenderPlugin } from "@11ty/eleventy";

export default function(eleventyConfig) {
  // Copiar tus imágenes y estilos directamente a la carpeta final
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/proyectos/wallet/**/*.js");
  eleventyConfig.addPassthroughCopy("src/proyectos/wallet/**/*.css");

  return {
    dir: {
      input: "src",          // Tu carpeta de desarrollo
      output: "dist",        // Tu carpeta de producción final
      includes: "templates"  // Donde buscará tus layouts (relativo a 'src')
    },
    // Forzamos a que use Nunjucks para procesar tus archivos HTML planos
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};