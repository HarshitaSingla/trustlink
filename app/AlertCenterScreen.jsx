//npm install react-native-vector-icons
//npx react-native link react-native-vector-icons

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const sampleAlerts = [
  {
    id: 1,
    title: 'Critical Stock Level',
    description: 'iPad Air inventory has reached zero units',
    category: 'Inventory',
    priority: 'critical',
    status: 'active',
    timestamp: '2 min ago',
    location: 'Warehouse A',
    assignedTo: 'John Smith',
    affectedItem: 'iPad Air (SKU: IPA-256)',
    details: 'Immediate restocking required. Customer orders on hold.',
    actionRequired: true,
  },
  {
    id: 2,
    title: 'Route Delay Alert',
    description: 'South District route running 45 minutes behind schedule',
    category: 'Logistics',
    priority: 'high',
    status: 'active',
    timestamp: '5 min ago',
    location: 'South District',
    assignedTo: 'Sarah Johnson',
    affectedItem: 'Route #SD-002',
    details: 'Traffic congestion on Main Street. Alternative route suggested.',
    actionRequired: true,
  },
  // Add more alerts as needed...
];

const AlertCenterScreen = () => {
  const [search, setSearch] = useState('');
  const [alerts, setAlerts] = useState(sampleAlerts);

  const filteredAlerts = alerts.filter(alert => {
    return (
      alert.title.toLowerCase().includes(search.toLowerCase()) ||
      alert.description.toLowerCase().includes(search.toLowerCase())
    );
  });

  const getStatusStyle = (status) => {
    switch (status) {
      case 'active': return styles.statusActive;
      case 'acknowledged': return styles.statusAcknowledged;
      case 'resolved': return styles.statusResolved;
      default: return styles.statusDefault;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🚨 Alert Center</Text>
      </View>

      <View style={styles.searchBox}>
        <Icon name="search" size={18} color="#64748b" style={styles.searchIcon} />
        <TextInput
          placeholder="Search alerts..."
          style={styles.input}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <FlatList
        data={filteredAlerts}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={[styles.statusTag, getStatusStyle(item.status)]}>{item.status.toUpperCase()}</Text>
            </View>
            <Text style={styles.cardDescription}>{item.description}</Text>
            <Text style={styles.cardSub}>📦 {item.affectedItem}</Text>
            <Text style={styles.cardSub}>📍 {item.location} — 🕒 {item.timestamp}</Text>
            <Text style={styles.cardDetail}>{item.details}</Text>
            {item.actionRequired && (
              <Text style={styles.actionTag}>⚠️ Action Required</Text>
            )}
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
    alignItems: 'center',
    marginBottom: 6,
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
    backgroundColor: '#fee2e2',
    color: '#b91c1c',
  },
  statusAcknowledged: {
    backgroundColor: '#fef3c7',
    color: '#b45309',
  },
  statusResolved: {
    backgroundColor: '#dcfce7',
    color: '#15803d',
  },
  statusDefault: {
    backgroundColor: '#e2e8f0',
    color: '#334155',
  },
  cardDescription: {
    color: '#475569',
    fontSize: 13,
    marginBottom: 4,
  },
  cardSub: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 2,
  },
  cardDetail: {
    fontSize: 13,
    color: '#0f172a',
    marginTop: 4,
  },
  actionTag: {
    marginTop: 8,
    fontSize: 12,
    color: '#b45309',
    fontWeight: 'bold',
  },
});

export default AlertCenterScreen;
