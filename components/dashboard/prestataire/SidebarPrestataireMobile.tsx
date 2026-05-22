'use client'
import SiderbarMobile from '@/components/shared/SidebarMobile';
import { SidebarOngletsProps } from '@/components/shared/SidebarOnglets';
import { Dispatch, FC, SetStateAction } from 'react';

const SidebarPrestataireMobile :FC<{isMobileSidebarOpened: boolean, setIsMobileSidebarOpened:Dispatch<SetStateAction<boolean>>}> = ({isMobileSidebarOpened, setIsMobileSidebarOpened}) => {
    
    const onglets: SidebarOngletsProps['onglets'] = {
        ACCUEIL: [
            {text: 'Tableau de bord', iconPath:'LayoutDashboard.svg', redirect:'/prestataire/dashboard'}
        ],
        OPPORTUNITES: [
            {text: 'Marché des missions', iconPath:'MissionsCenter.svg', redirect:'/prestataire/tasks'},
        ],
        'ACTIVITE & EXECUTION': [
            {text: 'Soumettre Livrable', iconPath:'DeliverablesTruck.svg', redirect:'/prestataire/deliverables'}
        ], 
        FINANCES: [
            {text: 'Mes Facturations', iconPath:'BillingPocket.svg', redirect:'/prestataire/billing'}
        ]
    }


  return <SiderbarMobile isMobileSidebarOpened={isMobileSidebarOpened} setIsMobileSidebarOpened={setIsMobileSidebarOpened} onglets={onglets} />
}

export default SidebarPrestataireMobile;