// ✅ AssignmentsScreen - for Expo Router (place in app/assignments.tsx)

import { AlertTriangle, ArrowUpDown, CheckCircle, Clock, Filter, XCircle } from 'lucide-react-native';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const AssignmentsScreen: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('Today');
  const [sortBy, setSortBy] = useState<'ETA' | 'Distance'>('ETA');

  const deliveries = [
    {
      id: 'DEL-001', pickup: 'Warehouse A', destination: '123 Main St', scheduledTime: '10:30 AM', eta: '25 mins', distance: '3.2 km', status: 'active'
    },
    {
      id: 'DEL-002', pickup: 'Distribution Center', destination: '456 Oak Ave', scheduledTime: '11:15 AM', eta: '45 mins', distance: '7.8 km', status: 'pending'
    },
    {
      id: 'DEL-003', pickup: 'Store B', destination: '789 Pine Rd', scheduledTime: '1:00 PM', eta: '1h 20m', distance: '12.5 km', status: 'delayed'
    },
    {
      id: 'DEL-004', pickup: 'Warehouse C', destination: '321 Elm St', scheduledTime: '2:30 PM', eta: '2h 15m', distance: '5.6 km', status: 'completed'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#DCFCE7';
      case 'delayed': return '#FEF9C3';
      case 'cancelled': return '#FEE2E2';
      case 'active': return '#DBEAFE';
      default: return '#F1F5F9';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle size={16} color="green" />;
      case 'delayed': return <AlertTriangle size={16} color="orange" />;
      case 'cancelled': return <XCircle size={16} color="red" />;
      default: return <Clock size={16} color="gray" />;
    }
  };

  const toggleSort = () => {
    setSortBy(prev => (prev === 'ETA' ? 'Distance' : 'ETA'));
  };

  const sortedDeliveries = [...deliveries].sort((a, b) => {
    if (sortBy === 'ETA') return a.eta.localeCompare(b.eta);
    return parseFloat(a.distance) - parseFloat(b.distance);
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Assignments</Text>
        <View style={styles.filters}>
          {['Today', 'Week', 'All'].map(filter => (
            <TouchableOpacity
              key={filter}
              style={[styles.filterBtn, selectedFilter === filter && styles.activeFilter]}
              onPress={() => setSelectedFilter(filter)}
            >
              <Text style={styles.filterText}>{filter}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.iconBtn}><Filter size={16} color="#6B7280" /></TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn} onPress={toggleSort}>
            <ArrowUpDown size={16} color="#6B7280" />
            <Text style={styles.sortText}>{sortBy}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollArea}>
        {sortedDeliveries.map(delivery => (
          <View key={delivery.id} style={[styles.card, { backgroundColor: getStatusColor(delivery.status) }]}>
            <View style={styles.cardHeader}>
              <View style={styles.cardIdRow}>
                {getStatusIcon(delivery.status)}
                <Text style={styles.cardId}>{delivery.id}</Text>
              </View>
              <Text style={styles.eta}>{delivery.eta} • {delivery.distance}</Text>
            </View>
            <View style={styles.locationRow}>
              <Text style={styles.label}>From:</Text>
              <Text style={styles.value}>{delivery.pickup}</Text>
            </View>
            <View style={styles.locationRow}>
              <Text style={styles.label}>To:</Text>
              <Text style={styles.value}>{delivery.destination}</Text>
            </View>
            <View style={styles.timeRow}>
              <Clock size={14} color="#6B7280" />
              <Text style={styles.timeText}> Scheduled: {delivery.scheduledTime}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { padding: 16, borderBottomWidth: 1, borderColor: '#E5E7EB' },
  title: { fontSize: 20, fontWeight: 'bold', color: '#1F2937', marginBottom: 8 },
  filters: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' },
  filterBtn: { paddingVertical: 6, paddingHorizontal: 12, backgroundColor: '#F3F4F6', borderRadius: 6, marginRight: 8 },
  activeFilter: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#D1D5DB' },
  filterText: { fontSize: 12, color: '#374151' },
  iconBtn: { flexDirection: 'row', alignItems: 'center', marginLeft: 8 },
  sortText: { fontSize: 12, color: '#374151', marginLeft: 4 },
  scrollArea: { padding: 16 },
  card: { borderRadius: 10, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: '#E5E7EB' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  cardIdRow: { flexDirection: 'row', alignItems: 'center' },
  cardId: { marginLeft: 6, fontWeight: 'bold', color: '#1F2937' },
  eta: { fontSize: 12, color: '#6B7280' },
  locationRow: { flexDirection: 'row', marginBottom: 4 },
  label: { width: 50, fontSize: 12, color: '#6B7280' },
  value: { fontSize: 14, fontWeight: '500', color: '#111827' },
  timeRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  timeText: { fontSize: 12, color: '#6B7280', marginLeft: 4 }
});

export default AssignmentsScreen;
