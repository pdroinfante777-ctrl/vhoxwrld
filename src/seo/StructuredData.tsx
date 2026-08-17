import { useEffect } from 'react'

export type JsonLd = Record<string, unknown>

export function StructuredData({ id, data }: { id: string; data: JsonLd }) {
  useEffect(() => {
    const existing = document.getElementById(id)
    const script = existing instanceof HTMLScriptElement ? existing : document.createElement('script')
    script.id = id
    script.type = 'application/ld+json'
    script.text = JSON.stringify(data).replaceAll('<', '\\u003c')
    if (!existing) document.head.append(script)
    return () => script.remove()
  }, [data, id])

  return null
}
