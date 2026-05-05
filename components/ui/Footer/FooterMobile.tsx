'use client'
import { useState } from 'react'
import { LinkItem } from './Footer'
import Link from 'next/link'
import { ChevronUp, Globe2, LayoutGrid, Share2 } from 'lucide-react'

const FooterMobile = () => {
    const links: { PLATEFORME: LinkItem[], SUPPORT: LinkItem[], LEGAL: LinkItem[] } = {
        PLATEFORME: [
            { title: 'Trouver une mission', href: '' },
            { title: 'Publier une tâche', href: '' },
            { title: 'Comment ça marche', href: '' },
        ],
        SUPPORT: [
            { title: "Centre d'aide", href: '' },
            { title: 'Sécurité & Escrow', href: '' },
            { title: 'Contact', href: '' }
        ],
        LEGAL: [
            { title: 'Conditions légales', href: '' },
            { title: 'Confidentialité', href: '' },
        ]
    }

    const [openSections, setOpenSections] = useState<Record<string, boolean>>(() => {
        const initialState: Record<string, boolean> = {};
        Object.keys(links).forEach(key => {
            initialState[key] = false;
        });
        return initialState;
    });

    const toggleSection = (sectionKey: string) => {
        setOpenSections(prev => ({
            ...prev,
            [sectionKey]: !prev[sectionKey]
        }));
    };

    return (
        <footer className='text-white-solid p-10'>
            <div className='w-max m-auto mb-7'>
                <p className='text-center'>La micro-mission en toute sécurité.</p>
            </div>
            
            <div className='mt-15'>
                {Object.entries(links).map(([key, items]) => (
                    <div key={key} className="mb-4">
                        <div className='flex items-center justify-between'>
                            <h2 className="my-3 font-semibold">{key}</h2>
                            <button
                                onClick={() => toggleSection(key)}
                                className="cursor-pointer p-1 transition-transform duration-300"
                                aria-label={`Toggle ${key} menu`}
                            >
                                <ChevronUp 
                                    width={19} 
                                    stroke='var(--scarpa-flow-gray-34)'
                                    className={`transition-transform duration-300 ${openSections[key] ? 'rotate-180' : ''}`}
                                />
                            </button>
                        </div>
                        
                        <div
                            className={`transition-all duration-300 ease-in-out overflow-hidden
                                ${openSections[key] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                        >
                            <ul className="mt-2">
                                {items.map(({ title, href }) => (
                                    <li key={title} className="py-1.5 text-scarpa-flow-gray-34">
                                        <Link href={href || '#'} className="hover:underline">
                                            {title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        
                        <hr className="border-scarpa-flow-gray-34 my-4" />
                    </div>
                ))}
            </div>

            <div className='mt-15'>
                <div className='flex gap-8 justify-center items-center my-5'>
                    <button className='p-2 rounded-md border border-scarpa-flow-gray-34 hover:bg-white/10 transition-colors'>
                        <Share2 width={19} />
                    </button>
                    <button className='p-2 rounded-md border border-scarpa-flow-gray-34 hover:bg-white/10 transition-colors'>
                        <Globe2 width={19} />
                    </button>
                    <button className='p-2 rounded-md border border-scarpa-flow-gray-34 hover:bg-white/10 transition-colors'>
                        <LayoutGrid width={19} />
                    </button>
                </div>

                <p className='text-center text-scarpa-flow-gray-34 text-xs'>
                    © 2026 UPPLY - PROJET ACADÉMIQUE.<br />
                    EDITORIAL PRECISION FOR THE DIGITAL<br />
                    LEDGER.
                </p>
            </div>
        </footer>
    )
}

export default FooterMobile