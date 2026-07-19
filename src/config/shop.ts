const fallbackShopUrl = '#collection'

function resolveShopUrl(value: string | undefined) {
  const candidate = value?.trim()

  if (!candidate) return fallbackShopUrl
  if (candidate.startsWith('#') || candidate.startsWith('/')) return candidate

  try {
    const parsed = new URL(candidate)
    return parsed.protocol === 'https:' || parsed.protocol === 'http:'
      ? parsed.toString()
      : fallbackShopUrl
  } catch {
    return fallbackShopUrl
  }
}

export const shopUrl = resolveShopUrl(import.meta.env.VITE_SHOP_URL)
export const shopIsExternal = shopUrl.startsWith('http')
