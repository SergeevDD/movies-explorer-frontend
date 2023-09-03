export function renderFooter(route) {
  const coordinated = [
    '/',
    '/movies',
    '/saved-movies',
  ]
  return coordinated.includes(route.pathname);
}

export function renderHeader(route) {
  const coordinated = [
    '/',
    '/movies',
    '/saved-movies',
    '/profile',
  ]
  return coordinated.includes(route.pathname);
}
