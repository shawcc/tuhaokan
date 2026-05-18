import type { ReactNode } from 'react'

interface SidebarSectionProps {
  eyebrow: string
  title: string
  description?: string
  action?: ReactNode
  children: ReactNode
}

export function SidebarSection({
  eyebrow,
  title,
  description,
  action,
  children,
}: SidebarSectionProps) {
  return (
    <section className="sidebar-section">
      <div className="sidebar-section__header">
        <div>
          <span className="section-eyebrow">{eyebrow}</span>
          <h2>{title}</h2>
          {description ? <p>{description}</p> : null}
        </div>
        {action}
      </div>
      {children}
    </section>
  )
}
