import Button from '../ui/Button/Button';
import { ArrowLeft } from 'lucide-react';

const BackButton = () => {
  return (
    <Button 
        textContent=""
        Icon={ArrowLeft}
        className="p-2 rounded-full  bg-white text-scarpa-flow-gray-34 font-semibold flex items-center justify-center"
        onClick={()=>history.back()}
    />
   )
}

export default BackButton