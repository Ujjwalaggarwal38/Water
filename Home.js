import {useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,Linking,FlatList
} from 'react-native';

const waterSavingVideos = [
  { id: 'mybPjAnjQiU', title: 'Tips On Conserving Water', url: 'https://www.youtube.com/watch?v=mybPjAnjQiU' },
  { id: 'nTcFXJT0Fsc', title: 'Water Saving Tips and Tricks', url: 'https://www.youtube.com/watch?v=nTcFXJT0Fsc'},
  { id: '5J3cw4biWWo', title: 'Top 10 water saving tips', url: 'https://www.youtube.com/watch?v=5J3cw4biWWo' },
  { id: 'GVmBWQ7Zrzk', title: '5 Easy Ways To Save Rainwater This Monsoon', url: 'https://www.youtube.com/watch?v=GVmBWQ7Zrzk' },
  { id: 'nLB8A--QdHc', title: '3 thoughtful ways to conserve water', url: 'https://www.youtube.com/watch?v=nLB8A--QdHc' },
];
const openLink = (url) => {
  Linking.openURL(url).catch(() => {
    alert('Failed to open link.');
  });
};




const DashboardScreen = ({navigation}) => {

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => openLink(item.url)}>
      <Image
        source={{ uri: `https://img.youtube.com/vi/${item.id}/hqdefault.jpg` }}
        style={styles.thumbnail}
      />
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  );

  const [waterUsage, setWaterUsage] = useState(120);
  const [goalProgress, setGoalProgress] = useState(0.75);
  const route = useRoute();
  const {totalUsage} = route.params || {totalUsage: 0};

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.greeting}>Hello, User!</Text>
        <Text style={styles.subtext}>
          Here’s your water-saving journey so far:
        </Text>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Daily');
          }}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Today's Water Usage</Text>
            <Text style={styles.waterUsage}>{totalUsage} Liters</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Weekly Conservation Progress</Text>
          <View style={styles.progressBar}>
            {/* <View style={[styles.progressFill, { width: ${goalProgress * 100}% }]} /> */}
          </View>
          <Text style={styles.progressText}>
            {Math.floor(goalProgress * 100)}% of your weekly goal achieved!
          </Text>
        </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => console.log('Scan Crop clicked')}>
            <Text style={styles.actionText1}>Scan Crop</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('Calculator')}>
            <Text style={styles.actionText}>Water Footprint Calculator</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('Leaderboard')}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Your Leaderboard Rank</Text>
            <Text style={styles.rankText}>#5 in your community!</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Water Saving Tips</Text>
          <FlatList
        data={waterSavingVideos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        nestedScrollEnabled={true}
      />
      <TouchableOpacity onPress={() =>Linking.openURL('https://www.youtube.com/results?search_query=water+saving+tips')}>
        <Text style={styles.more}>More{' >>'}</Text>
      </TouchableOpacity>
        </View>
      </ScrollView>

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 20,
  },
  scrollView: {
    flexGrow: 1,
    paddingBottom: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 20,
    marginTop: 10,
  },
  more:{
    textAlign:'center',
    color:'#2E9BCA'
  },
  logo: {
    marginTop: 4,
    width: 60,
    height: 50,
    resizeMode: 'contain',
  },
  image: {
    width: 50,
    height: 40,
    resizeMode: 'contain',
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'center',
  },
  subtext: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    width: '90%',
    padding: 20,
    marginVertical: 10,
    borderRadius: 15,
    elevation: 3,
    alignSelf: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  waterUsage: {
    fontSize: 24,
    color: '#2196F3',
  },
  progressBar: {
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
  },
  progressText: {
    marginTop: 10,
    fontSize: 14,
    color: '#757575',
    textAlign: 'center',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
    marginVertical: 10,
    alignSelf: 'center',
  },
  actionButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  actionText: {
    color: '#fff',
    fontSize: 16,
  },
  actionText1: {
    color: '#fff',
    fontSize: 16,
    paddingTop: 10,
  },
  rankText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#FF9800',
  },
  activityText: {
    fontSize: 14,
    color: '#555',
  },
  list: { paddingBottom: 20 },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 8,
    backgroundColor: '#e0f7fa',
    borderRadius: 10,
  },
  thumbnail: { width: 80, height: 60, marginRight: 10, borderRadius: 5 },
  title: { fontSize: 16, flex: 1, color: '#00796b' },
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

export default DashboardScreen;
