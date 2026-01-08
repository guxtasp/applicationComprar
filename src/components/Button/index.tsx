import { TouchableOpacity, Text, TouchableOpacityProps } from "react-native"
// Permite um feedback visual ao tocar no botão
import { styles } from "./style"

type Props = TouchableOpacityProps &{  // Extende as propriedades de TouchableOpacityProps, o 
// Type Props agora tem todas as propriedades de TouchableOpacityProps
    title: string 
}
// ...rest, serve para extrair tudo o que não foi extraido explicitamente como title
export function Button({title, ...rest }:Props) {
    return(
        <TouchableOpacity style={styles.container} activeOpacity={0.8} {...rest}>
            {/* TouchableOpacity - Componente que pode ser pressionado, geralmente usado para botões */}
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    )
}