import { Platform, SafeAreaView, ScrollView } from 'react-native';
import SupplyChainTheftManagement from '../../components/SupplyChainManagement'; // ✅ Adjust path if needed

export default function DashboardScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView
        contentContainerStyle={{
          paddingTop: Platform.OS === 'android' ? 35 : 0,
        }}
      >
        <SupplyChainTheftManagement />
      </ScrollView>
    </SafeAreaView>
  );
}
