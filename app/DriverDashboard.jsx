import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {
  Alert,
  Animated,
  Dimensions,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const DriverDashboard = () => {
  const navigation = useNavigation();
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [emergencyAnimation] = useState(new Animated.Value(1));

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Emergency button pulse animation
  useEffect(() => {
    const pulse = () => {
      Animated.sequence([
        Animated.timing(emergencyAnimation, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(emergencyAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start(() => pulse());
    };
    pulse();
  }, [emergencyAnimation]);

  const menuItems = [
    {
      id: 1,
      title: 'My Deliveries',
      icon: 'cube-outline',
      description: 'Current routes',
      screen: 'MyDeliveryScreen',
      count: '3',
      status: 'success'
    },
    {
      id: 2,
      title: 'Assignments',
      icon: 'calendar-outline',
      description: 'Today\'s plan',
      screen: 'AssignmentsScreen',
      count: '8',
      status: 'success'
    },
    {
      id: 3,
      title: 'Check-In',
      icon: 'checkmark-circle-outline',
      description: 'Status update',
      screen: 'CheckInScreen',
      count: null,
      status: 'warning'
    },
    {
      id: 4,
      title: 'My Receipts',
      icon: 'document-text-outline',
      description: 'Reports & receipts',
      screen: 'MyReceiptsScreen',
      count: '12',
      status: 'success'
    },
    {
      id: 5,
      title: 'Emergency Alerts',
      icon: 'shield-outline',
      description: 'Emergency tools',
      screen: 'EmergencyAlertsScreen',
      count: null,
      status: 'alert'
    },
    {
      id: 6,
      title: 'Route Progress',
      icon: 'trending-up-outline',
      description: 'Trip overview',
      screen: '', // no navigation for now
      count: '65%',
      status: 'success'
    }
  ];

  const statsData = [
    { label: 'Deliveries', value: '3', icon: 'cube-outline' },
    { label: 'Miles', value: '156', icon: 'speedometer-outline' },
    { label: 'Hours', value: '6.2', icon: 'time-outline' }
  ];

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const handleMenuPress = (item) => {
    // Add haptic feedback for iOS
    if (Platform.OS === 'ios') {
      // This would require expo-haptics: Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    
    // Navigate to screen if screen name exists
    if (item.screen && item.screen !== '') {
      try {
        navigation.navigate(item.screen);
      } catch (error) {
        console.warn(`Navigation to ${item.screen} failed:`, error);
        Alert.alert(
          'Navigation Error', 
          `Could not navigate to ${item.title}. Please ensure the screen is properly configured.`,
          [{ text: 'OK', style: 'default' }]
        );
      }
    } else {
      // Show alert for screens without navigation
      Alert.alert(
        'Coming Soon', 
        `${item.title} feature is coming soon!`, 
        [{ text: 'OK', style: 'default' }]
      );
    }
  };

  const handleEmergencyAlert = () => {
    setShowEmergencyModal(false);
    
    // Simulate emergency alert
    Alert.alert(
      'Emergency Alert Sent',
      'Dispatch and security have been notified immediately.\n\nAlert ID: #EMG-2024-001\nTime: ' + formatTime(new Date()),
      [
        { text: 'OK', style: 'default' },
        { text: 'Call Dispatch', style: 'default' }
      ]
    );
  };

  const getStatusColors = (status) => {
    const colors = {
      success: { icon: '#10B981', bg: '#ECFDF5', border: '#A7F3D0' },
      warning: { icon: '#F59E0B', bg: '#FFFBEB', border: '#FDE68A' },
      alert: { icon: '#EF4444', bg: '#FEF2F2', border: '#FECACA' },
      default: { icon: '#64748B', bg: '#F8FAFC', border: '#E2E8F0' }
    };
    return colors[status] || colors.default;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor="#FFFFFF" 
        translucent={false}
      />
      
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.appTitle}>ChainGuard</Text>
            <Text style={styles.appSubtitle}>Driver Dashboard</Text>
          </View>
          <View style={styles.profileSection}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarText}>JM</Text>
            </View>
            <Text style={styles.driverID}>#D-1234</Text>
          </View>
        </View>
      </View>

      {/* Status Bar */}
      <View style={styles.statusBar}>
        <View style={styles.statusContent}>
          <View style={styles.statusItem}>
            <View style={styles.activeIndicator} />
            <Text style={styles.statusLabel}>ACTIVE</Text>
          </View>
          <View style={styles.statusItem}>
            <Ionicons name="location-outline" size={16} color="#64748B" />
            <Text style={styles.statusLabel}>RT-4521</Text>
          </View>
          <View style={styles.statusItem}>
            <Ionicons name="time-outline" size={16} color="#64748B" />
            <Text style={styles.statusLabel}>{formatTime(currentTime)}</Text>
          </View>
        </View>
      </View>

      <ScrollView 
        style={styles.scrollContainer} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Main Function Grid - 2x3 Perfect Grid */}
        <View style={styles.mainGridContainer}>
          <View style={styles.mainGrid}>
            {menuItems.map((item) => {
              const colors = getStatusColors(item.status);
              return (
                <TouchableOpacity
                  key={item.id}
                  style={[styles.gridCard, { borderColor: colors.border }]}
                  onPress={() => handleMenuPress(item)}
                  activeOpacity={0.7}
                >
                  <View style={styles.cardHeader}>
                    <View style={[styles.iconContainer, { backgroundColor: colors.bg }]}>
                      <Ionicons name={item.icon} size={22} color={colors.icon} />
                    </View>
                    {item.count && (
                      <View style={styles.countBadge}>
                        <Text style={styles.countText}>{item.count}</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.cardTitle} numberOfLines={2}>
                    {item.title}
                  </Text>
                  <Text style={styles.cardDescription} numberOfLines={1}>
                    {item.description}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Stats Grid - 3x1 Perfect Grid */}
        <View style={styles.statsContainer}>
          <View style={styles.statsGrid}>
            {statsData.map((stat, index) => (
              <View key={index} style={styles.statCard}>
                <View style={styles.statIconContainer}>
                  <Ionicons name={stat.icon} size={20} color="#64748B" />
                </View>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Next Delivery Card */}
        <View style={styles.deliveryCardContainer}>
          <View style={styles.deliveryCard}>
            <View style={styles.deliveryHeader}>
              <Text style={styles.deliveryTitle}>Next Delivery</Text>
              <View style={styles.onTimeStatus}>
                <Ionicons name="trending-up" size={16} color="#10B981" />
                <Text style={styles.onTimeText}>On Time</Text>
              </View>
            </View>
            
            <Text style={styles.storeName}>Walmart Store #2847</Text>
            
            <View style={styles.deliveryInfo}>
              <View style={styles.addressContainer}>
                <Ionicons name="location-outline" size={16} color="#64748B" />
                <Text style={styles.storeAddress}>1234 Main Street, Dallas, TX</Text>
              </View>
              <View style={styles.etaContainer}>
                <Text style={styles.etaLabel}>ETA</Text>
                <Text style={styles.etaTime}>2:15 PM</Text>
              </View>
            </View>
            
            {/* Progress Section */}
            <View style={styles.progressContainer}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressLabel}>Route Progress</Text>
                <Text style={styles.progressPercent}>65%</Text>
              </View>
              <View style={styles.progressTrack}>
                <View style={[styles.progressBar, { width: '65%' }]} />
              </View>
            </View>

            {/* Quick Actions */}
            <View style={styles.quickActions}>
              <TouchableOpacity style={styles.quickActionButton}>
                <Ionicons name="navigate-outline" size={18} color="#3B82F6" />
                <Text style={styles.quickActionText}>Navigate</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.quickActionButton}>
                <Ionicons name="call-outline" size={18} color="#3B82F6" />
                <Text style={styles.quickActionText}>Call Store</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.activityContainer}>
          <Text style={styles.activityTitle}>Recent Activity</Text>
          <View style={styles.activityList}>
            {[
              { time: '1:45 PM', action: 'Delivery completed', location: 'Home Depot #1234' },
              { time: '1:30 PM', action: 'Check-in completed', location: 'Route checkpoint' },
              { time: '12:15 PM', action: 'Delivery started', location: 'Walmart Store #2847' }
            ].map((activity, index) => (
              <View key={index} style={styles.activityItem}>
                <View style={styles.activityTime}>
                  <Text style={styles.activityTimeText}>{activity.time}</Text>
                </View>
                <View style={styles.activityDetails}>
                  <Text style={styles.activityAction}>{activity.action}</Text>
                  <Text style={styles.activityLocation}>{activity.location}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Emergency Button with Animation */}
      <Animated.View style={[styles.emergencyButton, { transform: [{ scale: emergencyAnimation }] }]}>
        <TouchableOpacity
          style={styles.emergencyButtonInner}
          onPress={() => setShowEmergencyModal(true)}
          activeOpacity={0.8}
        >
          <Ionicons name="warning" size={28} color="#FFFFFF" />
          <Text style={styles.emergencyButtonText}>SOS</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Emergency Modal */}
      <Modal
        visible={showEmergencyModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowEmergencyModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.modalIconContainer}>
                <Ionicons name="warning" size={40} color="#EF4444" />
              </View>
              
              <Text style={styles.modalTitle}>Emergency Alert</Text>
              <Text style={styles.modalDescription}>
                This will immediately notify dispatch, security, and emergency contacts. Use only in genuine emergencies.
              </Text>
              
              <View style={styles.emergencyOptions}>
                <TouchableOpacity style={styles.emergencyOption}>
                  <Ionicons name="medical-outline" size={24} color="#EF4444" />
                  <Text style={styles.emergencyOptionText}>Medical Emergency</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.emergencyOption}>
                  <Ionicons name="shield-outline" size={24} color="#EF4444" />
                  <Text style={styles.emergencyOptionText}>Security Threat</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.emergencyOption}>
                  <Ionicons name="car-outline" size={24} color="#EF4444" />
                  <Text style={styles.emergencyOptionText}>Vehicle Issue</Text>
                </TouchableOpacity>
              </View>
              
              <View style={styles.modalActions}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setShowEmergencyModal(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={styles.confirmButton}
                  onPress={handleEmergencyAlert}
                >
                  <Text style={styles.confirmButtonText}>Send Alert</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  
  // Header Styles
  header: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  appTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0F172A',
    ...Platform.select({
      ios: { fontFamily: 'System' },
      android: { fontFamily: 'Roboto' },
    }),
  },
  appSubtitle: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 2,
    fontWeight: '500',
  },
  profileSection: {
    alignItems: 'center',
  },
  avatarContainer: {
    width: 48,
    height: 48,
    backgroundColor: '#F1F5F9',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#E2E8F0',
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#475569',
  },
  driverID: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 4,
    fontWeight: '500',
  },

  // Status Bar Styles
  statusBar: {
    backgroundColor: '#F8FAFC',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  statusContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  activeIndicator: {
    width: 8,
    height: 8,
    backgroundColor: '#10B981',
    borderRadius: 4,
  },
  statusLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#475569',
  },

  // Scroll Container
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },

  // Main Grid Styles
  mainGridContainer: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  mainGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  gridCard: {
    width: (width - 64) / 2,
    height: 130,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    padding: 16,
    justifyContent: 'space-between',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    minWidth: 32,
    alignItems: 'center',
  },
  countText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    lineHeight: 20,
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 16,
    fontWeight: '500',
  },

  // Stats Grid Styles
  statsContainer: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  statIconContainer: {
    marginBottom: 8,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },

  // Delivery Card Styles
  deliveryCardContainer: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  deliveryCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    padding: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  deliveryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  deliveryTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
  },
  onTimeStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  onTimeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#10B981',
  },
  storeName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#475569',
    marginBottom: 12,
  },
  deliveryInfo: {
    marginBottom: 20,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  storeAddress: {
    fontSize: 14,
    color: '#64748B',
    flex: 1,
  },
  etaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  etaLabel: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  etaTime: {
    fontSize: 18,
    fontWeight: '800',
    color: '#3B82F6',
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '500',
  },
  progressPercent: {
    fontSize: 13,
    fontWeight: '700',
    color: '#3B82F6',
  },
  progressTrack: {
    width: '100%',
    height: 8,
    backgroundColor: '#E2E8F0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#3B82F6',
    borderRadius: 4,
  },
  quickActions: {
    flexDirection: 'row',
    gap: 12,
  },
  quickActionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3B82F6',
  },

  // Activity Section
  activityContainer: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  activityTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 16,
  },
  activityList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
  },
  activityItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  activityTime: {
    width: 80,
    marginRight: 16,
  },
  activityTimeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  activityDetails: {
    flex: 1,
  },
  activityAction: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 2,
  },
  activityLocation: {
    fontSize: 12,
    color: '#64748B',
  },

  // Emergency Button Styles
  emergencyButton: {
    position: 'absolute',
    bottom: 32,
    right: 24,
    width: 72,
    height: 72,
    borderRadius: 36,
    ...Platform.select({
      ios: {
        shadowColor: '#EF4444',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  emergencyButtonInner: {
    width: '100%',
    height: '100%',
    backgroundColor: '#EF4444',
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emergencyButtonText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 2,
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    paddingHorizontal: 24,
    width: '100%',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    maxWidth: 380,
    width: '100%',
    alignSelf: 'center',
  },
  modalIconContainer: {
    width: 80,
    height: 80,
    backgroundColor: '#FEF2F2',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 12,
  },
  modalDescription: {
    fontSize: 15,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  emergencyOptions: {
    width: '100%',
    marginBottom: 24,
  },
  emergencyOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FEF2F2',
    borderRadius: 12,
    marginBottom: 8,
  },
  emergencyOptionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#DC2626',
  },
  modalActions: {
    flexDirection: 'row',
    gap: 16,
    width: '100%',
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 16,
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#475569',
  },
  confirmButton: {
    flex: 1,
    paddingVertical: 16,
    backgroundColor: '#EF4444',
    borderRadius: 12,
    alignItems: 'center',
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  // Bottom Spacing
  bottomSpacing: {
    height: 120,
  },
});

export default DriverDashboard;