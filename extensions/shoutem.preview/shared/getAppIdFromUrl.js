export function getAppIdFromUrl(url) {
  const matches = url.match(/preview:\/\/open-app\/([0-9]*)/);
  let appId;
  if (matches.length) {
    appId = matches[1];
  }
  return appId;
}
