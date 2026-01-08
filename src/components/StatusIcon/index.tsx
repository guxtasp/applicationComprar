import { FilterStatus } from "@/types/FilterStatus" // Importa o enum FilterStatus do arquivo de tipos
import { CircleDashed, CircleCheck } from "lucide-react-native"; 

export function StatusIcon({status}:{status: FilterStatus}) {
    return status === FilterStatus.DONE ? (<CircleCheck size={16} color="#2c46b1" /> ):(<CircleDashed size={16} color="#000000" />);
}