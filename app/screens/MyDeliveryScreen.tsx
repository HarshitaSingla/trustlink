// ✅ MyDeliveryScreen - for Expo Router (place in app/my-delivery.tsx)

import { Clock, MapPin, Navigation, PackageCheck, Store } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const MyDeliveryScreen: React.FC = () => {
  const currentDelivery = {
    id: 'DEL-345',
    pickupLocation: 'Warehouse 7, Sector 21',
    destination: 'Palm Residency, 3rd Floor, Tower C',
    scheduledTime: '11:00 AM',
    status: 'Out for Delivery'
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Delivery</Text>

      <View style={styles.card}>
        <View style={styles.row}><PackageCheck size={18} color="#22C55E" /><Text style={styles.label}> Delivery ID:</Text><Text style={styles.value}> {currentDelivery.id}</Text></View>
        <View style={styles.row}><Store size={18} color="#3B82F6" /><Text style={styles.label}> Pickup:</Text><Text style={styles.value}> {currentDelivery.pickupLocation}</Text></View>
        <View style={styles.row}><MapPin size={18} color="#EF4444" /><Text style={styles.label}> Destination:</Text><Text style={styles.value}> {currentDelivery.destination}</Text></View>
        <View style={styles.row}><Clock size={18} color="#F59E0B" /><Text style={styles.label}> Scheduled:</Text><Text style={styles.value}> {currentDelivery.scheduledTime}</Text></View>
        <View style={styles.row}><Navigation size={18} color="#6366F1" /><Text style={styles.label}> Status:</Text><Text style={styles.value}> {currentDelivery.status}</Text></View>
      </View>

      <TouchableOpacity style={styles.navBtn}>
        <Text style={styles.navBtnText}>Navigate to Destination</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20, paddingTop: 60 },
  heading: { fontSize: 22, fontWeight: 'bold', color: '#1F2937', marginBottom: 20 },
  card: {
    backgroundColor: '#F9FAFB', borderRadius: 12,
    padding: 20, borderColor: '#E5E7EB', borderWidth: 1, marginBottom: 30
  },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, flexWrap: 'wrap' },
  label: { fontSize: 14, fontWeight: '600', color: '#374151', marginLeft: 6 },
  value: { fontSize: 14, color: '#111827' },
  navBtn: {
    backgroundColor: '#2563EB', paddingVertical: 14,
    borderRadius: 10, alignItems: 'center'
  },
  navBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});

export default MyDeliveryScreen;
