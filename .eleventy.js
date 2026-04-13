module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "assets": "/" });
  eleventyConfig.addPassthroughCopy("CNAME");

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
