import { Globe2, LayoutGrid, LockKeyhole, Share2, Shield, ShieldCheck } from "lucide-react"
import Link from "next/link"

export type LinkItem = {title:string, href:string};

const Footer = () => {
  const links: {PLATEFORME: LinkItem[], SUPPORT:LinkItem[], LEGAL:LinkItem[]} = {
    PLATEFORME: [
      {title: 'Trouver une mission', href:''},
      {title: 'Publier une tâche', href:''},
      {title: 'Comment ça marche', href:''},
      {title: 'Explorer une tâche', href:''}
    ],
    SUPPORT: [
      {title: "Centre d'aide", href:''},
      {title:'Sécurité & Escrow', href:''},
      {title:'Rémunération', href:''},
      {title:'Contact', href:''}
    ],
    LEGAL: [
      {title:'Conditions légales', href:''},
      {title:'Confidentialité', href:''},
      {title:'API Docs', href:''},
      {title:'Termes & Services', href:''}
    ]
  }
  return (
    <footer className='text-white-solid pt-15'>
      <div className="flex items-center gap-50 px-30">
          <div className="">
              <p className="w-[260px] text-scarpa-flow-gray-34">La micro-mission en toute securité. Editorial Precision for the Digital Ledger.</p>
              <div className="flex items-center gap-3 my-5">
                  <Share2 width={22} strokeWidth={2} />
                  <Globe2 width={22} strokeWidth={2} />
                  <LayoutGrid width={22} strokeWidth={2} />
              </div>
          </div>

          {
            Object.entries(links).map(([key, item])=> 
            <ul key={key}>
              <h2 className="mb-3 font-semibold">{key}</h2>
              <div>
                {
                  item.map(({title, href})=> 
                  <li key={title} className="py-3 text-scarpa-flow-gray-34">
                    <Link href={href} className="hover:underline">{title}</Link>
                  </li>)
                }
              </div>
          </ul>)
          }
      </div>

      <div className="flex items-center justify-between px-30 py-8 bg-woodsmoke-gray-8 mt-10">
          <p className="text-scarpa-flow-gray-34">© 2026 Upply - Projet Académique. Editorial Precision for the Digital Ledger.</p>
          <div className="flex items-center gap-5">
            <p className="text-scarpa-flow-gray-34">SYSTÈME OPÉRATIONNEL</p>
            <div className="flex items-center gap-3">
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