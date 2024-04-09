import Showdown from "showdown";

const converter = new Showdown.Converter();

export const markdownToHtml = (markdown) => {
  return converter.makeHtml(markdown);
};
