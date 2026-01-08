import { styles } from "./style"
import { TouchableOpacity, TouchableOpacityProps, Text } from "react-native"
// Importa o tipo FilterStatus do arquivo de tipos
import { FilterStatus } from "@/types/FilterStatus" // Importa o enum FilterStatus do arquivo de tipos
import {CircleCheck} from "lucide-react-native"
import { StatusIcon } from "@/components/StatusIcon"  

type Props = TouchableOpacityProps & {
    status: FilterStatus // Define a propriedade status do tipo FilterStatus
    isActive: boolean // Define a propriedade isActive do tipo boolean
}
export function Filter({status, isActive, ...rest}: Props){
    return(
        // TouchableOpacity - Componente que pode ser pressionado, geralmente usado para botões
        <TouchableOpacity style={[styles.container,{opacity: isActive?1:0.5}]}{...rest} activeOpacity={0.8}>
            <StatusIcon status={status} />
            {/* Exibe o texto com base no valor de status */}
            <Text style = {styles.title}>{status === FilterStatus.DONE?"Comprados":"Pendentes"}</Text> 
        </TouchableOpacity>
    )
}