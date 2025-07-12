// ✅ Emergency screen file for expo-router (place under app/emergency.tsx)

import { AlertTriangle, Bell, Clock, CloudDrizzle, MapPin, Radio, Zap } from 'lucide-react-native';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const EmergencyScreen = () => {
  const [currentLocation] = useState({ latitude: 28.6139, longitude: 77.2090 });
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'Emergency',
      message: 'Vehicle breakdown reported on Route 45. Emergency services dispatched.',
      time: '2 min ago',
      locationName: 'Route 45, Sector 12'
    },
    {
      id: 2,
      type: 'Traffic',
      message: 'Heavy traffic congestion due to construction work. Expect 15-20 min delays.',
      time: '5 min ago',
      locationName: 'Main Street Junction'
    }
  ]);

  const getAlertIcon = (type: string): JSX.Element => {
    switch (type) {
      case 'Emergency': return <Zap size={16} color="#DC2626" />;
      case 'Traffic': return <AlertTriangle size={16} color="#F59E0B" />;
      case 'Weather': return <CloudDrizzle size={16} color="#3B82F6" />;
      default: return <Bell size={16} color="#6B7280" />;
    }
  };

  const handleEmergencyTrigger = () => {
    const newAlert = {
      id: alerts.length + 1,
      type: 'Emergency',
      message: 'Emergency alert triggered by driver.',
      time: 'Just now',
      locationName: 'Current Location'
    };
    setAlerts(prev => [newAlert, ...prev]);
    Alert.alert('Emergency Alert Sent', 'Your emergency alert has been sent.');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Emergency & Alerts</Text>
        <View style={styles.badge}><Text style={styles.badgeText}>{alerts.length} Active</Text></View>
      </View>

      <ScrollView style={styles.scrollView}>
        {alerts.map(alert => (
          <View key={alert.id} style={styles.alertCard}>
            <View style={styles.rowBetween}>
              <View style={styles.row}>
                {getAlertIcon(alert.type)}
                <Text style={[styles.alertType, { marginLeft: 6 }]}>{alert.type}</Text>
              </View>
              <Text style={styles.distance}>1.2 km</Text>
            </View>
            <Text style={styles.message}>{alert.message}</Text>
            <View style={styles.rowBetween}>
              <View style={styles.row}><Clock size={14} color="#6B7280" /><Text style={styles.metaText}> {alert.time}</Text></View>
              <View style={styles.row}><MapPin size={14} color="#6B7280" /><Text style={styles.metaText}> {alert.locationName}</Text></View>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.triggerBtn} onPress={handleEmergencyTrigger}>
          <Radio size={20} color="#fff" />
          <Text style={styles.triggerText}>  Trigger Emergency</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    padding: 16, paddingTop: 48, borderBottomWidth: 1, borderColor: '#eee'
  },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#111' },
  badge: {
    backgroundColor: '#FEF3C7', paddingHorizontal: 12, paddingVertical: 6,
    borderRadius: 20
  },
  badgeText: { color: '#92400E', fontWeight: 'bold', fontSize: 12 },
  scrollView: { paddingHorizontal: 16, paddingTop: 12 },
  alertCard: {
    backgroundColor: '#fff', borderRadius: 12, padding: 16,
    marginBottom: 12, borderWidth: 1, borderColor: '#e5e7eb'
  },
  alertType: { fontWeight: 'bold', fontSize: 14 },
  message: { color: '#111827', fontSize: 15, marginVertical: 10 },
  distance: {
    backgroundColor: '#DC2626', color: '#fff', fontSize: 12,
    paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8
  },
  row: { flexDirection: 'row', alignItems: 'center' },
  rowBetween: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
  },
  metaText: { fontSize: 12, color: '#6B7280' },
  footer: { padding: 16, borderTopWidth: 1, borderColor: '#eee' },
  triggerBtn: {
    backgroundColor: '#DC2626', borderRadius: 10,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 14
  },
  triggerText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});

export default EmergencyScreen;
