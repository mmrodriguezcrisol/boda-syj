'use client'

interface EventMapProps {
  query: string
  venue: string
}

export function EventMap({ query, venue }: EventMapProps) {
  const src = `https://www.google.com/maps?q=${encodeURIComponent(query)}&z=16&output=embed`
  return (
    <iframe
      src={src}
      title={`Mapa: ${venue}`}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      style={{ border: 0, width: '100%', height: '100%' }}
      className="rounded-t-3xl"
    />
  )
}
