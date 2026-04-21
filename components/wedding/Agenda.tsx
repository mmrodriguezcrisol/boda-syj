'use client'

import { useRef, useMemo } from 'react'
import { motion, useInView } from 'framer-motion'
import dynamic from 'next/dynamic'
import { MapPin, Calendar, Navigation, Clock, Car } from 'lucide-react'

const EventMap = dynamic(() => import('./EventMap').then(mod => mod.EventMap), {
  ssr: false,
  loading: () => (
    <div className="w-full h-48 bg-[#E8E6E0] rounded-3xl animate-pulse flex items-center justify-center">
      <span className="text-[#8A9A7C] text-sm">Cargando mapa...</span>
    </div>
  ),
})

interface Event {
  id: string
  title: string
  date: string
  time: string
  venue: string
  address: string
  mapCoords?: [number, number]
  arrivalNote?: string
  parking?: boolean
  icon: React.ReactNode
}

const events: Event[] = [
  {
    id: 'civil',
    title: 'Ceremonia Civil',
    date: 'Jueves 21 de Mayo',
    time: '10:50',
    venue: 'Registro Civil de Vicente López',
    address: 'Juan de Garay 3161, Olivos, Buenos Aires',
    arrivalNote: 'Llegar 10 minutos antes',
    icon: <Calendar className="w-5 h-5" />,
  },
  {
    id: 'temple',
    title: 'Sellamiento en el Templo',
    date: 'Jueves 21 de Mayo',
    time: '17:10',
    venue: 'Templo de Buenos Aires',
    address: 'AU Tte. Gral. Pablo Riccheri 4955, B1778 Ciudad Evita, Buenos Aires',
    parking: true,
    icon: <Calendar className="w-5 h-5" />,
  },
  {
    id: 'reception',
    title: 'Recepción de Boda',
    date: 'Viernes 22 de Mayo',
    time: '21:00',
    venue: 'El Plata Tenis Club',
    address: 'Carlos Pellegrini 2665, B1640 Martínez, Buenos Aires',
    icon: <Calendar className="w-5 h-5" />,
  },
]

function generateICS(): string {
  const icsEvents = events.map((event) => {
    const dateStr = event.id === 'reception' ? '20260522' : '20260521'
    const timeStr = event.time.replace(':', '') + '00'
    const endTimeHour = (parseInt(event.time.split(':')[0]) + 2).toString().padStart(2, '0')
    const endTimeStr = endTimeHour + event.time.split(':')[1] + '00'
    
    return `BEGIN:VEVENT
DTSTART;TZID=America/Argentina/Buenos_Aires:${dateStr}T${timeStr}
DTEND;TZID=America/Argentina/Buenos_Aires:${dateStr}T${endTimeStr}
SUMMARY:${event.title} - Boda Simón & Josefina
LOCATION:${event.venue}, ${event.address}
DESCRIPTION:Casamiento de Simón & Josefina
END:VEVENT`
  }).join('\n')

  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Simón & Josefina Wedding//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-TIMEZONE:America/Argentina/Buenos_Aires
${icsEvents}
END:VCALENDAR`
}

function downloadICS() {
  const icsContent = generateICS()
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'boda-simon-josefina.ics'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

function EventCard({ event, index }: { event: Event; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const mapQuery = event.mapCoords
    ? `${event.mapCoords[0]},${event.mapCoords[1]}`
    : `${event.venue}, ${event.address}`
  const googleMapsUrl = useMemo(() => {
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapQuery)}`
  }, [mapQuery])

  return (
    <motion.div
      ref={ref}
      className="bg-white rounded-3xl overflow-hidden shadow-sm border border-[#E8E6E0]"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      {/* Map */}
      <div className="h-48 relative overflow-hidden">
        <EventMap query={mapQuery} venue={event.venue} />
      </div>

      {/* Content */}
      <div className="p-6 md:p-8">
        {/* Event type badge */}
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#8A9A7C]/10 text-[#2D3D2E] rounded-full text-sm font-medium">
            {event.icon}
            {event.date}
          </span>
          {event.parking && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-[#A8533E]/10 text-[#A8533E] rounded-full text-xs">
              <Car className="w-3 h-3" />
              Parking
            </span>
          )}
        </div>

        {/* Title and time */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <h3 className="font-[family-name:var(--font-fraunces)] text-xl md:text-2xl text-[#2D3D2E]">
            {event.title}
          </h3>
          <span className="font-[family-name:var(--font-fraunces)] text-2xl md:text-3xl text-[#A8533E] whitespace-nowrap">
            {event.time}
          </span>
        </div>

        {/* Venue */}
        <p className="font-medium text-[#2D3D2E] mb-1">{event.venue}</p>
        <p className="text-[#5A5A52] text-sm mb-4">{event.address}</p>

        {event.arrivalNote && (
          <div className="mb-6 inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-amber-400 bg-amber-100 text-amber-900 text-sm font-medium">
            <Clock className="w-4 h-4" />
            {event.arrivalNote}
          </div>
        )}

        {/* Action button */}
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#2D3D2E] text-[#F6F4EE] rounded-2xl hover:bg-[#1F1F1A] transition-colors btn-botanical text-sm font-medium"
        >
          <Navigation className="w-4 h-4" />
          Cómo llegar
        </a>
      </div>
    </motion.div>
  )
}

export function Agenda() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="relative py-20 md:py-28 bg-[#F6F4EE] overflow-hidden">
      {/* Decorative botanical */}
      <div className="absolute top-20 right-0 w-72 h-72 opacity-10 pointer-events-none">
        <svg viewBox="0 0 200 200" className="w-full h-full text-[#2D3D2E]">
          <ellipse cx="150" cy="80" rx="60" ry="100" fill="currentColor" transform="rotate(15 150 80)" />
          <ellipse cx="170" cy="140" rx="40" ry="70" fill="currentColor" transform="rotate(30 170 140)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-[family-name:var(--font-cormorant-sc)] text-sm md:text-base tracking-[0.3em] text-[#8A9A7C] uppercase mb-4">
            Agenda
          </h2>
          <p className="font-[family-name:var(--font-fraunces)] text-3xl md:text-4xl text-[#2D3D2E]">
            Nuestros Eventos
          </p>
        </motion.div>

        {/* Event cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
          {events.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} />
          ))}
        </div>

        {/* Add to calendar button */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <button
            onClick={downloadICS}
            className="inline-flex items-center gap-3 px-8 py-4 bg-white border-2 border-[#2D3D2E] text-[#2D3D2E] rounded-2xl hover:bg-[#2D3D2E] hover:text-[#F6F4EE] transition-colors font-medium"
          >
            <Calendar className="w-5 h-5" />
            Agregar todos al calendario
          </button>
        </motion.div>
      </div>
    </section>
  )
}
