import logo from '@/assets/marca/logo-fluyr-clara.webp'
import { IconeInstagram, IconeMapa, IconeWhatsApp } from '@/components/ui/Icones'
import { Corda } from '@/components/ui/Ornamentos'
import { company, mapsRouteUrl, navItems } from '@/data/site'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import { buildWhatsAppLink } from '@/lib/utils'

export const Footer = () => {
  const { scrollTo } = useSmoothScroll()
  const ano = new Date().getFullYear()

  return (
    <footer className="chapa relative bg-mar-950 pt-16 text-lona-100">
      <div className="container-bordo">
        <Corda className="mb-14 text-latao-500/40" />
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <img src={logo} alt="Fluyr Boats by Voa Menina" width={640} height={381} loading="lazy" className="h-24 w-auto" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-nevoa">
              Estaleiro de flutuantes e pontoons em {company.city}/{company.state}. Barcos feitos à mão, para reunir gente na água.
            </p>
            <p className="etiqueta mt-6 text-latao-400/80">{company.coordinates}</p>
          </div>

          <div>
            <p className="etiqueta text-latao-400">Navegação</p>
            <ul className="mt-5 space-y-2.5">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault()
                      scrollTo(`#${item.id}`)
                    }}
                    className="text-sm text-lona-100/80 transition-colors hover:text-latao-300"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="etiqueta text-latao-400">Contato</p>
            <ul className="mt-5 space-y-4 text-sm">
              <li>
                <a
                  href={buildWhatsAppLink(company.contact.whatsapp, company.whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-lona-100/90 transition-colors hover:text-latao-300"
                >
                  <IconeWhatsApp className="h-4 w-4 text-[#25D366]" /> {company.contact.whatsappDisplay}
                </a>
              </li>
              <li>
                <a
                  href={company.contact.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-lona-100/90 transition-colors hover:text-latao-300"
                >
                  <IconeInstagram className="h-4 w-4 text-latao-300" /> @{company.contact.instagram}
                </a>
              </li>
              <li>
                <a
                  href={mapsRouteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-lona-100/90 transition-colors hover:text-latao-300"
                >
                  <IconeMapa className="mt-0.5 h-4 w-4 shrink-0 text-latao-300" />
                  <span>
                    {company.address.street}
                    <br />
                    {company.address.city}
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-lona-100/10 py-8 text-xs text-nevoa sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {ano} {company.name} {company.signature}. Todos os direitos reservados.
          </p>
          <p className="etiqueta text-[0.62rem] text-nevoa/80">Bons ventos e mar de almirante.</p>
        </div>
      </div>
    </footer>
  )
}
