import { Globe2, LayoutGrid, LockKeyhole, Share2, Shield, ShieldCheck } from "lucide-react"
import Link from "next/link"

export type LinkItem = { title: string; href: string };

const Footer = () => {
  const links: { PLATEFORME: LinkItem[], SUPPORT: LinkItem[], LEGAL: LinkItem[] } = {
    PLATEFORME: [
      { title: 'Trouver une mission', href: '' },
      { title: 'Publier une tâche', href: '' },
      { title: 'Comment ça marche', href: '' },
      { title: 'Explorer une tâche', href: '' }
    ],
    SUPPORT: [
      { title: "Centre d'aide", href: '' },
      { title: 'Sécurité & Escrow', href: '' },
      { title: 'Rémunération', href: '' },
      { title: 'Contact', href: '' }
    ],
    LEGAL: [
      { title: 'Conditions légales', href: '' },
      { title: 'Confidentialité', href: '' },
      { title: 'API Docs', href: '' },
      { title: 'Termes & Services', href: '' }
    ]
  }

  return (
    <footer className='text-white-solid pt-15'>
      {/* Section principale avec liens */}
      <div className="w-[90%] mx-auto">
        {/* Version Desktop (lg et plus) */}
        <div className="hidden lg:grid grid-cols-[auto_auto_auto_auto] lg:gap-25 text-[0.95rem]">
          <div className="w-max">
            <p className="w-[260px] text-scarpa-flow-gray-34">
              La micro-mission en toute sécurité. Editorial Precision for the Digital Ledger.
            </p>
            <div className="flex items-center gap-3 my-5">
              <Share2 width={22} strokeWidth={2} />
              <Globe2 width={22} strokeWidth={2} />
              <LayoutGrid width={22} strokeWidth={2} />
            </div>
          </div>

          {Object.entries(links).map(([key, item]) => (
            <ul key={key}>
              <h2 className="mb-3 font-semibold">{key}</h2>
              <div>
                {item.map(({ title, href }) => (
                  <li key={title} className="py-3 text-scarpa-flow-gray-34">
                    <Link href={href} className="hover:underline">{title}</Link>
                  </li>
                ))}
              </div>
            </ul>
          ))}
        </div>

        {/* Version Mobile/Tablette (en dessous de lg) */}
        <div className="lg:hidden">
          {/* Description et icônes sociales */}
          <div className="text-center mb-8">
            <p className="text-scarpa-flow-gray-34 max-w-md mx-auto">
              La micro-mission en toute sécurité. Editorial Precision for the Digital Ledger.
            </p>
            <div className="flex items-center justify-center gap-6 my-6">
              <Share2 width={22} strokeWidth={2} />
              <Globe2 width={22} strokeWidth={2} />
              <LayoutGrid width={22} strokeWidth={2} />
            </div>
          </div>

          {/* Grille responsive des liens */}
          <div className="grid grid-cols-1 mt-15 md:grid-cols-3 gap-8 text-center sm:text-left">
            {Object.entries(links).map(([key, item]) => (
              <ul key={key} className="space-y-2 w-max mx-auto">
                <h2 className="mb-3 font-semibold text-lg">{key}</h2>
                {item.map(({ title, href }) => (
                  <li key={title} className="py-2 text-scarpa-flow-gray-34">
                    <Link href={href} className="hover:underline text-md">
                      {title}
                    </Link>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>

      {/* Barre inférieure */}
      <div className="flex flex-col md:flex-row items-baseline justify-between gap-4 px-6 md:px-10 py-6 md:py-8 bg-woodsmoke-gray-8 mt-10">
        {/* Copyright */}
        <p className="text-scarpa-flow-gray-34 text-sm max-w-[50%] text-center md:text-left order-2 md:order-1">
          © 2026 Upply - Projet Académique. Editorial Precision for the Digital Ledger.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5 order-1 md:order-2">
          <p className="text-scarpa-flow-gray-34 text-sm">SYSTÈME OPÉRATIONNEL</p>
          <div className="flex items-center gap-4">
            <LockKeyhole width={19} />
            <Shield width={19} />
            <ShieldCheck width={19} />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer