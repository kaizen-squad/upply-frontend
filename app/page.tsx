import Task from "@/components/tasks/Task";
import Sidebar from "@/components/ui/Sidebar/Sidebar";
import type { TaskProps} from "@/types";

export default function Home() {
  const task: TaskProps = {
    status: 'OUVERTE',
    title: 'Correction de bug Laravel',
    description:'Optimisation de la base de données, et resolution des fuites de données sur le serveur Axiore.',
    budget: 450,
    deadline:'12 Avr 2026',
    id: '1',
    client_id:'2',
    prestataire_id: null
  }
  return <Task {...task}/>
}
