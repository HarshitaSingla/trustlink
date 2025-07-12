
import {
    AlertTriangle,
    Bell,
    CheckCircle,
    ChevronDown,
    ChevronUp,
    Clock,
    Map,
    Navigation,
    Timer,
    Truck,
    XCircle,
} from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import {
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

type DeliveryStatus = 'on-time' | 'approaching' | 'delayed' | 'delivered' | 'scheduled';

type Delivery = {
  id: string;
  driverId: string;
  plate: string;
  eta: Date;
  status: DeliveryStatus;
  route: string;
  distance: string;
  notes: string;
  cargo: string;
  destination: string;
};

export default function DeliverySchedule() {
  const [activeTab, setActiveTab] = useState<'today' | 'upcoming' | 'completed'>('today');
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [showMap, setShowMap] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const deliveries: Record<'today' | 'upcoming' | 'completed', Delivery[]> = {
    today: [
      {
        id: 'TRUCK-789',
        driverId: 'Driver-X92',
        plate: 'TRK-4567',
        eta: new Date(Date.now() + 45 * 60 * 1000),
        status: 'on-time',
        route: 'Route A-North',
        distance: '12.3 km',
        notes: 'High-priority delivery. Contains sensitive electronics. Requires signature confirmation.',
        cargo: 'Electronics Package',
        destination: 'Warehouse B-12',
      },
      {
        id: 'TRUCK-456',
        driverId: 'Driver-Y34',
        plate: 'TRK-8901',
        eta: new Date(Date.now() + 15 * 60 * 1000),
        status: 'approaching',
        route: 'Route B-East',
        distance: '3.7 km',
        notes: 'Standard delivery. Check for damaged packaging on arrival.',
        cargo: 'General Supplies',
        destination: 'Store Location A',
      },
      {
        id: 'TRUCK-123',
        driverId: 'Driver-Z89',
        plate: 'TRK-2345',
        eta: new Date(Date.now() - 12 * 60 * 1000),
        status: 'delayed',
        route: 'Route C-South',
        distance: '8.1 km',
        notes: 'Delayed due to traffic. Driver has been notified to expedite.',
        cargo: 'Pharmaceuticals',
        destination: 'Distribution Center',
      },
    ],
    upcoming: [
      {
        id: 'TRUCK-234',
        driverId: 'Driver-A45',
        plate: 'TRK-6789',
        eta: new Date(Date.now() + 2 * 60 * 60 * 1000),
        status: 'scheduled',
        route: 'Route D-West',
        distance: '25.4 km',
        notes: 'Scheduled for afternoon delivery. Temperature-sensitive cargo.',
        cargo: 'Frozen Goods',
        destination: 'Cold Storage Facility',
      },
      {
        id: 'TRUCK-567',
        driverId: 'Driver-B78',
        plate: 'TRK-3456',
        eta: new Date(Date.now() + 4 * 60 * 60 * 1000),
        status: 'scheduled',
        route: 'Route E-Central',
        distance: '18.9 km',
        notes: 'Evening delivery window. Requires loading dock access.',
        cargo: 'Heavy Machinery',
        destination: 'Industrial Complex',
      },
    ],
    completed: [
      {
        id: 'TRUCK-890',
        driverId: 'Driver-C23',
        plate: 'TRK-7890',
        eta: new Date(Date.now() - 2 * 60 * 60 * 1000),
        status: 'delivered',
        route: 'Route F-North',
        distance: '15.2 km',
        notes: 'Successfully delivered. All items accounted for.',
        cargo: 'Office Supplies',
        destination: 'Corporate Office',
      },
    ],
  };

  const getStatusColor = (status: DeliveryStatus) => {
    switch (status) {
      case 'on-time':
      case 'delivered':
        return styles.green;
      case 'approaching':
        return styles.blue;
      case 'delayed':
        return styles.red;
      case 'scheduled':
      default:
        return styles.gray;
    }
  };

  const getStatusIcon = (status: DeliveryStatus) => {
    switch (status) {
      case 'on-time':
      case 'delivered':
        return <CheckCircle size={16} />;
      case 'approaching':
        return <Navigation size={16} />;
      case 'delayed':
        return <AlertTriangle size={16} />;
      case 'scheduled':
      default:
        return <Clock size={16} />;
    }
  };

  const formatCountdown = (eta: Date) => {
    const now = currentTime;
    const timeDiff = eta.getTime() - now.getTime();
    const isLate = timeDiff < 0;
    const abs = Math.abs(timeDiff);
    const hours = Math.floor(abs / (1000 * 60 * 60));
    const minutes = Math.floor((abs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((abs % (1000 * 60)) / 1000);
    const formatted = `${hours > 0 ? `${hours}h ` : ''}${minutes}m ${seconds}s`;
    return isLate ? `${formatted} LATE` : formatted;
  };

  const isDelayed = (eta: Date) => {
    return eta.getTime() - currentTime.getTime() < -10 * 60 * 1000;
  };

  const isApproaching = (eta: Date) => {
    const diff = eta.getTime() - currentTime.getTime();
    return diff > 0 && diff < 15 * 60 * 1000;
  };

  const MapView = () => (
  <Modal visible={showMap} animationType="slide" transparent>
    <View style={styles.modalOverlay}>
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Live Tracking Map</Text>
          <TouchableOpacity onPress={() => setShowMap(false)}>
            <XCircle size={24} />
          </TouchableOpacity>
        </View>

        <View style={styles.mapArea}>
          <Text style={{ color: '#555', marginBottom: 12 }}>[Simulated Map View]</Text>

          {/* 🚚 Simulated Truck Icons */}
          {Object.values(deliveries)
            .flat()
            .filter((delivery) => ['on-time', 'approaching', 'delayed'].includes(delivery.status))
            .map((delivery) => (
              <View
                key={delivery.id}
                style={StyleSheet.flatten([
                  styles.truckIcon,
                  delivery.status === 'on-time' && { backgroundColor: '#4ade80' },
                  delivery.status === 'approaching' && { backgroundColor: '#60a5fa' },
                  delivery.status === 'delayed' && { backgroundColor: '#f87171' }
                ])}
              >
                <Truck size={12} color="white" />
              </View>
            ))}
        </View>

        {/* 🧭 Legend */}
        <View style={styles.mapLegend}>
          <Text style={styles.legendTitle}>Legend</Text>
          <View style={styles.legendItem}>
            <View style={[styles.dot, { backgroundColor: '#4ade80' }]} />
            <Text>On Time</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.dot, { backgroundColor: '#60a5fa' }]} />
            <Text>Approaching</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.dot, { backgroundColor: '#f87171' }]} />
            <Text>Delayed</Text>
          </View>
        </View>
      </View>
    </View>
  </Modal>
);

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Truck size={24} color="#2563eb" />
          <View>
            <Text style={styles.title}>Delivery Schedule</Text>
            <Text style={styles.subtitle}>Real-time tracking and ETA monitoring</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <Timer size={16} />
          <Text style={styles.timerText}>Auto-updates every 30s</Text>
          <TouchableOpacity style={styles.mapButton} onPress={() => setShowMap(true)}>
            <Map size={16} color="#fff" />
            <Text style={styles.mapButtonText}>Tracking Map</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        {(['today', 'upcoming', 'completed'] as const).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tabButton, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)} ({deliveries[tab].length})
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Cards */}
      {deliveries[activeTab].map((delivery) => (
        <View
          key={delivery.id}
          style={[
            styles.card,
            isDelayed(delivery.eta) && styles.delayedCard,
          ]}
        >
          <View style={styles.cardHeader}>
            <View style={styles.cardLeft}>
              <Truck size={20} color={isDelayed(delivery.eta) ? 'red' : 'blue'} />
              <View>
                <Text style={styles.cardTitle}>{delivery.id}</Text>
                <Text style={styles.cardSubtitle}>{delivery.driverId}</Text>
                <Text style={styles.cardPlate}>Plate: {delivery.plate}</Text>
              </View>
            </View>
            <View style={styles.cardRight}>
              <View style={styles.status}>
                {getStatusIcon(delivery.status)}
                {isDelayed(delivery.eta) && <AlertTriangle size={16} color="red" />}
              </View>
              <Text style={styles.etaText}>
                {activeTab === 'completed'
                  ? `Delivered ${delivery.eta.toLocaleTimeString()}`
                  : formatCountdown(delivery.eta)}
              </Text>
              <Text style={styles.distanceText}>{delivery.distance}</Text>
              {isApproaching(delivery.eta) && (
                <View style={styles.approaching}>
                  <Bell size={14} color="blue" />
                  <Text style={styles.approachingText}>Approaching</Text>
                </View>
              )}
              <TouchableOpacity onPress={() => setExpandedCard(expandedCard === delivery.id ? null : delivery.id)}>
                {expandedCard === delivery.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </TouchableOpacity>
            </View>
          </View>

          {expandedCard === delivery.id && (
            <View style={styles.cardDetails}>
              <Text style={styles.sectionTitle}>Delivery Details</Text>
              <Text style={styles.detail}>Route: {delivery.route}</Text>
              <Text style={styles.detail}>Cargo: {delivery.cargo}</Text>
              <Text style={styles.detail}>Destination: {delivery.destination}</Text>

              <Text style={styles.sectionTitle}>Delivery Notes</Text>
              <Text style={styles.notes}>{delivery.notes}</Text>
            </View>
          )}
        </View>
      ))}

      {/* Alert Box */}
      <View style={styles.alertBox}>
        <View style={styles.alertHeader}>
          <Bell size={20} color="blue" />
          <Text style={styles.alertTitle}>Arrival Alerts</Text>
        </View>
        <Text style={styles.alertText}>🔵 Notifications when truck is within 5km</Text>
        <Text style={styles.alertText}>🟢 Alerts when truck has arrived at destination</Text>
        <Text style={styles.alertText}>🔴 Emergency alerts for delays &gt;15 minutes</Text>
      </View>

      <MapView />

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb', padding: 16 },
  header: { backgroundColor: '#fff', padding: 16, borderRadius: 12, marginBottom: 12 },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  headerRight: { marginTop: 12 },
  title: { fontSize: 20, fontWeight: 'bold', color: '#111' },
  subtitle: { fontSize: 14, color: '#555' },
  timerText: { fontSize: 12, color: '#444' },
  mapButton: { marginTop: 8, backgroundColor: '#2563eb', padding: 8, borderRadius: 8, flexDirection: 'row', alignItems: 'center', gap: 4 },
  mapButtonText: { color: '#fff', fontWeight: '600' },

  tabs: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 12 },
  tabButton: { padding: 10, borderBottomWidth: 2, borderBottomColor: 'transparent' },
  activeTab: { borderBottomColor: '#2563eb' },
  tabText: { fontSize: 14, color: '#555' },
  activeTabText: { color: '#2563eb', fontWeight: 'bold' },

  card: { backgroundColor: '#fff', padding: 12, borderRadius: 12, marginBottom: 10 },
  delayedCard: { backgroundColor: '#fee2e2', borderColor: '#fca5a5', borderWidth: 1 },

  cardHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  cardLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  cardTitle: { fontWeight: 'bold', fontSize: 16 },
  cardSubtitle: { fontSize: 12, color: '#666' },
  cardPlate: { fontSize: 10, color: '#999' },
  cardRight: { alignItems: 'flex-end', gap: 4 },
  status: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  etaText: { fontSize: 14, fontWeight: '500' },
  distanceText: { fontSize: 12, color: '#999' },
  approaching: { flexDirection: 'row', alignItems: 'center' },
  approachingText: { fontSize: 10, color: '#2563eb', marginLeft: 4 },

  cardDetails: { marginTop: 10 },
  sectionTitle: { fontWeight: 'bold', marginTop: 6 },
  detail: { fontSize: 14, color: '#444', marginVertical: 2 },
  notes: { fontSize: 13, color: '#555', marginTop: 4 },

  alertBox: { backgroundColor: '#fff', padding: 16, borderRadius: 12, marginTop: 20 },
  alertHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 },
  alertTitle: { fontSize: 16, fontWeight: '600' },
  alertText: { fontSize: 14, color: '#555', marginVertical: 2 },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' },
  modalContainer: { backgroundColor: '#fff', borderRadius: 12, padding: 16, width: '90%', height: '80%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  modalTitle: { fontSize: 18, fontWeight: 'bold' },
  mapArea: { flex: 1, backgroundColor: '#e0f2fe', justifyContent: 'center', alignItems: 'center', borderRadius: 10, marginBottom: 10 },
  mapLegend: { padding: 8, backgroundColor: '#f9fafb', borderRadius: 8 },
  legendTitle: { fontWeight: 'bold', marginBottom: 4 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 },
  dot: { width: 8, height: 8, borderRadius: 4 },

  green: { backgroundColor: '#4ade80' },
  blue: { backgroundColor: '#60a5fa' },
  red: { backgroundColor: '#f87171' },
  gray: { backgroundColor: '#d1d5db' },


  truckIcon: {
  width: 30,
  height: 30,
  borderRadius: 15,
  justifyContent: 'center',
  alignItems: 'center',
  margin: 4,
  elevation: 3,
  shadowColor: '#000',
  shadowOpacity: 0.2,
  shadowRadius: 2,
}

});
