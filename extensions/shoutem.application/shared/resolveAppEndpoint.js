function getAppEndpointBase(appId) {
  return `http://apps.dev.sauros.hr/v1/apps/${appId}/`;
}

export function resolveAppEndpoint(path = '', appId) {
  return `${getAppEndpointBase(appId)}${path}`;
}
