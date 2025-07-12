// Required dependency:
// npm install react-native-vector-icons
// npx react-native link react-native-vector-icons

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const sampleRoutes = [
  {
    id: 1,
    name: 'North District - Morning',
    driver: 'John Smith',
    vehicle: 'Truck #101',
    status: 'active',
    stops: 8,
    completed: 3,
    distance: '45.2 km',
    estimatedTime: '3h 15m',
    actualTime: '1h 30m',
    efficiency: 92,
    startTime: '08:00',
    endTime: '11:15',
    lastUpdate: '2 min ago'
  },
  {
    id: 2,
    name: 'South District - Express',
    driver: 'Sarah Johnson',
    vehicle: 'Van #205',
    status: 'delayed',
    stops: 12,
    completed: 7,
    distance: '62.8 km',
    estimatedTime: '4h 30m',
    actualTime: '3h 45m',
    efficiency: 78,
    startTime: '09:00',
    endTime: '13:30',
    lastUpdate: '5 min ago'
  },
  {
    id: 3,
    name: 'Central Hub - Priority',
    driver: 'Mike Davis',
    vehicle: 'Truck #103',
    status: 'completed',
    stops: 6,
    completed: 6,
    distance: '28.5 km',
    estimatedTime: '2h 45m',
    actualTime: '2h 30m',
    efficiency: 95,
    startTime: '07:30',
    endTime: '10:00',
    lastUpdate: '1 hour ago'
  }
];

const RouteOptimizerScreen = () => {
  const [search, setSearch] = useState('');
  const [routes, setRoutes] = useState(sampleRoutes);

  const filteredRoutes = routes.filter(route => {
    return (
      route.name.toLowerCase().includes(search.toLowerCase()) ||
      route.driver.toLowerCase().includes(search.toLowerCase()) ||
      route.vehicle.toLowerCase().includes(search.toLowerCase())
    );
  });

  const getStatusStyle = (status) => {
    switch (status) {
      case 'active': return styles.statusActive;
      case 'delayed': return styles.statusDelayed;
      case 'completed': return styles.statusCompleted;
      default: return styles.statusDefault;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>📍 Route Optimizer</Text>
      </View>

      <View style={styles.searchBox}>
        <Icon name="search" size={18} color="#64748b" style={styles.searchIcon} />
        <TextInput
          placeholder="Search routes, drivers, or vehicles..."
          style={styles.input}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <FlatList
        data={filteredRoutes}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={[styles.statusTag, getStatusStyle(item.status)]}>{item.status.toUpperCase()}</Text>
            </View>
            <Text style={styles.cardSub}>👤 {item.driver} | 🚚 {item.vehicle}</Text>
            <Text style={styles.cardSub}>📍 Stops: {item.stops} | ✅ Done: {item.completed}</Text>
            <Text style={styles.cardSub}>🕒 {item.startTime} - {item.endTime} ({item.lastUpdate})</Text>
            <Text style={styles.cardSub}>🧭 Distance: {item.distance}</Text>
            <Text style={styles.cardSub}>⏱️ Actual: {item.actualTime} / Est: {item.estimatedTime}</Text>

            <View style={styles.progressBarBackground}>
              <View style={[styles.progressBarFill, { width: `${(item.completed / item.stops) * 100}%` }]} />
            </View>
            <Text style={styles.efficiencyText}>Efficiency: {item.efficiency}%</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#e2e8f0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0f172a',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 14,
    color: '#0f172a',
  },
  listContent: {
    padding: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
  },
  statusTag: {
    fontSize: 11,
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 12,
    fontWeight: '600',
    overflow: 'hidden',
  },
  statusActive: {
    backgroundColor: '#d1fae5',
    color: '#065f46',
  },
  statusDelayed: {
    backgroundColor: '#fef9c3',
    color: '#92400e',
  },
  statusCompleted: {
    backgroundColor: '#bbf7d0',
    color: '#166534',
  },
  statusDefault: {
    backgroundColor: '#e2e8f0',
    color: '#334155',
  },
  cardSub: {
    fontSize: 12,
    color: '#475569',
    marginBottom: 2,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: '#e2e8f0',
    borderRadius: 4,
    marginVertical: 6,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: 8,
    backgroundColor: '#3b82f6',
  },
  efficiencyText: {
    fontSize: 12,
    color: '#0f172a',
    textAlign: 'right',
  },
});

export default RouteOptimizerScreen;
