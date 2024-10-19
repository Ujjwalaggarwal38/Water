import {StyleSheet, Text, View, TouchableOpacity,FlatList} from 'react-native';
import React from 'react';

const leaderboardData = [
  {id: '1', name: 'Alice', score: 1500},
  {id: '2', name: 'Bob', score: 1400},
  {id: '3', name: 'Charlie', score: 1350},
  {id: '4', name: 'David', score: 1300},
  {id: '5', name: 'Eva', score: 1250},
];

const Leaderboard = ({navigation}) => {
  const renderItem = ({item, index}) => (
    <View style={styles.itemContainer}>
      <Text style={styles.rank}>{index + 1}</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.score}>{item.score} Points</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leaderboard</Text>
      <FlatList
        data={leaderboardData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<Text style={styles.header}>Rankings</Text>}
        ListFooterComponent={<Text style={styles.footer}>Keep up the great work!</Text>}
      />
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
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

export default Leaderboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 3,
  },
  rank: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 15,
    color: '#4CAF50',
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  score: {
    fontSize: 16,
    color: '#888',
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
    borderRadius: 50,
  },
  footerText: {
    fontSize: 16,
    color: '#4CAF50',
  },
});
