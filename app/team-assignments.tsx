

import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

type Handler = {
  id: string;
  status: 'available' | 'on-break' | 'off-shift';
  deliveries: number;
  avgTime: string;
  incidents: number;
};

type Task = {
  id: string;
  title: string;
  description: string;
  priority: 'Critical' | 'Medium' | 'Low';
  time: string;
  status: 'Unassigned' | 'Assigned';
};

type Assignment = {
  id: string;
  route: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'in-transit' | 'pending' | 'delivered';
  handler: string;
  eta: string;
};

const tabs = ['Assigned Deliveries', 'Unassigned Tasks', 'Handler Roster'];
const screenWidth = Dimensions.get('window').width;

const assignments: Assignment[] = [
  { id: 'DEL-001', route: 'Route A-North', priority: 'High', status: 'in-transit', handler: 'Handler-X21', eta: '14:30' },
  { id: 'DEL-002', route: 'Route B-East', priority: 'Medium', status: 'delivered', handler: 'Handler-Y34', eta: '13:45' },
  { id: 'DEL-003', route: 'Route C-South', priority: 'High', status: 'pending', handler: 'Handler-Z47', eta: '15:15' },
];

const handlerData: Handler[] = [
  { id: 'Handler-X21', status: 'available', deliveries: 12, avgTime: '8.5 min', incidents: 0 },
  { id: 'Handler-T81', status: 'available', deliveries: 12, avgTime: '6.5 min', incidents: 0 },
  { id: 'Handler-Y34', status: 'on-break', deliveries: 8, avgTime: '7.2 min', incidents: 1 },
  { id: 'Handler-Z47', status: 'off-shift', deliveries: 15, avgTime: '9.1 min', incidents: 2 },
];

const taskData: Task[] = [
  { id: 'TASK-001', title: 'Delivery - Route D-West', description: 'Route D-West', priority: 'Critical', time: '16:00–17:00', status: 'Unassigned' },
  { id: 'TASK-002', title: 'Security Check - Warehouse B', description: 'Warehouse B', priority: 'Medium', time: '17:30–18:00', status: 'Unassigned' },
  { id: 'TASK-003', title: 'Inventory Audit - Storage Unit 5', description: 'Storage Unit 5', priority: 'Low', time: '18:00–19:00', status: 'Unassigned' },
];

const statusColors: Record<Handler['status'], string> = {
  available: '#22c55e',
  'on-break': '#eab308',
  'off-shift': '#445777ff',
};

const getPriorityColor = (priority: Task['priority'] | Assignment['priority']) => {
  switch (priority) {
    case 'Critical':
    case 'High': return '#f87171';
    case 'Medium': return '#facc15';
    case 'Low': return '#4ade80';
    default: return '#e5e7eb';
  }
};

const getAssignmentStatusColor = (status: Assignment['status']) => {
  switch (status) {
    case 'in-transit': return '#3b82f6';
    case 'pending': return '#f97316';
    case 'delivered': return '#10b981';
    default: return '#d1d5db';
  }
};

const TeamAssignmentsScreen = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const slideAnim = new Animated.Value(selectedTab * (screenWidth / tabs.length));

  const switchTab = (index: number) => {
    setSelectedTab(index);
    Animated.timing(slideAnim, {
      toValue: index * (screenWidth / tabs.length),
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const renderAssignment = ({ item }: { item: Assignment }) => (
    <View style={styles.handlerCard}>
      <View style={styles.handlerHeader}>
        <MaterialIcons name="local-shipping" size={20} color="#3b82f6" style={{ marginRight: 8 }} />
        <View style={{ flex: 1 }}>
          <Text style={styles.handlerName}>{item.id}</Text>
          <Text style={{ fontSize: 12, color: '#6b7280' }}>{item.route}</Text>
        </View>
        <View style={[styles.statusChip, { backgroundColor: getPriorityColor(item.priority) + '33', marginRight: 4 }]}>
          <Text style={{ fontSize: 12, color: getPriorityColor(item.priority) }}>{item.priority}</Text>
        </View>
        <View style={[styles.statusChip, { backgroundColor: getAssignmentStatusColor(item.status) + '33' }]}>
          <Text style={{ fontSize: 12, color: getAssignmentStatusColor(item.status) }}>{item.status}</Text>
        </View>
      </View>
      <View style={styles.handlerDetails}>
        <Text>Handler: <Text style={styles.metricValue}>{item.handler}</Text></Text>
        <Text>ETA: <Text style={styles.metricValue}>{item.eta}</Text></Text>
      </View>
    </View>
  );

  const renderHandler = ({ item }: { item: Handler }) => (
    <View style={styles.handlerCard}>
      <View style={styles.handlerHeader}>
        <Icon name="user-circle" size={20} color={statusColors[item.status]} style={{ marginRight: 8 }} />
        <Text style={styles.handlerName}>{item.id}</Text>
        <View style={[styles.statusChip, { backgroundColor: statusColors[item.status] + '33' }]}>
          <Text style={{ color: statusColors[item.status], fontSize: 12 }}>{item.status}</Text>
        </View>
      </View>
      <View style={styles.handlerDetails}>
        <Text>Deliveries: <Text style={styles.metricValue}>{item.deliveries}</Text></Text>
        <Text>Avg Time: <Text style={styles.metricValue}>{item.avgTime}</Text></Text>
        <Text>Incidents: <Text style={[styles.metricValue, { color: item.incidents > 0 ? 'red' : 'green' }]}>{item.incidents}</Text></Text>
      </View>
    </View>
  );

  const renderTask = ({ item }: { item: Task }) => (
    <View style={styles.handlerCard}>
      <View style={styles.handlerHeader}>
        <MaterialIcons name="local-shipping" size={20} color="#ef4444" style={{ marginRight: 8 }} />
        <View style={{ flex: 1 }}>
          <Text style={styles.handlerName}>{item.id}</Text>
          <Text style={{ color: '#6b7280', fontSize: 12 }}>{item.title}</Text>
        </View>
        <View style={[styles.statusChip, { backgroundColor: getPriorityColor(item.priority) + '33' }]}>
          <Text style={{ color: getPriorityColor(item.priority), fontSize: 12 }}>{item.priority}</Text>
        </View>
        <View style={{ marginLeft: 8 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 12 }}>{item.time}</Text>
          <Text style={{ fontSize: 12, color: '#6b7280' }}>{item.status}</Text>
        </View>
      </View>
    </View>
  );

  const getTabContent = () => {
    switch (selectedTab) {
      case 0:
        return (
          <>
            <Text style={styles.sectionTitle}>Assigned Deliveries</Text>
            <FlatList
              data={assignments}
              renderItem={renderAssignment}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{ paddingBottom: 60 }}
            />
          </>
        );
      case 1:
        return (
          <>
            <Text style={styles.sectionTitle}>Pending Assignments</Text>
            <FlatList
              data={taskData}
              renderItem={renderTask}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{ paddingBottom: 60 }}
            />
          </>
        );
      case 2:
        return (
          <>
            <Text style={styles.sectionTitle}>Handler Performance Overview</Text>
            <FlatList
              data={handlerData}
              renderItem={renderHandler}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{ paddingBottom: 60 }}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Team Assignments</Text>
        <Text style={styles.headerSubtitle}>Supply Chain Theft Management</Text>
        <Text style={styles.dashboardLabel}>Store Manager Dashboard</Text>
      </View>

      <View style={styles.tabContainer}>
        {tabs.map((tab, index) => (
          <TouchableOpacity key={tab} onPress={() => switchTab(index)} style={styles.tab}>
            <Text style={[styles.tabText, selectedTab === index && styles.activeTabText]}>{tab}</Text>
          </TouchableOpacity>
        ))}
        <Animated.View style={[styles.tabSlider, { width: 80, left: slideAnim }]} />
      </View>

      <View style={styles.actionsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#2563eb' }]}>
            <MaterialIcons name="person-add" size={20} color="white" />
            <Text style={styles.actionText}>Assign Handler</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#22c55e' }]}>
            <MaterialIcons name="autorenew" size={20} color="white" />
            <Text style={styles.actionText}>Rotate Assignments</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#8b5cf6' }]}>
            <MaterialIcons name="schedule" size={20} color="white" />
            <Text style={styles.actionText}>Shift Schedule</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#f97316' }]}>
            <MaterialIcons name="trending-up" size={20} color="white" />
            <Text style={styles.actionText}>Performance Track</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#6366f1' }]}>
            <MaterialIcons name="bolt" size={20} color="white" />
            <Text style={styles.actionText}>Auto-Assign</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {getTabContent()}
    </View>
  );
};

export default TeamAssignmentsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f4f6', paddingHorizontal: 16 },
  header: { paddingVertical: 16, borderBottomWidth: 1, borderColor: '#e5e7eb' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#111827' },
  headerSubtitle: { fontSize: 14, color: '#6b7280', marginTop: 4 },
  dashboardLabel: { fontSize: 12, color: '#2563eb', fontWeight: 'bold', marginTop: 2 },

  tabContainer: {
    flexDirection: 'row',
    position: 'relative',
    borderBottomWidth: 1,
    borderColor: '#e5e7eb',
    justifyContent: 'center',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  tabText: { fontSize: 14, color: '#6b7280' },
  activeTabText: { color: '#111827', fontWeight: 'bold' },
  tabSlider: {
    position: 'absolute',
    bottom: 0,
    height: 3,
    backgroundColor: '#2563eb',
  },

  actionsContainer: {
    marginVertical: 16,
    flexDirection: 'row',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginRight: 8,
  },
  actionText: {
    color: '#fff',
    fontSize: 12,
    marginLeft: 6,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#111827',
  },

  handlerCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  handlerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  handlerName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#111827',
    marginRight: 8,
  },
  statusChip: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  handlerDetails: {
    marginLeft: 28,
    gap: 2,
  },
  metricValue: {
    fontWeight: '600',
  },
});
