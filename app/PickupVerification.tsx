
// NOTE: This file includes integration placeholders for photo capture, signature pad, and navigation
// Required dependencies:
//   npm install react-native-image-picker
//   npm install react-native-signature-canvas
//   npm install @react-navigation/native @react-navigation/native-stack

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Image,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { launchCamera } from 'react-native-image-picker';
import Signature from 'react-native-signature-canvas';

const PickupVerification = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPickup, setSelectedPickup] = useState(null);
  const [photoUri, setPhotoUri] = useState(null);
  const [signatureData, setSignatureData] = useState(null);
  const [showSignature, setShowSignature] = useState(false);

  const pickups = [
    {
      id: 'PU-001',
      customer: 'TechCorp Industries',
      driver: 'John Smith',
      vehicleId: 'TRK-001',
      scheduledTime: '09:00 AM',
      status: 'pending',
      weight: '25.5 kg',
      address: '123 Business Ave, Downtown',
      phone: '+1 (555) 123-4567',
      specialInstructions: 'Handle with care',
      pickupWindow: '09:00 - 12:00',
      verificationRequired: ['signature', 'photo']
    }
  ];

  const filteredPickups = pickups.filter(p =>
    (selectedTab === 'all' || p.status === selectedTab) &&
    (p.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const openPickup = (pickup) => {
    setSelectedPickup(pickup);
  };

  const closeModal = () => {
    setSelectedPickup(null);
    setPhotoUri(null);
    setSignatureData(null);
    setShowSignature(false);
  };

  const handleCameraLaunch = async () => {
    const result = await launchCamera({ mediaType: 'photo', saveToPhotos: true });
    if (result.assets && result.assets[0]) {
      setPhotoUri(result.assets[0].uri);
    }
  };

  const handleSignature = (signature) => {
    setSignatureData(signature);
    setShowSignature(false);
  };

  const verifyPickup = () => {
    Alert.alert("Success", "Pickup has been verified.");
    closeModal();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Pickup Verification</Text>

      <View style={styles.searchSection}>
        <Icon name="search" size={16} color="#888" />
        <TextInput
          style={styles.input}
          placeholder="Search by ID or customer"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.tabRow}>
        {['pending', 'verified', 'all'].map(tab => (
          <TouchableOpacity key={tab} onPress={() => setSelectedTab(tab)}>
            <Text style={[
              styles.tabItem,
              selectedTab === tab && styles.tabItemActive
            ]}>
              {tab.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {filteredPickups.map(pickup => (
        <TouchableOpacity key={pickup.id} style={styles.card} onPress={() => openPickup(pickup)}>
          <Text style={styles.cardTitle}>{pickup.customer}</Text>
          <Text style={styles.subText}>Pickup ID: {pickup.id}</Text>
          <Text style={styles.subText}>Driver: {pickup.driver}</Text>
          <Text style={styles.subText}>Time: {pickup.scheduledTime} - {pickup.pickupWindow}</Text>
          <Text style={styles.subText}>Status: {pickup.status}</Text>
        </TouchableOpacity>
      ))}

      {/* Verification Modal */}
      <Modal visible={!!selectedPickup} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <ScrollView style={styles.modalContainer}>
            {selectedPickup && (
              <>
                <Text style={styles.modalTitle}>Verify Pickup</Text>
                <Text style={styles.modalSub}>Customer: {selectedPickup.customer}</Text>
                <Text style={styles.modalSub}>Address: {selectedPickup.address}</Text>
                <Text style={styles.modalSub}>Phone: {selectedPickup.phone}</Text>
                <Text style={styles.modalSub}>Weight: {selectedPickup.weight}</Text>

                {/* Camera */}
                <Text style={styles.sectionHeader}>📸 Photo Proof</Text>
                <TouchableOpacity style={styles.btn} onPress={handleCameraLaunch}>
                  <Text style={styles.btnText}>Take Photo</Text>
                </TouchableOpacity>
                {photoUri && (
                  <Image source={{ uri: photoUri }} style={styles.previewImg} />
                )}

                {/* Signature */}
                <Text style={styles.sectionHeader}>✍️ Signature</Text>
                <TouchableOpacity style={styles.btnOutline} onPress={() => setShowSignature(true)}>
                  <Text style={styles.btnTextOutline}>Sign</Text>
                </TouchableOpacity>
                {signatureData && (
                  <Text style={styles.subText}>Signature Captured ✔</Text>
                )}
                {showSignature && (
                  <Signature
                    onOK={handleSignature}
                    onEmpty={() => setShowSignature(false)}
                    descriptionText="Sign to verify"
                    clearText="Clear"
                    confirmText="Save"
                    webStyle="body {background: #f9fafb;}"
                  />
                )}

                <TouchableOpacity style={styles.btnPrimary} onPress={verifyPickup}>
                  <Text style={styles.btnTextWhite}>Verify & Save</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={closeModal} style={styles.btnClose}>
                  <Text style={styles.btnText}>Cancel</Text>
                </TouchableOpacity>
              </>
            )}
          </ScrollView>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f9fafb' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 12,
    height: 40,
    elevation: 1
  },
  input: { flex: 1, marginLeft: 8 },
  tabRow: { flexDirection: 'row', marginBottom: 16 },
  tabItem: { marginRight: 12, fontSize: 14, color: '#6b7280' },
  tabItemActive: { color: '#1f2937', fontWeight: 'bold' },
  card: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 1
  },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#111827' },
  subText: { fontSize: 12, color: '#4b5563' },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    padding: 10
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    elevation: 4
  },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 8 },
  modalSub: { fontSize: 14, marginBottom: 6 },
  sectionHeader: { fontSize: 16, fontWeight: '600', marginTop: 16, marginBottom: 6 },
  previewImg: {
    width: '100%',
    height: 200,
    marginVertical: 10,
    borderRadius: 10
  },
  btn: {
    backgroundColor: '#1e40af',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center'
  },
  btnText: { color: '#fff', fontWeight: '600' },
  btnOutline: {
    borderColor: '#1e40af',
    borderWidth: 1,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 4
  },
  btnTextOutline: { color: '#1e40af', fontWeight: '600' },
  btnPrimary: {
    backgroundColor: '#16a34a',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 20
  },
  btnTextWhite: { color: '#fff', fontWeight: 'bold' },
  btnClose: {
    marginTop: 10,
    alignItems: 'center'
  }
});

export default PickupVerification;
