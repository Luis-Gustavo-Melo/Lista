import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity,ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const suggestedItems = [
  { key: '1', name: 'Arroz' },
  { key: '2', name: 'Feijão' },
  { key: '3', name: 'Leite' },
  { key: '4', name: 'Pão' },
  { key: '5', name: 'Manteiga' },
];

export default function App() {
  const [item, setItem] = useState('');
  const [shoppingList, setShoppingList] = useState([]);

  const handleItem = (text) => {
    setItem(text);
  }

  const addItem = () => {
    setShoppingList([...shoppingList, { key: Math.random().toString(), name: item }]);
    setItem('');
  }

  const deleteItem = (id) => {
    const updatedList = shoppingList.filter(item => item.key !== id);
    setShoppingList(updatedList);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minha Lista de Compras</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Adicionar item"
          onChangeText={handleItem}
          value={item}
        />
        <Button
          title="Adicionar"
          onPress={addItem}
        />
      </View>
      <ScrollView style={styles.listContainer}>
      <FlatList
        style={styles.list}
        data={shoppingList}
        renderItem={({item}) =>
          <TouchableOpacity onPress={() => deleteItem(item.key)}>
            <View style={styles.item}>
              <Text style={styles.itemText}>{item.name}</Text>
              <AntDesign name="delete" size={24} color="black" />
            </View>
          </TouchableOpacity>
        }
      />
      <Text style={styles.subtitle}>Compras sugeridas:</Text>
      <FlatList
        style={styles.list}
        data={suggestedItems}
        renderItem={({item}) =>
          <TouchableOpacity onPress={() => setShoppingList([...shoppingList, { key: item.key, name: item.name }])}>
            <View style={styles.item}>
              <Text style={styles.itemText}>{item.name}</Text>
              <AntDesign name="plus" size={24} color="black" />
            </View>
          </TouchableOpacity>
        }
      />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    width: '70%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  list: {
    width: '100%',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    padding:10,
    borderRadius: 5,
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
  },
});
