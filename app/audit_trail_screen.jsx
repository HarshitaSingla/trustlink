import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const AuditTrailScreen = () => {
  const navigation = useNavigation();
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTimeframe, setSelectedTimeframe] = useState('Today');

  const overviewStats = [
    {
      title: 'Total Activities',
      value: '1,247',
      change: '+156',
      trend: 'up',
      color: '#3b82f6',
      icon: '📊'
    },
    {
      title: 'Critical Events',
      value: '23',
      change: '+2',
      trend: 'up',
      color: '#ef4444',
      icon: '🚨'
    },
    {
      title: 'Users Active',
      value: '47',
      change: '+8',
      trend: 'up',
      color: '#10b981',
      icon: '👥'
    },
    {
      title: 'Compliance Score',
      value: '100%',
      change: '0%',
      trend: 'stable',
      color: '#8b5cf6',
      icon: '✅'
    }
  ];

  const auditLogs = [
    {
      id: 1,
      timestamp: '2024-01-15 14:23:15',
      user: 'John Smith',
      userId: 'JS001',
      action: 'Inventory Update',
      resource: 'Product SKU-12345',
      details: 'Updated quantity from 150 to 125 units',
      ipAddress: '192.168.1.45',
      location: 'Warehouse A',
      severity: 'Medium',
      category: 'Inventory',
      status: 'Success'
    },
    {
      id: 2,
      timestamp: '2024-01-15 14:18:42',
      user: 'Sarah Johnson',
      userId: 'SJ002',
      action: 'Access Attempt',
      resource: 'Admin Panel',
      details: 'Failed login attempt - incorrect password',
      ipAddress: '192.168.1.67',
      location: 'Office Building',
      severity: 'High',
      category: 'Security',
      status: 'Failed'
    },
    {
      id: 3,
      timestamp: '2024-01-15 14:12:30',
      user: 'Mike Davis',
      userId: 'MD003',
      action: 'Document Access',
      resource: 'Financial Report Q4',
      details: 'Downloaded quarterly financial report',
      ipAddress: '192.168.1.89',
      location: 'Finance Dept',
      severity: 'Low',
      category: 'Document',
      status: 'Success'
    },
    {
      id: 4,
      timestamp: '2024-01-15 14:05:18',
      user: 'Lisa Chen',
      userId: 'LC004',
      action: 'System Configuration',
      resource: 'User Permissions',
      details: 'Modified access permissions for user group "Warehouse Staff"',
      ipAddress: '192.168.1.23',
      location: 'IT Department',
      severity: 'High',
      category: 'System',
      status: 'Success'
    },
    {
      id: 5,
      timestamp: '2024-01-15 13:58:45',
      user: 'Robert Wilson',
      userId: 'RW005',
      action: 'Data Export',
      resource: 'Customer Database',
      details: 'Exported customer contact list (2,450 records)',
      ipAddress: '192.168.1.101',
      location: 'Sales Office',
      severity: 'Medium',
      category: 'Data',
      status: 'Success'
    },
    {
      id: 6,
      timestamp: '2024-01-15 13:45:12',
      user: 'Emma Taylor',
      userId: 'ET006',
      action: 'Delivery Confirmation',
      resource: 'Order #ORD-7890',
      details: 'Marked delivery as completed and updated tracking status',
      ipAddress: '192.168.1.156',
      location: 'Loading Bay 3',
      severity: 'Low',
      category: 'Operations',
      status: 'Success'
    }
  ];

  const filterOptions = ['All', 'Security', 'Inventory', 'System', 'Document', 'Data', 'Operations'];
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
      case 'Success': return '#10b981';
      case 'Failed': return '#ef4444';
      case 'Pending': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Security': return '🔒';
      case 'Inventory': return '📦';
      case 'System': return '⚙️';
      case 'Document': return '📄';
      case 'Data': return '💾';
      case 'Operations': return '🚚';
      default: return '📋';
    }
  };

  const filteredLogs = auditLogs.filter(log => {
    const matchesFilter = selectedFilter === 'All' || log.category === selectedFilter;
    const matchesSearch = searchQuery === '' || 
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.resource.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const StatCard = ({ stat }) => (
    <View style={[styles.statCard, { borderLeftColor: stat.color }]}>
      <View style={styles.statHeader}>
        <Text style={styles.statIcon}>{stat.icon}</Text>
        <View style={[styles.trendIndicator, { 
          backgroundColor: stat.trend === 'up' ? '#10b981' : stat.trend === 'down' ? '#ef4444' : '#6b7280' 
        }]}>
          <Text style={styles.trendText}>
            {stat.trend === 'up' ? '↑' : stat.trend === 'down' ? '↓' : '→'}
          </Text>
        </View>
      </View>
      <Text style={styles.statTitle}>{stat.title}</Text>
      <Text style={[styles.statValue, { color: stat.color }]}>{stat.value}</Text>
      <Text style={[styles.statChange, { 
        color: stat.trend === 'up' ? '#10b981' : stat.trend === 'down' ? '#ef4444' : '#6b7280' 
      }]}>
        {stat.change} from yesterday
      </Text>
    </View>
  );

  const AuditLogCard = ({ log }) => (
    <View style={styles.logCard}>
      <View style={styles.logHeader}>
        <View style={styles.logInfo}>
          <View style={styles.logTitleRow}>
            <Text style={styles.categoryIcon}>{getCategoryIcon(log.category)}</Text>
            <Text style={styles.logAction}>{log.action}</Text>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(log.status) }]}>
              <Text style={styles.badgeText}>{log.status}</Text>
            </View>
          </View>
          <Text style={styles.logTimestamp}>{log.timestamp}</Text>
        </View>
        <View style={[styles.severityBadge, { backgroundColor: getSeverityColor(log.severity) }]}>
          <Text style={styles.badgeText}>{log.severity}</Text>
        </View>
      </View>
      
      <View style={styles.logDetails}>
        <View style={styles.logRow}>
          <Text style={styles.logLabel}>User:</Text>
          <Text style={styles.logValue}>{log.user} ({log.userId})</Text>
        </View>
        <View style={styles.logRow}>
          <Text style={styles.logLabel}>Resource:</Text>
          <Text style={styles.logValue}>{log.resource}</Text>
        </View>
        <View style={styles.logRow}>
          <Text style={styles.logLabel}>Location:</Text>
          <Text style={styles.logValue}>{log.location}</Text>
        </View>
        <View style={styles.logRow}>
          <Text style={styles.logLabel}>IP Address:</Text>
          <Text style={styles.logValue}>{log.ipAddress}</Text>
        </View>
        <Text style={styles.logDescription}>{log.details}</Text>
      </View>
    </View>
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
            <Text style={styles.headerTitle}>🔍 Audit Trail</Text>
            <Text style={styles.headerSubtitle}>Activity Monitoring & Compliance</Text>
          </View>
          <TouchableOpacity style={styles.exportButton}>
            <Text style={styles.exportIcon}>📤</Text>
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

      {/* Search and Filter */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Search & Filter</Text>
        
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by user, action, or resource..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Filter Buttons */}
        <View style={styles.filterContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {filterOptions.map((filter) => (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.filterButton,
                  selectedFilter === filter && styles.selectedFilter
                ]}
                onPress={() => setSelectedFilter(filter)}
              >
                <Text style={[
                  styles.filterText,
                  selectedFilter === filter && styles.selectedFilterText
                ]}>
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>

      {/* Audit Logs */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Audit Logs ({filteredLogs.length})
          </Text>
          <TouchableOpacity>
            <Text style={styles.refreshButton}>🔄 Refresh</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.logsList}>
          {filteredLogs.map((log) => (
            <AuditLogCard key={log.id} log={log} />
          ))}
        </View>
      </View>

      {/* Load More Button */}
      <View style={styles.loadMoreContainer}>
        <TouchableOpacity style={styles.loadMoreButton}>
          <Text style={styles.loadMoreText}>Load More Entries</Text>
        </TouchableOpacity>
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
  exportButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  exportIcon: {
    fontSize: 20,
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
  refreshButton: {
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#0f172a',
  },
  filterContainer: {
    marginBottom: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  selectedFilter: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748b',
  },
  selectedFilterText: {
    color: '#ffffff',
  },
  logsList: {
    gap: 12,
  },
  logCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  logInfo: {
    flex: 1,
  },
  logTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  categoryIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  logAction: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  severityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 10,
    color: '#ffffff',
    fontWeight: '600',
  },
  logTimestamp: {
    fontSize: 12,
    color: '#64748b',
    marginLeft: 24,
  },
  logDetails: {
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 12,
  },
  logRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  logLabel: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
    width: 80,
  },
  logValue: {
    fontSize: 12,
    color: '#0f172a',
    fontWeight: '500',
    flex: 1,
  },
  logDescription: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
    marginTop: 8,
    fontStyle: 'italic',
  },
  loadMoreContainer: {
    padding: 20,
    alignItems: 'center',
  },
  loadMoreButton: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  loadMoreText: {
    fontSize: 14,
    color: '#3b82f6',
    fontWeight: '600',
  },
  bottomPadding: {
    height: 40,
  },
});

export default AuditTrailScreen;