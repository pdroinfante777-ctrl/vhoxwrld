import { useEffect } from 'react'
import { canonicalUrl } from '../seo/metadata'

type AnalyticsEvent =
  | 'view_item'
  | 'view_item_list'
  | 'select_item'
  | 'add_to_cart'
  | 'remove_from_cart'
  | 'view_cart'
  | 'begin_checkout'
  | 'purchase'
  | 'sign_up'
  | 'generate_lead'
  | 'share'

type Gtag = (...args: unknown[]) => void

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: Gtag
  }
}

const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim()
const consentGranted = import.meta.env.VITE_GA_ANALYTICS_CONSENT === 'granted'
let initialized = false
let lastPageView = ''
const viewedEntities = new Set<string>()

function isValidMeasurementId(value: string | undefined) {
  return Boolean(value && /^G-[A-Z0-9]+$/i.test(value))
}

export function initializeAnalytics() {
  if (initialized || !consentGranted || !isValidMeasurementId(measurementId)) return false
  initialized = true
  window.dataLayer = window.dataLayer ?? []
  window.gtag = (...args: unknown[]) => window.dataLayer?.push(args)
  window.gtag('js', new Date())
  window.gtag('consent', 'default', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' })
  window.gtag('config', measurementId, { send_page_view: false, allow_google_signals: false })

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId!)}`
  script.dataset.vhoxAnalytics = 'true'
  document.head.append(script)
  return true
}

export function trackPageView(path: string, title: string) {
  if (!initializeAnalytics() || !window.gtag) return
  const pageLocation = canonicalUrl(path)
  if (lastPageView === pageLocation) return
  lastPageView = pageLocation
  window.gtag('event', 'page_view', { page_title: title, page_location: pageLocation, page_path: new URL(pageLocation).pathname })
}

export function trackEvent(name: AnalyticsEvent, parameters: Record<string, unknown> = {}) {
  if (!initializeAnalytics() || !window.gtag) return
  window.gtag('event', name, parameters)
}

export function trackEntityView(key: string, name: Extract<AnalyticsEvent, 'view_item' | 'view_item_list' | 'view_cart'>, parameters: Record<string, unknown>) {
  if (viewedEntities.has(key)) return
  viewedEntities.add(key)
  trackEvent(name, parameters)
}

export function useAnalyticsPage(path: string, title: string) {
  useEffect(() => {
    trackPageView(path, title)
  }, [path, title])
}
