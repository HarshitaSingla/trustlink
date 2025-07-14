import { Camera as ExpoCamera } from 'expo-camera';
import {
  AlertTriangle,
  Camera,
  Check,
  CheckCircle,
  Clock,
  FileText,
  MapPin,
  QrCode,
  RefreshCw,
  Share2,
  User,
  UserCheck
} from 'lucide-react-native';
import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const { width, height } = Dimensions.get('window');

// Types
type DeliveryStatus = 'on-schedule' | 'running-late' | 'at-location' | 'complete';
type ScreenMode = 'checkin' | 'qr-code' | 'verification' | 'receipt';

const CheckInScreen: React.FC = () => {
  // States
  const [location, setLocation] = useState('');
  const [remarks, setRemarks] = useState('');
  const [deliveryStatus, setDeliveryStatus] = useState<DeliveryStatus>('on-schedule');
  const [currentScreen, setCurrentScreen] = useState<ScreenMode>('checkin');
  const [delayReason, setDelayReason] = useState('');
  const [showDelayModal, setShowDelayModal] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  
  // Mock data for demonstration
  const driverData = {
    name: 'John Doe',
    id: 'DRV-12345',
    qrCode: 'QR-CODE-DATA-12345',
    deliveryId: 'DEL-67890'
  };

  const storeData = {
    name: 'Store Manager',
    storeName: 'Downtown Store #123'
  };

  // Camera permissions
  const requestCameraPermission = async () => {
    const { status } = await ExpoCamera.requestCameraPermissionsAsync();
    setHasPermission(status === 'granted');
  };

  // Status color helper
  const getStatusColor = (status: DeliveryStatus) => {
    switch (status) {
      case 'on-schedule': return '#10B981';
      case 'running-late': return '#F59E0B';
      case 'at-location': return '#3B82F6';
      case 'complete': return '#10B981';
      default: return '#6B7280';
    }
  };

  // Status icon helper
  const getStatusIcon = (status: DeliveryStatus) => {
    switch (status) {
      case 'on-schedule': return <CheckCircle size={16} color="#fff" />;
      case 'running-late': return <AlertTriangle size={16} color="#fff" />;
      case 'at-location': return <MapPin size={16} color="#fff" />;
      case 'complete': return <Check size={16} color="#fff" />;
      default: return <Clock size={16} color="#fff" />;
    }
  };

  // Handle status change
  const handleStatusChange = (status: DeliveryStatus) => {
    setDeliveryStatus(status);
    if (status === 'running-late') {
      setShowDelayModal(true);
    }
  };

  // Handle delay report submission
  const handleDelayReport = () => {
    if (!delayReason.trim()) {
      Alert.alert('Missing Info', 'Please provide a reason for the delay.');
      return;
    }
    setShowDelayModal(false);
    Alert.alert('Delay Report', `Delay reason: ${delayReason}`);
  };

  // Handle QR code tap
  const handleQRTap = () => {
    setCurrentScreen('verification');
    requestCameraPermission();
  };

  // Handle photo capture
  const handleCapturePhoto = async () => {
    // Mock photo capture - in real app, use camera
    setCapturedPhoto('mock-photo-uri');
  };

  // Handle verification submission
  const handleVerificationSubmit = () => {
    if (!capturedPhoto) {
      Alert.alert('Missing Photo', 'Please capture a verification photo.');
      return;
    }
    setCurrentScreen('receipt');
  };

  // Handle receipt sharing
  const handleShareReceipt = () => {
    Alert.alert('Receipt Shared', 'Digital receipt has been saved and shared.');
  };

  // Render QR Code Screen
  const renderQRCodeScreen = () => (
    <View style={styles.container}>
      <Text style={styles.heading}>Check-In Verification</Text>
      
      <View style={styles.qrContainer}>
        <View style={styles.qrCodeBox}>
          <QrCode size={150} color="#1F2937" />
          <Text style={styles.qrLabel}>Driver ID: {driverData.id}</Text>
        </View>
        
        <Text style={styles.qrInstruction}>
          Show this QR code to the store handler for scanning to verify your check-in.
        </Text>
        
        <TouchableOpacity 
          style={styles.qrTapArea}
          onPress={handleQRTap}
        >
          <Text style={styles.qrTapText}>Tap to Continue to Verification</Text>
        </TouchableOpacity>
      </View>
      
      <Text style={styles.securityNote}>
        Your check-in keeps our network informed and secure.
      </Text>
      
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => setCurrentScreen('checkin')}
      >
        <Text style={styles.backButtonText}>← Back to Check-In</Text>
      </TouchableOpacity>
    </View>
  );

  // Render Verification Screen
  const renderVerificationScreen = () => (
    <View style={styles.container}>
      <Text style={styles.heading}>Verification Photo</Text>
      
      <Text style={styles.verificationInstruction}>
        Please take a dual photo with the store employee — both faces must be clearly visible.
      </Text>
      
      <View style={styles.cameraContainer}>
        {capturedPhoto ? (
          <View style={styles.photoPreview}>
            <View style={styles.mockPhoto}>
              <User size={40} color="#6B7280" />
              <Text style={styles.mockPhotoText}>Verification Photo</Text>
            </View>
            <TouchableOpacity 
              style={styles.retakeButton}
              onPress={() => setCapturedPhoto(null)}
            >
              <RefreshCw size={16} color="#fff" />
              <Text style={styles.retakeText}>Retake Photo</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.cameraPreview}>
            <Camera size={60} color="#6B7280" />
            <Text style={styles.cameraText}>Camera Preview</Text>
            <TouchableOpacity 
              style={styles.captureButton}
              onPress={handleCapturePhoto}
            >
              <Camera size={20} color="#fff" />
              <Text style={styles.captureText}>Capture Photo</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      
      {capturedPhoto && (
        <Text style={styles.photoNote}>
          This photo will be used to validate secure delivery and generate your digital receipt.
        </Text>
      )}
      
      <TouchableOpacity 
        style={[styles.submitButton, !capturedPhoto && styles.disabledButton]}
        onPress={handleVerificationSubmit}
        disabled={!capturedPhoto}
      >
        <Check size={16} color="#fff" />
        <Text style={styles.submitText}>Confirm & Submit</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => setCurrentScreen('qr-code')}
      >
        <Text style={styles.backButtonText}>← Back to QR Code</Text>
      </TouchableOpacity>
    </View>
  );

  // Render Receipt Screen
  const renderReceiptScreen = () => (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Digital Receipt</Text>
      
      <View style={styles.receiptContainer}>
        <View style={styles.receiptHeader}>
          <CheckCircle size={24} color="#10B981" />
          <Text style={styles.receiptTitle}>Delivery Verified Successfully</Text>
        </View>
        
        <View style={styles.receiptSection}>
          <Text style={styles.sectionTitle}>Delivery Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery ID:</Text>
            <Text style={styles.summaryValue}>{driverData.deliveryId}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Pickup Time:</Text>
            <Text style={styles.summaryValue}>10:30 AM</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery Time:</Text>
            <Text style={styles.summaryValue}>11:45 AM</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Status:</Text>
            <Text style={[styles.summaryValue, { color: '#10B981' }]}>Completed</Text>
          </View>
        </View>
        
        <View style={styles.receiptSection}>
          <Text style={styles.sectionTitle}>Personnel</Text>
          <View style={styles.personnelRow}>
            <User size={16} color="#6B7280" />
            <View style={styles.personnelInfo}>
              <Text style={styles.personnelName}>{driverData.name}</Text>
              <Text style={styles.personnelRole}>Driver</Text>
            </View>
          </View>
          <View style={styles.personnelRow}>
            <UserCheck size={16} color="#6B7280" />
            <View style={styles.personnelInfo}>
              <Text style={styles.personnelName}>{storeData.name}</Text>
              <Text style={styles.personnelRole}>Store Employee</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.receiptSection}>
          <Text style={styles.sectionTitle}>Verification Photo</Text>
          <View style={styles.receiptPhoto}>
            <User size={30} color="#6B7280" />
            <Text style={styles.photoLabel}>Dual Verification Photo</Text>
          </View>
        </View>
        
        <Text style={styles.auditNote}>
          Receipt saved to audit trail. Delivery verified successfully.
        </Text>
      </View>
      
      <TouchableOpacity 
        style={styles.shareButton}
        onPress={handleShareReceipt}
      >
        <Share2 size={16} color="#fff" />
        <Text style={styles.shareText}>Share Receipt</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => setCurrentScreen('checkin')}
      >
        <Text style={styles.backButtonText}>← New Check-In</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  // Render main check-in screen
  const renderCheckInScreen = () => (
    <View style={styles.container}>
      <Text style={styles.heading}>Check-In</Text>
      
      {/* Location Input */}
      <View style={styles.inputGroup}>
        <MapPin size={20} color="#6B7280" />
        <TextInput
          style={styles.input}
          placeholder="Enter your location"
          placeholderTextColor="#9CA3AF"
          value={location}
          onChangeText={setLocation}
        />
      </View>
      
      {/* Status Selection */}
      <Text style={styles.statusLabel}>Delivery Status</Text>
      <View style={styles.statusContainer}>
        {[
          { key: 'on-schedule', label: 'On Schedule' },
          { key: 'running-late', label: 'Running Late' },
          { key: 'at-location', label: 'At Delivery Location' },
          { key: 'complete', label: 'Delivery Complete' }
        ].map((status) => (
          <TouchableOpacity
            key={status.key}
            style={[
              styles.statusButton,
              { backgroundColor: deliveryStatus === status.key ? getStatusColor(status.key as DeliveryStatus) : '#F3F4F6' }
            ]}
            onPress={() => handleStatusChange(status.key as DeliveryStatus)}
          >
            {deliveryStatus === status.key && getStatusIcon(status.key as DeliveryStatus)}
            <Text style={[
              styles.statusText,
              { color: deliveryStatus === status.key ? '#fff' : '#374151' }
            ]}>
              {status.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      {/* Remarks Input */}
      <View style={styles.inputGroup}>
        <FileText size={20} color="#6B7280" />
        <TextInput
          style={[styles.input, styles.remarksInput]}
          placeholder="Additional remarks (optional)"
          placeholderTextColor="#9CA3AF"
          value={remarks}
          onChangeText={setRemarks}
          multiline
        />
      </View>
      
      {/* QR Code Button */}
      <TouchableOpacity 
        style={styles.qrButton}
        onPress={() => setCurrentScreen('qr-code')}
      >
        <QrCode size={20} color="#fff" />
        <Text style={styles.qrButtonText}>Generate QR Code</Text>
      </TouchableOpacity>
      
      {/* Delay Modal */}
      <Modal
        visible={showDelayModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowDelayModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Delay Report</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Reason for delay..."
              placeholderTextColor="#9CA3AF"
              value={delayReason}
              onChangeText={setDelayReason}
              multiline
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={styles.modalCancelButton}
                onPress={() => setShowDelayModal(false)}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.modalSubmitButton}
                onPress={handleDelayReport}
              >
                <Text style={styles.modalSubmitText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );

  // Main render based on current screen
  switch (currentScreen) {
    case 'qr-code':
      return renderQRCodeScreen();
    case 'verification':
      return renderVerificationScreen();
    case 'receipt':
      return renderReceiptScreen();
    default:
      return renderCheckInScreen();
  }
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff', 
    paddingTop: 60, 
    paddingHorizontal: 20 
  },
  heading: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#1F2937', 
    marginBottom: 30 
  },
  
  // Input styles
  inputGroup: {
    flexDirection: 'row', 
    alignItems: 'center', 
    borderWidth: 1,
    borderColor: '#E5E7EB', 
    borderRadius: 12, 
    paddingHorizontal: 16,
    paddingVertical: 12, 
    marginBottom: 20, 
    backgroundColor: '#F9FAFB'
  },
  input: { 
    flex: 1, 
    fontSize: 16, 
    marginLeft: 12, 
    color: '#111827' 
  },
  remarksInput: {
    minHeight: 60,
    textAlignVertical: 'top'
  },
  
  // Status styles
  statusLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12
  },
  statusContainer: {
    marginBottom: 20
  },
  statusButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginBottom: 8
  },
  statusText: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8
  },
  
  // QR Code styles
  qrButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3B82F6',
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 20
  },
  qrButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8
  },
  qrContainer: {
    alignItems: 'center',
    marginBottom: 40
  },
  qrCodeBox: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    marginBottom: 20
  },
  qrLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 10
  },
  qrInstruction: {
    fontSize: 16,
    color: '#374151',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24
  },
  qrTapArea: {
    backgroundColor: '#10B981',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10
  },
  qrTapText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  },
  securityNote: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 20
  },
  
  // Verification styles
  verificationInstruction: {
    fontSize: 16,
    color: '#374151',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24
  },
  cameraContainer: {
    marginBottom: 30
  },
  cameraPreview: {
    height: 300,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
  cameraText: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 10,
    marginBottom: 20
  },
  captureButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10
  },
  captureText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8
  },
  photoPreview: {
    alignItems: 'center'
  },
  mockPhoto: {
    height: 200,
    width: width - 40,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15
  },
  mockPhotoText: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 8
  },
  retakeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F59E0B',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8
  },
  retakeText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6
  },
  photoNote: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20
  },
  
  // Button styles
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#10B981',
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 20
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8
  },
  disabledButton: {
    backgroundColor: '#9CA3AF'
  },
  backButton: {
    alignItems: 'center',
    paddingVertical: 12
  },
  backButtonText: {
    color: '#3B82F6',
    fontSize: 16,
    fontWeight: '600'
  },
  
  // Receipt styles
  receiptContainer: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20
  },
  receiptHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  receiptTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginLeft: 10
  },
  receiptSection: {
    marginBottom: 20
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  summaryLabel: {
    fontSize: 14,
    color: '#6B7280'
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937'
  },
  personnelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  personnelInfo: {
    marginLeft: 10
  },
  personnelName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937'
  },
  personnelRole: {
    fontSize: 12,
    color: '#6B7280'
  },
  receiptPhoto: {
    height: 100,
    backgroundColor: '#E5E7EB',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  photoLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 5
  },
  auditNote: {
    fontSize: 14,
    color: '#059669',
    textAlign: 'center',
    fontWeight: '500'
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3B82F6',
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 20
  },
  shareText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8
  },
  
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    width: width - 40,
    maxHeight: height * 0.4
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 20,
    textAlign: 'center'
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    color: '#1F2937',
    minHeight: 80,
    textAlignVertical: 'top',
    marginBottom: 20
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  modalCancelButton: {
    backgroundColor: '#F3F4F6',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    flex: 1,
    marginRight: 10
  },
  modalCancelText: {
    color: '#6B7280',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center'
  },
  modalSubmitButton: {
    backgroundColor: '#F59E0B',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    flex: 1,
    marginLeft: 10
  },
  modalSubmitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center'
  }
});

export default CheckInScreen;