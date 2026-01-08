import { View, Text, Image, TouchableOpacity, FlatList, Alert } from 'react-native'
import { useState, useEffect } from 'react'
import { styles } from './style'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { FilterStatus } from '@/types/FilterStatus'
import { Filter } from '@/components/Filter'
import { Item } from '@/components/Item'
import { itemStorage, itemsStorage } from '@/storage/itemsStorage'

// Define uma constante FILTER_STATUS que é um array contendo os valores do enum FilterStatus
const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE]

export function Home() {
  const [filter, setFilter] = useState(FilterStatus.PENDING)
  // pode ser useState<FilterStatus>() entende que o estado é do tipo FilterStatus
  // useState(FilterStatus.PENDING) inicializa o estado com o valor PENDING do enum FilterStatus, valor inicial
  // Estado para armazenar o filtro atual, inicializado como PENDING
  //filter = valor atual do estado
  //setFilter = função para atualizar o estado
  const [description, setDescription] = useState('')
  const [items, setItems] = useState<itemStorage[]>([])

  async function handleAddItem() {
  if (!description.trim()) {
    Alert.alert(
      "Adicionar",
      "Informe a descrição do item para adicionar."
    )
    return
  }
    const newItem = {
      id: Math.random().toString(36).substring(2),
      description,
      status: FilterStatus.PENDING,
    }
    await itemsStorage.add(newItem)
    await itemsByStatus() // mesmo que o filtro esteja em DONE, após adicionar um item, a lista será atualizada para mostrar o novo item, caso nao tenha e o filtro esteja em PEDING nao renderiza sem o await itemsByStatus()

    setFilter(FilterStatus.PENDING) // Reseta o filtro para PENDING após adicionar um item
    Alert.alert(
      "Adicionar",
      `Adicionado ${description}`
    )
    setDescription('') // Limpa o campo de descrição após adicionar o item, devido o value no Input
  }

  async function itemsByStatus(){
    try{
        const response = await itemsStorage.getByStatus(filter)
        setItems(response)
    }catch(error){
      console.log("GET_ITEMS: " + error)  
      Alert.alert(
        "ERRO ",
        "Não foi possível carregar os itens."
      )
    }
  }

  async function handleRemove(id:string){
    try{
      await itemsStorage.remove(id)// Remove o item com o ID fornecido
      await itemsByStatus() // Atualiza a lista de itens após a remoção
    }catch(error){
      console.log("REMOVE_ITEM: " + error)
      Alert.alert(
        "ERRO ",
        "Não foi possível remover o item."
      )
    }
  }

  function handleClear(){
    Alert.alert(
      "Limpar",
      "Tem certeza que deseja limpar todos os itens?",
      [
        { text: "Não", style: "cancel" },
        { text: "Sim", onPress: () => clearItems() }
          
      ]
    )}

    async function clearItems(){
      try{
        await itemsStorage.clear() // Limpa todos os itens do armazenamento
        setItems([]) // Limpa a lista de itens no estado local após limpar o armazenamento
      }catch(error){
        console.log("CLEAR_ITEMS: " + error)
        Alert.alert(
          "ERRO ",
          "Não foi possível remover todos os itens."
        )
      }
    }
  
  async function handleToggleStatus(id:string){
    try{
      await itemsStorage.toggleStatus(id) // Alterna o status do item com o ID fornecido
      await itemsByStatus() // Atualiza a lista de itens após a alteração do status
    }catch(error){
      console.log("TOGGLE_STATUS: " + error)
      Alert.alert(
        "ERRO ",
        "Não foi possível alterar o status do item."
      )
    }
  }
        

  // userEfect para carregar os itens sempre que o filtro mudar
  // ()  => {} é uma função, [] é a lista de dependências, ou seja, quando o filtro mudar
  useEffect(() => {itemsByStatus()}, [filter])
  // todas vez que a lista de dependencias mudar, a função dentro do useEffect será executada
  return(
    <> 
    {/* Fragment - usaa como referencia para agrupar elementos sem adicionar nós extras na árvore de elementos */}
    <View style={styles.container}>
      <Image source={require('@/assets/logo.png')} style={styles.logo} />
      <View style = {styles.forms}>
        <Input 
        placeholder='O que você precisa comprar?'
        onChangeText={setDescription} // Atualiza o estado description com o valor digitado no Input
        value={description}
        />
        <Button title="Adicionar" onPress={handleAddItem}/>
      </View>
      <View style={styles.content}>
        <View style={styles.headerContent}>
        {
          FILTER_STATUS.map((status)=>(
            <Filter 
            key={status} 
            status={status} 
            isActive={filter === status}
            onPress = {() => setFilter(status)} // Atualiza o estado do filtro quando o componente Filter é pressionado
            />
            // Usa o método map para iterar sobre cada status em FILTER_STATUS e renderiza um 
            // componente Filter para cada um
            // KEY é usado para ajudar o React a identificar quais itens foram alterados, adicionados ou removidos
          ))
        }
        <TouchableOpacity style={styles.clearButton}>
          <Text style={styles.clearText} onPress={handleClear}>Limpar</Text>
        </TouchableOpacity>
        </View>
          <FlatList
            data={items} // Dados a serem renderizados na lista
            keyExtractor={ item => item.id} // Função para extrair uma chave única para cada item
            //  Função que define como cada item deve ser renderizado
            renderItem={({ item }) => (
              <Item
              //Não precisa do key aqui pq o FlatList já usa o keyExtractor
                data={item} // Dados do item a ser exibido
                onStatus={() => handleToggleStatus(item.id)} // Função chamada quando o status do item é alterado
                onRemove={() => handleRemove(item.id)}
              />
            )}
            showsVerticalScrollIndicator={false} // Oculta a barra de rolagem vertical
            ItemSeparatorComponent={()=> <View style={styles.separator}/>}
            contentContainerStyle={styles.listContent} // Adiciona um espaçamento na parte inferior da lista
            ListEmptyComponent={()=>(
              <Text style={styles.emptyText}>Nenhum item encontrado</Text>
            )}
          />
      </View>
    </View>
    </>
  )
}
