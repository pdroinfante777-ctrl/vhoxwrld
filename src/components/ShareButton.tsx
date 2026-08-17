import { useState } from 'react'
import { trackEvent } from '../analytics/ga4'
import { canonicalUrl } from '../seo/metadata'
import { seoCopy } from '../seo/content'
import { useLocale } from '../i18n/useLocale'

type ShareButtonProps = { path: string; title: string; description: string }

async function copyText(value: string) {
  if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(value)
  const textarea = document.createElement('textarea')
  textarea.value = value
  textarea.style.position = 'fixed'
  textarea.style.opacity = '0'
  document.body.append(textarea)
  textarea.select()
  document.execCommand('copy')
  textarea.remove()
}

export function ShareButton({ path, title, description }: ShareButtonProps) {
  const { locale } = useLocale()
  const copy = seoCopy[locale]
  const [message, setMessage] = useState('')
  const url = canonicalUrl(path)

  const share = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title, text: description, url })
        trackEvent('share', { method: 'web_share', content_type: 'page', item_id: path })
        return
      }
      await copyText(url)
      setMessage(copy.shared)
      trackEvent('share', { method: 'clipboard', content_type: 'page', item_id: path })
      window.setTimeout(() => setMessage(''), 2200)
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return
      setMessage(copy.copyLink)
    }
  }

  return (
    <div className="share-control">
      <button type="button" onClick={share} aria-describedby="share-status">
        <span aria-hidden="true">↗</span>{copy.share}
      </button>
      <span id="share-status" className="sr-only" role="status" aria-live="polite">{message}</span>
    </div>
  )
}
