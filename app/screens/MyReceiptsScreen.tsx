// ✅ MyReceiptsScreen - for Expo Router (place in app/my-receipts.tsx)

import { Calendar, CheckCircle, Eye, FileText } from 'lucide-react-native';
import React, { useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const MyReceiptsScreen: React.FC = () => {
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const receipts = [
    {
      id: 'RCP-101',
      date: '2025-07-12',
      amount: '₹1,200',
      status: 'Paid'
    },
    {
      id: 'RCP-102',
      date: '2025-07-10',
      amount: '₹950',
      status: 'Paid'
    }
  ];

  const openReceipt = (receipt: any) => {
    setSelectedReceipt(receipt);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Receipts</Text>

      <ScrollView contentContainerStyle={styles.scrollArea}>
        {receipts.map(receipt => (
          <View key={receipt.id} style={styles.card}>
            <View style={styles.rowBetween}>
              <View style={styles.row}><FileText size={16} color="#2563EB" /><Text style={styles.label}> {receipt.id}</Text></View>
              <TouchableOpacity onPress={() => openReceipt(receipt)}>
                <Eye size={18} color="#6B7280" />
              </TouchableOpacity>
            </View>
            <View style={styles.row}><Calendar size={14} color="#6B7280" /><Text style={styles.meta}> {receipt.date}</Text></View>
            <View style={styles.row}><CheckCircle size={14} color="#22C55E" /><Text style={styles.meta}> {receipt.status}</Text></View>
            <Text style={styles.amount}>{receipt.amount}</Text>
          </View>
        ))}
      </ScrollView>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            {selectedReceipt && (
              <>
                <Text style={styles.modalTitle}>{selectedReceipt?.id}</Text>
                <Text>Date: {selectedReceipt?.date}</Text>
                <Text>Amount: {selectedReceipt?.amount}</Text>
                <Text>Status: {selectedReceipt?.status}</Text>
              </>
            )}
            <TouchableOpacity style={styles.closeBtn} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 60, paddingHorizontal: 20 },
  heading: { fontSize: 22, fontWeight: 'bold', color: '#1F2937', marginBottom: 20 },
  scrollArea: { paddingBottom: 20 },
  card: {
    backgroundColor: '#F3F4F6', borderRadius: 12, padding: 16,
    marginBottom: 14, borderWidth: 1, borderColor: '#E5E7EB'
  },
  row: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  label: { fontSize: 15, fontWeight: '500', color: '#111827' },
  meta: { fontSize: 13, color: '#6B7280', marginLeft: 6 },
  amount: { fontSize: 16, fontWeight: 'bold', color: '#111827', marginTop: 10 },
  modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.3)' },
  modalCard: { backgroundColor: '#fff', padding: 24, borderRadius: 12, width: '80%' },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  closeBtn: { marginTop: 20, backgroundColor: '#EF4444', padding: 12, borderRadius: 8, alignItems: 'center' },
  closeText: { color: '#fff', fontWeight: 'bold' }
});

export default MyReceiptsScreen;
