
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const driverData = [
  {
    id: 'DR-2024-001',
    name: 'Michael Chen',
    status: 'active',
    hours: '6.5h',
    trips: 12,
    rating: '4.8★',
    location: 'Downtown'
  },
  {
    id: 'DR-2024-002',
    name: 'Sarah Johnson',
    status: 'delay',
    hours: '4.2h',
    trips: 8,
    rating: '4.6★',
    location: 'Midtown'
  },
  {
    id: 'DR-2024-003',
    name: 'David Rodriguez',
    status: 'alert',
    hours: '2.1h',
    trips: 3,
    rating: '4.3★',
    location: 'Airport'
  },
  {
    id: 'DR-2024-004',
    name: 'Emma Wilson',
    status: 'offline',
    hours: '0h',
    trips: 0,
    rating: '4.9★',
    location: '2h ago'
  }
];

const statusColors = {
  active: '#16a34a',
  delay: '#f59e0b',
  alert: '#dc2626',
  offline: '#64748b'
};

const DriverManagement = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredDrivers = driverData.filter(driver =>
    selectedFilter === 'all' ? true : driver.status === selectedFilter
  );

  const getStatusStyle = (status) => ({
    backgroundColor: `${statusColors[status]}20`,
    color: statusColors[status],
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    fontSize: 12,
    fontWeight: '500',
    alignSelf: 'flex-start'
  });

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Driver Management</Text>
          <Text style={styles.subtitle}>Real-time driver status and performance</Text>
        </View>

        <View style={styles.statsRow}>
          {['active', 'offline', 'delay', 'alert'].map(stat => {
            const count = driverData.filter(d => d.status === stat).length;
            return (
              <View key={stat} style={styles.statCard}>
                <Text style={[styles.statNumber, { color: statusColors[stat] }]}>{count}</Text>
                <Text style={styles.statLabel}>{stat.charAt(0).toUpperCase() + stat.slice(1)}</Text>
              </View>
            );
          })}
        </View>

        <View style={styles.filterRow}>
          {['all', 'active', 'offline', 'delay', 'alert'].map(filter => (
            <TouchableOpacity
              key={filter}
              onPress={() => setSelectedFilter(filter)}
              style={[
                styles.filterBtn,
                selectedFilter === filter && styles.filterBtnActive
              ]}
            >
              <Text style={selectedFilter === filter ? styles.filterTextActive : styles.filterText}>
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {filteredDrivers.map(driver => (
          <View key={driver.id} style={styles.driverCard}>
            <View style={styles.driverHeader}>
              <View style={styles.driverInfo}>
                <Text style={styles.driverName}>{driver.name}</Text>
                <Text style={styles.driverId}>ID: {driver.id}</Text>
                <Text style={getStatusStyle(driver.status)}>
                  {driver.status.toUpperCase()}
                </Text>
              </View>
            </View>
            <View style={styles.driverDetails}>
              <Text style={styles.detail}>Hours: {driver.hours}</Text>
              <Text style={styles.detail}>Trips: {driver.trips}</Text>
              <Text style={styles.detail}>Rating: {driver.rating}</Text>
              <Text style={styles.detail}>Location: {driver.location}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.fab}>
        <Icon name="plus" size={24} color="#fff" />
      </View>

      <View style={styles.bottomNav}>
        {['users', 'alert-circle', 'bar-chart-2', 'settings'].map((icon, idx) => (
          <TouchableOpacity key={icon} style={styles.navItem}>
            <Icon name={icon} size={20} color={idx === 0 ? '#1e293b' : '#64748b'} />
            <Text style={[styles.navLabel, idx === 0 && { color: '#1e293b', fontWeight: '500' }]}>
              {['Drivers', 'Alerts', 'Reports', 'Settings'][idx]}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  header: { padding: 20, borderBottomWidth: 1, borderColor: '#e2e8f0' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1e293b' },
  subtitle: { fontSize: 14, color: '#64748b', marginTop: 4 },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16
  },
  statCard: {
    backgroundColor: '#ffffff',
    borderColor: '#e2e8f0',
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4
  },
  statNumber: { fontSize: 22, fontWeight: '700' },
  statLabel: { fontSize: 12, color: '#64748b', marginTop: 4 },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    paddingBottom: 16
  },
  filterBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#e2e8f0',
    marginRight: 8,
    marginBottom: 8
  },
  filterBtnActive: { backgroundColor: '#1e293b' },
  filterText: { color: '#334155' },
  filterTextActive: { color: '#fff', fontWeight: 'bold' },
  driverCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    borderColor: '#e2e8f0',
    borderWidth: 1
  },
  driverHeader: { flexDirection: 'row', marginBottom: 12 },
  driverInfo: { flex: 1 },
  driverName: { fontSize: 18, fontWeight: '600', color: '#1e293b' },
  driverId: { fontSize: 14, color: '#64748b', marginBottom: 6 },
  driverDetails: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  detail: { fontSize: 14, color: '#334155', width: '48%', marginTop: 4 },
  fab: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    backgroundColor: '#16a34a',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: '#e2e8f0',
    backgroundColor: '#ffffff'
  },
  navItem: { alignItems: 'center' },
  navLabel: { fontSize: 12, color: '#64748b', marginTop: 4 }
});

export default DriverManagement;
