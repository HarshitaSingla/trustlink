
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  ScrollView,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const inventoryItems = [
  { id: 1, name: 'MacBook Pro 14"', sku: 'MBP14-001', quantity: 12, minStock: 5, status: 'good', location: 'Warehouse A', lastUpdated: '2 hours ago' },
  { id: 2, name: 'iPhone 15 Pro', sku: 'IP15P-128', quantity: 3, minStock: 10, status: 'low', location: 'Warehouse B', lastUpdated: '1 hour ago' },
  { id: 3, name: 'iPad Air', sku: 'IPA-256', quantity: 0, minStock: 8, status: 'critical', location: 'Warehouse A', lastUpdated: '30 min ago' },
  { id: 4, name: 'AirPods Pro', sku: 'APP-002', quantity: 45, minStock: 20, status: 'good', location: 'Warehouse C', lastUpdated: '3 hours ago' },
  { id: 5, name: 'Magic Mouse', sku: 'MM-003', quantity: 8, minStock: 15, status: 'low', location: 'Warehouse B', lastUpdated: '45 min ago' }
];

const getStatusColor = (status) => {
  switch (status) {
    case 'good': return styles.statusGood;
    case 'low': return styles.statusLow;
    case 'critical': return styles.statusCritical;
    default: return styles.statusDefault;
  }
};

const InventoryTracker = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredItems = inventoryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || item.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStockSummary = () => {
    const total = inventoryItems.length;
    const good = inventoryItems.filter(i => i.status === 'good').length;
    const low = inventoryItems.filter(i => i.status === 'low').length;
    const critical = inventoryItems.filter(i => i.status === 'critical').length;
    return { total, good, low, critical };
  };

  const summary = getStockSummary();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Inventory Tracker</Text>

      {/* Summary */}
      <View style={styles.summaryRow}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryValue}>{summary.total}</Text>
          <Text style={styles.summaryLabel}>Total</Text>
        </View>
        <View style={[styles.summaryCard, { backgroundColor: '#dcfce7' }]}>
          <Text style={[styles.summaryValue, { color: '#15803d' }]}>{summary.good}</Text>
          <Text style={[styles.summaryLabel, { color: '#15803d' }]}>In Stock</Text>
        </View>
        <View style={[styles.summaryCard, { backgroundColor: '#fef9c3' }]}>
          <Text style={[styles.summaryValue, { color: '#ca8a04' }]}>{summary.low}</Text>
          <Text style={[styles.summaryLabel, { color: '#ca8a04' }]}>Low Stock</Text>
        </View>
        <View style={[styles.summaryCard, { backgroundColor: '#fee2e2' }]}>
          <Text style={[styles.summaryValue, { color: '#b91c1c' }]}>{summary.critical}</Text>
          <Text style={[styles.summaryLabel, { color: '#b91c1c' }]}>Critical</Text>
        </View>
      </View>

      {/* Search */}
      <View style={styles.searchBox}>
        <Icon name="search" size={18} color="#888" />
        <TextInput
          placeholder="Search items or SKU..."
          style={styles.input}
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
      </View>

      {/* Filter Buttons */}
      <View style={styles.filterRow}>
        {['all', 'good', 'low', 'critical'].map(status => (
          <TouchableOpacity
            key={status}
            onPress={() => setFilterStatus(status)}
            style={[
              styles.filterBtn,
              filterStatus === status && styles.filterBtnActive
            ]}
          >
            <Text style={filterStatus === status ? styles.filterTextActive : styles.filterText}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Inventory List */}
      <FlatList
        data={filteredItems}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.sku}>SKU: {item.sku}</Text>
            <View style={styles.metaRow}>
              <Text style={styles.metaText}>📍 {item.location}</Text>
              <Text style={styles.metaText}>🕒 {item.lastUpdated}</Text>
            </View>
            <View style={styles.stockRow}>
              <Text style={[styles.quantity, getStatusColor(item.status)]}>{item.quantity}</Text>
              <Text style={styles.minStock}>Min: {item.minStock}</Text>
            </View>
          </View>
        )}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb', padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  summaryCard: {
    flex: 1,
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginHorizontal: 4
  },
  summaryValue: { fontSize: 20, fontWeight: 'bold', color: '#0f172a' },
  summaryLabel: { fontSize: 12, color: '#475569' },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 12,
    height: 40,
    elevation: 1
  },
  input: { flex: 1, marginLeft: 8 },
  filterRow: { flexDirection: 'row', marginBottom: 16 },
  filterBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#e2e8f0',
    marginRight: 8
  },
  filterBtnActive: { backgroundColor: '#1e293b' },
  filterText: { color: '#334155' },
  filterTextActive: { color: '#fff', fontWeight: 'bold' },
  card: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 1
  },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#1e293b' },
  sku: { color: '#475569', marginBottom: 6 },
  metaRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  metaText: { fontSize: 12, color: '#64748b' },
  stockRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  quantity: { fontSize: 20, fontWeight: 'bold' },
  minStock: { fontSize: 12, color: '#64748b' },
  statusGood: { color: '#16a34a' },
  statusLow: { color: '#ca8a04' },
  statusCritical: { color: '#dc2626' },
  statusDefault: { color: '#334155' }
});

export default InventoryTracker;
