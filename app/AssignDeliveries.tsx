
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const deliveries = [
  {
    id: 'DEL-001',
    customer: 'TechCorp Industries',
    address: '123 Business Ave, Downtown',
    priority: 'high',
    status: 'unassigned',
    packages: 3,
    weight: '25 kg',
    timeWindow: '09:00 - 12:00',
    date: '2025-07-12',
    estimatedTime: '45 mins',
    specialInstructions: 'Fragile items - handle with care',
    customerPhone: '+1 (555) 123-4567',
    value: '$1,250'
  },
  {
    id: 'DEL-002',
    customer: 'Green Valley Pharmacy',
    address: '456 Health St, Midtown',
    priority: 'urgent',
    status: 'unassigned',
    packages: 1,
    weight: '2 kg',
    timeWindow: '08:00 - 10:00',
    date: '2025-07-12',
    estimatedTime: '20 mins',
    specialInstructions: 'Medical supplies - temperature controlled',
    customerPhone: '+1 (555) 234-5678',
    value: '$450'
  },
  {
    id: 'DEL-003',
    customer: 'City Mall Electronics',
    address: '789 Shopping Blvd, Westside',
    priority: 'medium',
    status: 'unassigned',
    packages: 5,
    weight: '18 kg',
    timeWindow: '13:00 - 17:00',
    date: '2025-07-12',
    estimatedTime: '35 mins',
    specialInstructions: 'Loading dock access required',
    customerPhone: '+1 (555) 345-6789',
    value: '$2,100'
  },
  {
    id: 'DEL-004',
    customer: 'Sunrise Bakery',
    address: '321 Main St, Old Town',
    priority: 'low',
    status: 'assigned',
    packages: 2,
    weight: '8 kg',
    timeWindow: '06:00 - 08:00',
    date: '2025-07-12',
    estimatedTime: '25 mins',
    assignedTo: 'John Smith',
    vehicleId: 'TRK-001',
    specialInstructions: 'Early morning delivery',
    customerPhone: '+1 (555) 456-7890',
    value: '$180'
  }
];

const getStatusColor = (status) => {
  switch (status) {
    case 'assigned': return styles.statusAssigned;
    case 'unassigned': return styles.statusUnassigned;
    default: return styles.statusUnassigned;
  }
};

const getPriorityColor = (priority) => {
  switch (priority) {
    case 'urgent': return styles.priorityUrgent;
    case 'high': return styles.priorityHigh;
    case 'medium': return styles.priorityMedium;
    case 'low': return styles.priorityLow;
    default: return styles.priorityDefault;
  }
};

const AssignDeliveries = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('unassigned');

  const filteredDeliveries = deliveries.filter(d => {
    const matchesSearch = d.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          d.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          d.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = selectedTab === 'all' || d.status === selectedTab;
    return matchesSearch && matchesTab;
  });

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Assign Deliveries</Text>

      {/* Tabs */}
      <View style={styles.tabs}>
        {['unassigned', 'assigned', 'all'].map(tab => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              selectedTab === tab && styles.activeTab
            ]}
            onPress={() => setSelectedTab(tab)}
          >
            <Text style={selectedTab === tab ? styles.activeTabText : styles.tabText}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Search Bar */}
      <View style={styles.searchBox}>
        <Icon name="search" size={18} color="#888" />
        <TextInput
          style={styles.input}
          placeholder="Search deliveries..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Delivery List */}
      <FlatList
        data={filteredDeliveries}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.deliveryId}>{item.id}</Text>
              <View style={[styles.badge, getPriorityColor(item.priority)]}>
                <Text style={styles.badgeText}>{item.priority}</Text>
              </View>
              <View style={[styles.badge, getStatusColor(item.status)]}>
                <Text style={styles.badgeText}>{item.status}</Text>
              </View>
            </View>
            <Text style={styles.customer}>{item.customer}</Text>
            <Text style={styles.address}>📍 {item.address}</Text>
            <Text style={styles.info}>🕒 {item.timeWindow} | 📅 {item.date}</Text>
            <Text style={styles.info}>📦 {item.packages} pkgs • {item.weight}</Text>
            <Text style={styles.info}>⚡ {item.estimatedTime} • 💵 {item.value}</Text>
            {item.assignedTo && (
              <Text style={styles.info}>👤 {item.assignedTo} • 🚚 {item.vehicleId}</Text>
            )}
            {item.specialInstructions && (
              <Text style={styles.instructions}>⚠️ {item.specialInstructions}</Text>
            )}
            <Text style={styles.phone}>📞 {item.customerPhone}</Text>
          </View>
        )}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f2f2f2' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
  tabs: { flexDirection: 'row', marginBottom: 12 },
  tab: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    backgroundColor: '#e5e7eb',
  },
  activeTab: { backgroundColor: '#2563eb' },
  tabText: { color: '#374151' },
  activeTabText: { color: '#fff', fontWeight: 'bold' },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 12,
    height: 40
  },
  input: { flex: 1, marginLeft: 8 },
  card: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    gap: 8
  },
  deliveryId: { fontWeight: 'bold', fontSize: 16 },
  customer: { fontSize: 16, fontWeight: '500' },
  address: { color: '#374151', marginVertical: 2 },
  info: { fontSize: 12, color: '#6b7280' },
  phone: { fontSize: 12, color: '#4b5563', marginTop: 4 },
  instructions: { fontSize: 12, color: '#b45309', marginTop: 4 },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginLeft: 6
  },
  badgeText: {
    fontSize: 10,
    color: '#fff',
    textTransform: 'capitalize'
  },
  statusAssigned: { backgroundColor: '#3b82f6' },
  statusUnassigned: { backgroundColor: '#6b7280' },
  priorityUrgent: { backgroundColor: '#dc2626' },
  priorityHigh: { backgroundColor: '#ea580c' },
  priorityMedium: { backgroundColor: '#facc15' },
  priorityLow: { backgroundColor: '#10b981' },
  priorityDefault: { backgroundColor: '#9ca3af' }
});

export default AssignDeliveries;
