import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert, TouchableOpacity } from 'react-native';

const DailyUsageTrackerScreen = ({navigation}) => {
  const [usage, setUsage] = useState(''); // Input for water usage
  const [history, setHistory] = useState([]); // Array to store usage history
  const [totalUsage, setTotalUsage] = useState(0); // Total water used

  const addUsage = () => {
    const usageValue = parseInt(usage);

    if (isNaN(usageValue) || usageValue <= 0) {
      Alert.alert('Invalid Input', 'Please enter a positive number.');
      return;
    }

    setHistory([...history, { id: Date.now().toString(), value: usageValue }]);
    setTotalUsage(totalUsage + usageValue);
    setUsage('');
  };

  const renderItem = ({ item }) => (
    <View style={styles.historyItem}>
      <Text style={styles.historyText}>{item.value} Liters</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daily Water Usage Tracker</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter water usage (in liters)"
        value={usage}
        onChangeText={setUsage}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.addButton} onPress={addUsage}>
        <Text style={styles.addButtonText}>Add Usage</Text>
      </TouchableOpacity>

      <Text style={styles.totalUsageText}>Total Usage: {totalUsage} Liters</Text>

      <FlatList
        data={history}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.emptyText}>No usage recorded yet.</Text>}
      />

<View style={styles.footer}>
  <TouchableOpacity onPress={() => navigation.navigate('Home',{totalUsage})}>
    <Text style={styles.footerText}>Home</Text>
  </TouchableOpacity>

  <TouchableOpacity onPress={() => console.log('Rewards clicked')}>
    <Text style={styles.footerText}>Rewards</Text>
  </TouchableOpacity>

  <TouchableOpacity onPress={() => console.log('Community clicked')}>
    <Text style={styles.footerText}>Community</Text>
  </TouchableOpacity>

  <TouchableOpacity onPress={() => console.log('Settings clicked')}>
    <Text style={styles.footerText}>Settings</Text>
  </TouchableOpacity>
</View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E8F6F3',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#4CAF50',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  totalUsageText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
    color: '#2196F3',
  },
  historyItem: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  historyText: {
    fontSize: 16,
    color: '#555',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#757575',
    marginTop: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    borderRadius:50,
  },
  footerText: {
    fontSize: 16,
    color: '#4CAF50',
  },
});

export default DailyUsageTrackerScreen;
