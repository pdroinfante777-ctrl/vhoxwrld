const fallbackShopUrl = '#collection'

export function resolveShopUrl(value: string | undefined) {
  const candidate = value?.trim()

  if (!candidate) return fallbackShopUrl
  if (Array.from(candidate).some((char) => char === '\\' || char.charCodeAt(0) < 32 || char.charCodeAt(0) === 127)) return fallbackShopUrl
  if (candidate.startsWith('#') || (candidate.startsWith('/') && !candidate.startsWith('//'))) return candidate

  try {
    const parsed = new URL(candidate)
    return parsed.protocol === 'https:'
      ? parsed.toString()
      : fallbackShopUrl
  } catch {
    return fallbackShopUrl
  }
}

export const shopUrl = resolveShopUrl(import.meta.env.VITE_SHOP_URL)

export function isExternalShopUrl(value: string) {
  return value.startsWith('https://')
}

export const shopIsExternal = isExternalShopUrl(shopUrl)
