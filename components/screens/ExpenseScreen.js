import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ฟังก์ชันสำหรับลบรายการ
const removeTransaction = async (item, type) => {
  try {
    const existingData = await AsyncStorage.getItem(type);
    const currentData = existingData ? JSON.parse(existingData) : [];
    const updatedData = currentData.filter(transaction => transaction.title !== item.title || transaction.amount !== item.amount);
    await AsyncStorage.setItem(type, JSON.stringify(updatedData));
  } catch (error) {
    console.error('Error removing data:', error);
  }
};

const ExpenseScreen = ({ expense, setExpense }) => {
  const handleDelete = (item) => {
    removeTransaction(item, 'expense');
    setExpense(prev => prev.filter(transaction => transaction.title !== item.title || transaction.amount !== item.amount));
  };

  return (
    <View style={styles.container}>
      {expense.length === 0 ? (
        <Text>ไม่มีรายจ่าย</Text>
      ) : (
        <FlatList
          data={expense}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.amount}>- ฿{item.amount.toLocaleString()}</Text>
              <TouchableOpacity onPress={() => handleDelete(item)}>
                <Text style={styles.delete}>ลบ</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#f8f8f8',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 18,
  },
  amount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
  },
  delete: {
    color: 'red',
    fontWeight: 'bold',
  },
});

export default ExpenseScreen;
