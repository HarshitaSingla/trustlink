import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

// Mapping buttons to screen names
const navigationMap = {
  fleet: {
    'View Details': 'FleetOverview',
    Reports: 'FleetReports',
  },
  deliveries: {
    'Auto Assign': 'AssignDeliveries',
    Manual: 'ManualAssignScreen',
  },
  pickup: {
    'Tap to Scan': 'PickupVerification',
  },
  drivers: {
    'View All': 'DriverManagement',
    Schedule: 'DriverScheduleScreen',
  },
  analytics: {
    'View Analytics': 'PerformanceAnalytics',
    Export: 'AnalyticsExportScreen',
  },
  audit: {
    'View Logs': 'AuditTrailScreen',
    Search: 'AuditSearchScreen',
  },
  alerts: {
    'View Alerts': 'AlertCenter',
    Settings: 'AlertSettingsScreen',
  },
  scanner: {
    'Scan Now': 'QRCodeScannerScreen',
    History: 'ScanHistoryScreen',
  },
  security: {
    'View Logs': 'SecurityLogsScreen',
    Reports: 'SecurityReportsScreen',
  },
  prevention: {
    Dashboard: 'LossPreventionDashboard',
    Alerts: 'LossPreventionAlerts',
  },
  routes: {
    Optimize: 'RouteOptimizer',
    'View Map': 'RouteMapScreen',
  },
  inventory: {
    'View Inventory': 'InventoryTracker',
    Audit: 'InventoryAuditScreen',
  },
};

const features = [
  {
    key: 'fleet',
    icon: '📊',
    title: 'Fleet Overview',
    description: 'Monitor vehicles and maintenance',
    mainStat: { label: 'Active', value: '47' },
    subStats: [
      { label: 'Available', value: '94%' },
      { label: 'Maintenance', value: '3' },
    ],
    buttons: ['View Details', 'Reports'],
    color: '#667eea',
    priority: 'high',
  },
  {
    key: 'deliveries',
    icon: '🚚',
    title: 'Deliveries',
    description: 'Auto assign and manage',
    mainStat: { label: 'Pending', value: '89' },
    subStats: [
      { label: 'Assigned', value: '156' },
      { label: 'Urgent', value: '12' },
    ],
    buttons: ['Auto Assign', 'Manual'],
    color: '#f093fb',
    priority: 'high',
  },
  {
    key: 'pickup',
    icon: '📋',
    title: 'Pickup Verify',
    description: 'Scan and verify pickups',
    mainStat: { label: 'Completed', value: '234' },
    subStats: [
      { label: 'Pending', value: '7' },
      { label: 'Issues', value: '2' },
    ],
    buttons: ['Tap to Scan'],
    color: '#4facfe',
    priority: 'medium',
  },
  {
    key: 'drivers',
    icon: '👥',
    title: 'Driver Mgmt',
    description: 'Manage driver schedules',
    mainStat: { label: 'Total', value: '34' },
    subStats: [
      { label: 'Active', value: '28' },
      { label: 'Off Duty', value: '6' },
    ],
    buttons: ['View All', 'Schedule'],
    color: '#43e97b',
    priority: 'medium',
  },
  {
    key: 'analytics',
    icon: '📈',
    title: 'Analytics',
    description: 'Performance insights',
    mainStat: { label: 'Efficiency', value: '92%' },
    subStats: [
      { label: 'Rating', value: '4.8' },
      { label: 'Revenue', value: '$2.1M' },
    ],
    buttons: ['View Analytics', 'Export'],
    color: '#fa709a',
    priority: 'high',
  },
  {
    key: 'audit',
    icon: '🔍',
    title: 'Audit Trail',
    description: 'Activity monitoring',
    mainStat: { label: 'Activities', value: '1,247' },
    subStats: [
      { label: 'Real-time', value: '24h' },
      { label: 'Compliance', value: '100%' },
    ],
    buttons: ['View Logs', 'Search'],
    color: '#a8edea',
    priority: 'low',
  },
  {
    key: 'alerts',
    icon: '⚠️',
    title: 'Alert Center',
    description: 'System notifications',
    mainStat: { label: 'Active', value: '5' },
    subStats: [
      { label: 'Resolved', value: '23' },
      { label: 'Critical', value: '2' },
    ],
    buttons: ['View Alerts', 'Settings'],
    color: '#ff9a9e',
    priority: 'high',
  },
  {
    key: 'scanner',
    icon: '📱',
    title: 'QR Scanner',
    description: 'Scan codes quickly',
    mainStat: { label: 'Scanned', value: '892' },
    subStats: [
      { label: 'Today', value: '47' },
      { label: 'Success', value: '99%' },
    ],
    buttons: ['Scan Now', 'History'],
    color: '#a18cd1',
    priority: 'medium',
  },
  {
    key: 'security',
    icon: '🔒',
    title: 'Security',
    description: 'Access control logs',
    mainStat: { label: 'Logs', value: '456' },
    subStats: [
      { label: 'Incidents', value: '0' },
      { label: 'Score', value: '98%' },
    ],
    buttons: ['View Logs', 'Reports'],
    color: '#ffecd2',
    priority: 'low',
  },
  {
    key: 'prevention',
    icon: '🛡️',
    title: 'Loss Prevention',
    description: 'AI-powered monitoring',
    mainStat: { label: 'Accuracy', value: '99.2%' },
    subStats: [
      { label: 'Savings', value: '$124K' },
      { label: 'Losses', value: '0' },
    ],
    buttons: ['Dashboard', 'Alerts'],
    color: '#667eea',
    priority: 'medium',
  },
  {
    key: 'routes',
    icon: '🗺️',
    title: 'Route Optimize',
    description: 'Efficient routing',
    mainStat: { label: 'Routes', value: '87' },
    subStats: [
      { label: 'Fuel Saved', value: '23%' },
      { label: 'Time Saved', value: '15min' },
    ],
    buttons: ['Optimize', 'View Map'],
    color: '#f093fb',
    priority: 'medium',
  },
  {
    key: 'inventory',
    icon: '📦',
    title: 'Inventory',
    description: 'Stock tracking',
    mainStat: { label: 'Items', value: '24,847' },
    subStats: [
      { label: 'Low Stock', value: '27' },
      { label: 'Accuracy', value: '94%' },
    ],
    buttons: ['View Inventory', 'Audit'],
    color: '#4facfe',
    priority: 'high',
  },
];

const PriorityDot = ({ priority }) => {
  const getColor = () => {
    switch (priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  return <View style={[styles.priorityDot, { backgroundColor: getColor() }]} />;
};

const FeatureCard = ({ feature, onButtonPress }) => {
  const cardWidth = (width - 60) / 2; // 2 columns with padding

  return (
    <TouchableOpacity 
      style={[styles.card, { width: cardWidth }]}
      activeOpacity={0.95}
      onPress={() => onButtonPress(feature.key, feature.buttons[0])}
    >
      <View style={styles.cardHeader}>
        <View style={[styles.iconContainer, { backgroundColor: feature.color + '20' }]}>
          <Text style={styles.icon}>{feature.icon}</Text>
        </View>
        <PriorityDot priority={feature.priority} />
      </View>
      
      <Text style={styles.title}>{feature.title}</Text>
      <Text style={styles.description}>{feature.description}</Text>
      
      <View style={styles.mainStatContainer}>
        <Text style={[styles.mainStatValue, { color: feature.color }]}>
          {feature.mainStat.value}
        </Text>
        <Text style={styles.mainStatLabel}>{feature.mainStat.label}</Text>
      </View>
      
      <View style={styles.subStatsContainer}>
        {feature.subStats.map((stat, idx) => (
          <View key={idx} style={styles.subStat}>
            <Text style={styles.subStatValue}>{stat.value}</Text>
            <Text style={styles.subStatLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>
      
      <View style={styles.buttonContainer}>
        {feature.buttons.map((btn, idx) => (
          <TouchableOpacity
            key={idx}
            style={[
              styles.button,
              idx === 0 && [styles.primaryButton, { backgroundColor: feature.color }]
            ]}
            onPress={() => onButtonPress(feature.key, btn)}
          >
            <Text style={[
              styles.buttonText,
              idx === 0 && styles.primaryButtonText
            ]}>
              {btn}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </TouchableOpacity>
  );
};

const WarehouseDashboardScreen = () => {
  const navigation = useNavigation();

  const handleButtonPress = (featureKey, button) => {
    const screen = navigationMap[featureKey]?.[button];
    if (screen) {
      navigation.navigate(screen);
    } else {
      console.warn(`No screen mapped for: ${featureKey} > ${button}`);
    }
  };

  return (
    <ScrollView 
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.headerContainer}>
        <View style={styles.headerContent}>
          <View style={styles.headerText}>
            <Text style={styles.header}>Warehouse Manager</Text>
            <Text style={styles.subHeader}>Dashboard Overview</Text>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <Text style={styles.headerIcon}>🔔</Text>
              <View style={styles.notificationBadge}>
                <Text style={styles.badgeText}>3</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Text style={styles.headerIcon}>👤</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.gridContainer}>
        {features.map((feature, index) => (
          <FeatureCard
            key={feature.key}
            feature={feature}
            onButtonPress={handleButtonPress}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8fafc',
    paddingBottom: 40,
  },
  headerContainer: {
    marginBottom: 30,
    paddingTop: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    flex: 1,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    position: 'relative',
  },
  headerIcon: {
    fontSize: 20,
  },
  notificationBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#ef4444',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '600',
  },
  header: {
    fontSize: 32,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 4,
  },
  subHeader: {
    fontSize: 16,
    color: '#64748b',
    fontWeight: '500',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 20,
  },
  priorityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: '#64748b',
    lineHeight: 16,
    marginBottom: 16,
  },
  mainStatContainer: {
    alignItems: 'center',
    marginBottom: 16,
    paddingVertical: 8,
  },
  mainStatValue: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 2,
  },
  mainStatLabel: {
    fontSize: 11,
    color: '#64748b',
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  subStatsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  subStat: {
    alignItems: 'center',
    flex: 1,
  },
  subStatValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 2,
  },
  subStatLabel: {
    fontSize: 10,
    color: '#64748b',
    textAlign: 'center',
  },
  buttonContainer: {
    gap: 8,
  },
  button: {
    backgroundColor: '#f1f5f9',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    alignItems: 'center',
  },
  primaryButton: {
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
  primaryButtonText: {
    color: '#ffffff',
  },
});

export default WarehouseDashboardScreen;