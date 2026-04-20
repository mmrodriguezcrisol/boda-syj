'use client'

interface EventMapProps {
  query: string
  venue: string
}

export function EventMap({ query, venue }: EventMapProps) {
  const src = `https://maps.google.com/maps?q=${encodeURIComponent(query)}&t=m&z=16&ie=UTF8&iwloc=&output=embed`
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
