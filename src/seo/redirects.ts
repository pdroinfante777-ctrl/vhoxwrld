export function legacyRedirect(pathname: string): string | null {
  if (/^\/(?:collections|product)\/(?:bat|rose|void)\/?$/i.test(pathname)) return '/collections/'
  const match = pathname.match(/^\/product\/(signal-core-tee|night-bloom-tee|crystal-signal-tee)\/?$/i)
  return match ? `/collections/${match[1].toLowerCase()}/` : null
}
