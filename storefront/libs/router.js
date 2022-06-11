export function withLocale(locale, path) {
  return "/" + (locale ?? "") + path;
}
