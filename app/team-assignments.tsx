import { Shield, Users } from 'lucide-react-native';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function TeamAssignments() {
  const [activeTab, setActiveTab] = useState<'assigned' | 'unassigned' | 'roster'>('assigned');

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.iconWrapper}>
            <Shield color="#2563EB" size={24} />
          </View>
          <View>
            <Text style={styles.title}>Team Assignments</Text>
            <Text style={styles.subtitle}>Supply Chain Security Management</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <Text style={styles.dashboardLabel}>Store Manager Dashboard</Text>
          <View style={styles.avatar}>
            <Users color="#fff" size={16} />
          </View>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        {['assigned', 'unassigned', 'roster'].map(tab => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tabButton,
              activeTab === tab && styles.activeTabButton
            ]}
            onPress={() => setActiveTab(tab as any)}
          >
            <Text style={[
              styles.tabText,
              activeTab === tab && styles.activeTabText
            ]}>
              {tab === 'assigned' ? 'Assigned Deliveries' : tab === 'unassigned' ? 'Unassigned Tasks' : 'Handler Roster'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* You can now insert content conditionally based on `activeTab` */}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 16,
  },
  header: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrapper: {
    padding: 8,
    backgroundColor: '#DBEAFE',
    borderRadius: 8,
    marginRight: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  subtitle: {
    color: '#6B7280',
  },
  headerRight: {
    alignItems: 'flex-end',
  },
  dashboardLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  avatar: {
    backgroundColor: '#2563EB',
    borderRadius: 999,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 12,
  },
  tabButton: {
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  activeTabButton: {
    borderBottomWidth: 2,
    borderColor: '#2563EB',
  },
  tabText: {
    fontSize: 14,
    color: '#6B7280',
  },
  activeTabText: {
    color: '#2563EB',
    fontWeight: '600',
  }
});
