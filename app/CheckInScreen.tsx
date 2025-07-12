// ✅ CheckInScreen - for Expo Router (place in app/checkin.tsx)

import { Check, MapPin, UserCheck } from 'lucide-react-native';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const CheckInScreen: React.FC = () => {
  const [location, setLocation] = useState('');
  const [remarks, setRemarks] = useState('');

  const handleCheckIn = () => {
    if (!location.trim()) {
      Alert.alert('Missing Info', 'Please enter your location.');
      return;
    }
    Alert.alert('Checked In', `Location: ${location}\nRemarks: ${remarks || 'None'}`);
    setLocation('');
    setRemarks('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Check-In</Text>

      <View style={styles.inputGroup}>
        <MapPin size={18} color="#6B7280" />
        <TextInput
          style={styles.input}
          placeholder="Enter location"
          value={location}
          onChangeText={setLocation}
        />
      </View>

      <View style={styles.inputGroup}>
        <UserCheck size={18} color="#6B7280" />
        <TextInput
          style={styles.input}
          placeholder="Remarks (optional)"
          value={remarks}
          onChangeText={setRemarks}
        />
      </View>

      <TouchableOpacity style={styles.checkInBtn} onPress={handleCheckIn}>
        <Check size={20} color="#fff" />
        <Text style={styles.checkInText}>  Submit Check-In</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 60, paddingHorizontal: 20 },
  heading: { fontSize: 22, fontWeight: 'bold', color: '#1F2937', marginBottom: 30 },
  inputGroup: {
    flexDirection: 'row', alignItems: 'center', borderWidth: 1,
    borderColor: '#E5E7EB', borderRadius: 10, paddingHorizontal: 12,
    paddingVertical: 10, marginBottom: 20, backgroundColor: '#F9FAFB'
  },
  input: { flex: 1, fontSize: 16, marginLeft: 10, color: '#111827' },
  checkInBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#10B981', paddingVertical: 16, borderRadius: 10
  },
  checkInText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});

export default CheckInScreen;
