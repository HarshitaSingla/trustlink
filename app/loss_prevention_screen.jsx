import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const LossPreventionDashboard = () => {
  const navigation = useNavigation();
  const [selectedTimeframe, setSelectedTimeframe] = useState('Today');

  const overviewStats = [
    {
      title: 'AI Detection Rate',
      value: '99.2%',
      change: '+0.3%',
      trend: 'up',
      color: '#10b981',
      icon: '🎯'
    },
    {
      title: 'Prevented Losses',
      value: '$124K',
      change: '+$18K',
      trend: 'up',
      color: '#3b82f6',
      icon: '💰'
    },
    {
      title: 'Active Alerts',
      value: '3',
      change: '-2',
      trend: 'down',
      color: '#ef4444',
      icon: '⚠️'
    },
    {
      title: 'Accuracy Score',
      value: '98.7%',
      change: '+1.2%',
      trend: 'up',
      color: '#8b5cf6',
      icon: '📊'
    }
  ];

  const recentIncidents = [
    {
      id: 1,
      type: 'Suspicious Activity',
      location: 'Warehouse A - Section 3',
      time: '2 hours ago',
      severity: 'High',
      status: 'Investigating',
      description: 'Unusual movement pattern detected near high-value items'
    },
    {
      id: 2,
      type: 'Inventory Discrepancy',
      location: 'Loading Bay 2',
      time: '4 hours ago',
      severity: 'Medium',
      status: 'Resolved',
      description: 'Quantity mismatch resolved - scanning error'
    },
    {
      id: 3,
      type: 'Access Violation',
      location: 'Restricted Area B',
      time: '6 hours ago',
      severity: 'Low',
      status: 'Cleared',
      description: 'Authorized personnel - badge malfunction'
    }
  ];

  const quickActions = [
    { title: 'View Live Feed', icon: '📹', color: '#3b82f6' },
    { title: 'Generate Report', icon: '📋', color: '#10b981' },
    { title: 'Alert Settings', icon: '⚙️', color: '#6b7280' },
    { title: 'Audit Trail', icon: '🔍', color: '#8b5cf6' }
  ];

  const timeframes = ['Today', 'This Week', 'This Month', 'Custom'];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'High': return '#ef4444';
      case 'Medium': return '#f59e0b';
      case 'Low': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Investigating': return '#f59e0b';
      case 'Resolved': return '#10b981';
      case 'Cleared': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const StatCard = ({ stat }) => (
    <View style={[styles.statCard, { borderLeftColor: stat.color }]}>
      <View style={styles.statHeader}>
        <Text style={styles.statIcon}>{stat.icon}</Text>
        <View style={[styles.trendIndicator, { backgroundColor: stat.trend === 'up' ? '#10b981' : '#ef4444' }]}>
          <Text style={styles.trendText}>{stat.trend === 'up' ? '↑' : '↓'}</Text>
        </View>
      </View>
      <Text style={styles.statTitle}>{stat.title}</Text>
      <Text style={[styles.statValue, { color: stat.color }]}>{stat.value}</Text>
      <Text style={[styles.statChange, { color: stat.trend === 'up' ? '#10b981' : '#ef4444' }]}>
        {stat.change} from yesterday
      </Text>
    </View>
  );

  const IncidentCard = ({ incident }) => (
    <View style={styles.incidentCard}>
      <View style={styles.incidentHeader}>
        <View style={styles.incidentInfo}>
          <Text style={styles.incidentType}>{incident.type}</Text>
          <Text style={styles.incidentTime}>{incident.time}</Text>
        </View>
        <View style={styles.incidentBadges}>
          <View style={[styles.severityBadge, { backgroundColor: getSeverityColor(incident.severity) }]}>
            <Text style={styles.badgeText}>{incident.severity}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(incident.status) }]}>
            <Text style={styles.badgeText}>{incident.status}</Text>
          </View>
        </View>
      </View>
      <Text style={styles.incidentLocation}>{incident.location}</Text>
      <Text style={styles.incidentDescription}>{incident.description}</Text>
    </View>
  );

  const QuickActionButton = ({ action }) => (
    <TouchableOpacity style={styles.quickActionButton}>
      <View style={[styles.actionIcon, { backgroundColor: action.color + '20' }]}>
        <Text style={styles.actionIconText}>{action.icon}</Text>
      </View>
      <Text style={styles.actionTitle}>{action.title}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backButton}>← Back</Text>
          </TouchableOpacity>
          <View style={styles.headerText}>
            <Text style={styles.headerTitle}>🛡️ Loss Prevention</Text>
            <Text style={styles.headerSubtitle}>AI-Powered Monitoring Dashboard</Text>
          </View>
          <TouchableOpacity style={styles.menuButton}>
            <Text style={styles.menuIcon}>⋮</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Timeframe Selector */}
      <View style={styles.timeframeContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {timeframes.map((timeframe) => (
            <TouchableOpacity
              key={timeframe}
              style={[
                styles.timeframeButton,
                selectedTimeframe === timeframe && styles.selectedTimeframe
              ]}
              onPress={() => setSelectedTimeframe(timeframe)}
            >
              <Text style={[
                styles.timeframeText,
                selectedTimeframe === timeframe && styles.selectedTimeframeText
              ]}>
                {timeframe}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Overview Stats */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Overview</Text>
        <View style={styles.statsGrid}>
          {overviewStats.map((stat, index) => (
            <StatCard key={index} stat={stat} />
          ))}
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActionsGrid}>
          {quickActions.map((action, index) => (
            <QuickActionButton key={index} action={action} />
          ))}
        </View>
      </View>

      {/* Recent Incidents */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Incidents</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllButton}>View All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.incidentsList}>
          {recentIncidents.map((incident) => (
            <IncidentCard key={incident.id} incident={incident} />
          ))}
        </View>
      </View>

      {/* System Status */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>System Status</Text>
        <View style={styles.systemStatus}>
          <View style={styles.statusItem}>
            <View style={[styles.statusIndicator, { backgroundColor: '#10b981' }]} />
            <Text style={styles.statusText}>AI Detection: Online</Text>
          </View>
          <View style={styles.statusItem}>
            <View style={[styles.statusIndicator, { backgroundColor: '#10b981' }]} />
            <Text style={styles.statusText}>Camera Network: Active</Text>
          </View>
          <View style={styles.statusItem}>
            <View style={[styles.statusIndicator, { backgroundColor: '#f59e0b' }]} />
            <Text style={styles.statusText}>Maintenance: Scheduled</Text>
          </View>
        </View>
      </View>

      <View style={styles.bottomPadding} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    backgroundColor: '#ffffff',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    fontSize: 16,
    color: '#3b82f6',
    fontWeight: '600',
  },
  headerText: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuIcon: {
    fontSize: 20,
    color: '#64748b',
  },
  timeframeContainer: {
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  timeframeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
    marginRight: 12,
  },
  selectedTimeframe: {
    backgroundColor: '#3b82f6',
  },
  timeframeText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748b',
  },
  selectedTimeframeText: {
    color: '#ffffff',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAllButton: {
    fontSize: 14,
    color: '#3b82f6',
    fontWeight: '600',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  statCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    width: (width - 52) / 2,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statIcon: {
    fontSize: 20,
  },
  trendIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trendText: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: '600',
  },
  statTitle: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 4,
  },
  statChange: {
    fontSize: 10,
    fontWeight: '500',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  quickActionButton: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    width: (width - 52) / 2,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  actionIconText: {
    fontSize: 20,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0f172a',
    textAlign: 'center',
  },
  incidentsList: {
    gap: 12,
  },
  incidentCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  incidentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  incidentInfo: {
    flex: 1,
  },
  incidentType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 4,
  },
  incidentTime: {
    fontSize: 12,
    color: '#64748b',
  },
  incidentBadges: {
    flexDirection: 'row',
    gap: 8,
  },
  severityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 10,
    color: '#ffffff',
    fontWeight: '600',
  },
  incidentLocation: {
    fontSize: 14,
    color: '#3b82f6',
    fontWeight: '500',
    marginBottom: 8,
  },
  incidentDescription: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
  systemStatus: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  statusText: {
    fontSize: 14,
    color: '#0f172a',
    fontWeight: '500',
  },
  bottomPadding: {
    height: 40,
  },
});

export default LossPreventionDashboard;