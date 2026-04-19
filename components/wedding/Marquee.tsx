'use client'

export function Marquee() {
  const items = ['❧', '✿', '❧', '✿', '❧', '✿', '❧', '✿']
  
  return (
    <div className="relative py-6 bg-[#8A9A7C]/10 overflow-hidden">
      <div className="animate-marquee whitespace-nowrap flex">
        {[...items, ...items].map((item, index) => (
          <span
            key={index}
            className="mx-8 text-2xl text-[#8A9A7C]/60"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
