import AsyncStorag from "@react-native-async-storage/async-storage"
import {FilterStatus} from "@/types/FilterStatus"

// Chave usada para armazenar os itens no AsyncStorage
const ITEMS_STORAGE_KEY = "@buy:items"

// Define o tipo itemStorage que representa a estrutura de um item armazenado
export type itemStorage = {
    id:string,
    status: FilterStatus,
    description: string
}

// Função para salvar itens no armazenamento assíncrono, ou seja, salvar a lista de itens
async function get(): Promise<itemStorage[]> {
    try {
        const storage = await AsyncStorag.getItem(ITEMS_STORAGE_KEY)
        return storage ? JSON.parse(storage) : []
        // parse = converter uma string JSON em um objeto JavaScript
        // Se houver dados armazenados, faz o parse do JSON, ou seja, um objeto, e retorna como um array de itemStorage
    }catch (error) {
        throw new Error("ITEMS_GET: " + error)
    }
}

async function getByStatus(status: FilterStatus): Promise<itemStorage[]> {
    // Obtém todos os itens armazenados
    // await = espera a resolução de uma Promise antes de continuar a execução do código
    const items = await get()
    return items.filter((item) => item.status === status)
}
async function save(items: itemStorage[]): Promise<void> {
    try{
        await AsyncStorag.setItem(ITEMS_STORAGE_KEY, JSON.stringify(items))
    }catch(error){
        throw new Error("ITEMS_SAVE: " + error)
}
}

async function add(newItem: itemStorage): Promise<itemStorage[]> {
    try{
        const items = await get()
        const updatedItems = [...items, newItem]
        await save(updatedItems)
        return updatedItems
    }catch(error){
        throw new Error("ITEMS_ADD: " + error)
    }
}

async function remove(id: string): Promise<void> {
    try{
        const items = await get()
        const updatedItems = items.filter((item) => item.id !== id)
        // Qualquer item cujo id não corresponda ao id fornecido será mantido na lista updatedItems
        await save(updatedItems)
    }catch(error){
        throw new Error("ITEMS_REMOVE: " + error)
    }
}

async function clear(): Promise<void> {
    try{
        await AsyncStorag.removeItem(ITEMS_STORAGE_KEY)
    }catch(error){
        throw new Error("ITEMS_CLEAR: " + error)
    }
}
async function toggleStatus(id: string): Promise<void> {
    // Obtém todos os itens armazenados
    const items = await get()

    // Mapeia os itens para atualizar o status do item com o ID fornecido
    const updatedItems = items.map(item => 
    // Se o ID do item não corresponder ao ID fornecido, retorna o item sem alterações
        item.id === id
        ?
        {
        ...item,
        status:
            item.status === FilterStatus.PENDING
            ? FilterStatus.DONE
            : FilterStatus.PENDING,
        }
        : item
    )
    await save(updatedItems)
}

export const itemsStorage = {
    get,
    getByStatus,
    add,
    remove,
    clear,
    toggleStatus
}
