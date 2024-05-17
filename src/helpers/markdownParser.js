import Showdown from 'showdown';
import * as DOMPurify from 'dompurify';

const converter = new Showdown.Converter();

export const markdownToHtml = (markdown) => {
  const conversion = converter.makeHtml(markdown);
  const clean = DOMPurify.sanitize(conversion);
  return clean;
};
