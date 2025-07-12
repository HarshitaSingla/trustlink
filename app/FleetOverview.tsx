import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

const fleetData = [
  {
    id: 'TRK-001',
    driver: 'John Smith',
    status: 'active',
    location: 'Route 45, Downtown',
    fuel: 85,
    battery: 92,
    lastUpdate: '2 mins ago',
    todayDeliveries: 12,
    completedDeliveries: 8,
    maintenance: 'good',
    speed: 45,
    eta: '15 mins',
  },
  {
    id: 'TRK-002',
    driver: 'Sarah Johnson',
    status: 'active',
    location: 'Highway 101, North',
    fuel: 67,
    battery: 88,
    lastUpdate: '1 min ago',
    todayDeliveries: 15,
    completedDeliveries: 12,
    maintenance: 'good',
    speed: 55,
    eta: '8 mins',
  },
  {
    id: 'TRK-003',
    driver: 'Mike Wilson',
    status: 'warning',
    location: 'Service Center',
    fuel: 23,
    battery: 45,
    lastUpdate: '5 mins ago',
    todayDeliveries: 8,
    completedDeliveries: 3,
    maintenance: 'due',
    speed: 0,
    eta: 'N/A',
  },
  {
    id: 'TRK-004',
    driver: 'Lisa Chen',
    status: 'active',
    location: 'Industrial Zone',
    fuel: 91,
    battery: 96,
    lastUpdate: '3 mins ago',
    todayDeliveries: 10,
    completedDeliveries: 7,
    maintenance: 'good',
    speed: 35,
    eta: '12 mins',
  },
  {
    id: 'TRK-005',
    driver: 'David Brown',
    status: 'offline',
    location: 'Warehouse Dock 3',
    fuel: 78,
    battery: 0,
    lastUpdate: '45 mins ago',
    todayDeliveries: 14,
    completedDeliveries: 14,
    maintenance: 'good',
    speed: 0,
    eta: 'Completed',
  },
  {
    id: 'TRK-006',
    driver: 'Emma Davis',
    status: 'alert',
    location: 'Emergency Stop - Route 22',
    fuel: 15,
    battery: 78,
    lastUpdate: '1 min ago',
    todayDeliveries: 9,
    completedDeliveries: 4,
    maintenance: 'good',
    speed: 0,
    eta: 'Delayed',
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return styles.statusActive;
    case 'warning': return styles.statusWarning;
    case 'alert': return styles.statusAlert;
    case 'offline': return styles.statusOffline;
    default: return styles.statusOffline;
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'active': return 'check-circle';
    case 'warning': return 'alert-triangle';
    case 'alert': return 'x-circle';
    case 'offline': return 'clock';
    default: return 'clock';
  }
};

const getMaintenanceColor = (status: string) => {
  switch (status) {
    case 'good': return styles.maintenanceGood;
    case 'due': return styles.maintenanceDue;
    case 'overdue': return styles.maintenanceOverdue;
    default: return styles.maintenanceDefault;
  }
};

const FleetOverview = () => {
  const navigation = useNavigation();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFleet = fleetData.filter(vehicle => {
    const matchesFilter = selectedFilter === 'all' || vehicle.status === selectedFilter;
    const matchesSearch =
      vehicle.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.driver.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('WarehouseDashboard')} style={styles.backButton}>
        <Icon name="arrow-left" size={24} color="#000" />
      </TouchableOpacity>

      <Text style={styles.title}>Fleet Overview</Text>
      <Text style={styles.subtitle}>Real-time vehicle monitoring</Text>

      <View style={styles.searchContainer}>
        <Icon name="search" size={18} color="#888" style={styles.searchIcon} />
        <TextInput
          placeholder="Search vehicles or drivers..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.input}
        />
      </View>

      <FlatList
        data={filteredFleet}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.vehicleId}>{item.id}</Text>
              <View style={[styles.statusBadge, getStatusColor(item.status)]}>
                <Icon name={getStatusIcon(item.status)} size={14} color="#fff" />
                <Text style={styles.statusText}>{item.status}</Text>
              </View>
            </View>

            <Text style={styles.driver}>Driver: {item.driver}</Text>
            <Text style={styles.location}>📍 {item.location}</Text>
            <Text style={styles.update}>Last Update: {item.lastUpdate}</Text>

            <Text style={styles.metric}>Fuel: {item.fuel}%</Text>
            <Text style={styles.metric}>Battery: {item.battery}%</Text>
            <Text style={styles.metric}>
              Deliveries: {item.completedDeliveries}/{item.todayDeliveries}
            </Text>
            <Text style={[styles.maintenance, getMaintenanceColor(item.maintenance)]}>
              Maintenance: {item.maintenance}
            </Text>
            <Text style={styles.metric}>Speed: {item.speed} mph</Text>
            <Text style={styles.metric}>ETA: {item.eta}</Text>
          </View>
        )}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f2f2f2' },
  backButton: { marginBottom: 10 },
  title: { fontSize: 24, fontWeight: 'bold' },
  subtitle: { fontSize: 14, color: '#666', marginBottom: 12 },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  searchIcon: { marginRight: 8 },
  input: { flex: 1, height: 40 },
  card: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  vehicleId: { fontWeight: 'bold', fontSize: 16 },
  driver: { marginTop: 4, color: '#333' },
  location: { color: '#333' },
  update: { fontSize: 12, color: '#666' },
  metric: { marginTop: 4 },
  maintenance: { marginTop: 4, fontWeight: 'bold' },

  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: { color: '#fff', marginLeft: 6, textTransform: 'capitalize' },
  statusActive: { backgroundColor: '#34D399' },
  statusWarning: { backgroundColor: '#FBBF24' },
  statusAlert: { backgroundColor: '#EF4444' },
  statusOffline: { backgroundColor: '#9CA3AF' },

  maintenanceGood: { color: '#10B981' },
  maintenanceDue: { color: '#F59E0B' },
  maintenanceOverdue: { color: '#EF4444' },
  maintenanceDefault: { color: '#6B7280' },
});

export default FleetOverview;
