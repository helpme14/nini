import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export default function Section({ children }: Props) {
  return (
    <section className="relative min-h-screen px-6 py-28 md:px-20 flex items-center z-10">
      <div className="mx-auto w-full max-w-6xl">
        {children}
      </div>
    </section>
  )
}