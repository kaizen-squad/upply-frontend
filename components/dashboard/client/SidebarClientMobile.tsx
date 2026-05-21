'use client'
import SiderbarMobile from '@/components/shared/SidebarMobile';
import { SidebarOngletsProps } from '@/components/shared/SidebarOnglets';
import { Dispatch, FC, SetStateAction } from 'react';

const SidebarClientMobile :FC<{isMobileSidebarOpened: boolean, setIsMobileSidebarOpened:Dispatch<SetStateAction<boolean>>}> = ({isMobileSidebarOpened, setIsMobileSidebarOpened}) => {
    
     const onglets: SidebarOngletsProps['onglets'] = {
        GENERAL: [
            {text: 'Tableau de bord', iconPath: 'LayoutDashboard.svg', redirect:'/client/dashboard'}
        ], 
        'GESTION PROJETS': [
            {text: 'Mes missions', iconPath: 'Mission.svg', redirect:'/client/tasks'},
            // {text: 'Candidatures recues', iconPath: 'Applications.svg', redirect:'/applications'},
            // {text: 'Livrables à valider', iconPath: 'Deliverables.svg', redirect:'/deliverables'},
        ],
        // FINANCES: [
        //     {text: 'Mes facturations', iconPath: 'Billing.svg', redirect:'/billing'},
        // ]
    }


  return <SiderbarMobile isMobileSidebarOpened={isMobileSidebarOpened} setIsMobileSidebarOpened={setIsMobileSidebarOpened} onglets={onglets} />
  
}

export default SidebarClientMobile