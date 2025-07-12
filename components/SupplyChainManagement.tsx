// import {
//     Activity,
//     AlertTriangle,
//     Bell,
//     Calendar,
//     Clock,
//     Home,
//     Package,
//     RefreshCw,
//     Shield,
//     UserCheck,
//     Users,
//     UserX
// } from 'lucide-react-native';
// import React, { useState } from 'react';
// import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// const SupplyChainTheftManagement = () => {
//   const [activeTab, setActiveTab] = useState('dashboard');

//   const mainFeatures = [
//     { id: 'team-assignments', title: 'Team Assignments', icon: Users, subtitle: '12 handlers assigned' },
//     { id: 'delivery-schedule', title: 'Delivery Schedule', icon: Calendar, subtitle: '8 routes scheduled' },
//     { id: 'handler-status', title: 'Handler Status', icon: Shield, subtitle: '11 verified, 1 pending' },
//     { id: 'alert-monitor', title: 'Alert Monitor', icon: AlertTriangle, subtitle: '3 active alerts' }
//   ];

//   const quickActions = [
//     { id: 'rotate-assignments', title: 'Rotate Assignments', icon: RefreshCw },
//     { id: 'shift-schedule', title: 'Shift Schedule', icon: Clock },
//     { id: 'auto-assign', title: 'Auto-Assign', icon: Activity }
//   ];

//   const navigationItems = [
//     { id: 'dashboard', label: 'Dashboard', icon: Home },
//     { id: 'assignments', label: 'Assignments', icon: UserCheck },
//     { id: 'deliveries', label: 'Deliveries', icon: Package },
//     { id: 'handlers', label: 'Handlers', icon: UserX },
//     { id: 'alerts', label: 'Alerts', icon: Bell }
//   ];

//   const handleFeatureClick = (featureId: string) => {
//     console.log(`Navigating to ${featureId}`);
//   };

//   const handleQuickAction = (actionId: string) => {
//     console.log(`Executing ${actionId}`);
//   };

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <View>
//           <Text style={styles.headerTitle}>Supply Chain Theft Management</Text>
//           <Text style={styles.headerSubtitle}>Store Manager Dashboard</Text>
//         </View>
//         <View style={styles.status}>
//           <View style={styles.greenDot} />
//           <Text style={styles.statusText}>Active</Text>
//         </View>
//       </View>

//       <ScrollView contentContainerStyle={styles.scroll}>
//         {/* Status Summary */}
//         <View style={styles.statusBar}>
//           <View style={styles.statusGroup}>
//             <View style={[styles.dot, { backgroundColor: 'green' }]} />
//             <Text>11 Verified</Text>
//           </View>
//           <View style={styles.statusGroup}>
//             <View style={[styles.dot, { backgroundColor: 'gold' }]} />
//             <Text>1 Pending</Text>
//           </View>
//           <View style={styles.statusGroup}>
//             <View style={[styles.dot, { backgroundColor: 'red' }]} />
//             <Text>3 Alerts</Text>
//           </View>
//         </View>

//         {/* Main Features Grid */}
//         <View style={styles.grid}>
//           {mainFeatures.map(({ id, title, icon: Icon, subtitle }) => (
//             <TouchableOpacity key={id} style={styles.card} onPress={() => handleFeatureClick(id)}>
//               <Icon color="green" size={28} />
//               <Text style={styles.cardTitle}>{title}</Text>
//               <Text style={styles.cardSubtitle}>{subtitle}</Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         {/* Quick Actions */}
//         <Text style={styles.sectionTitle}>Quick Actions</Text>
//         <View style={styles.actionBox}>
//           {quickActions.map(({ id, title, icon: Icon }, index) => (
//             <TouchableOpacity key={id} style={styles.actionItem} onPress={() => handleQuickAction(id)}>
//               <Icon color="gray" size={20} />
//               <Text style={styles.actionText}>{title}</Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         {/* Recent Activity */}
//         <Text style={styles.sectionTitle}>Recent Activity</Text>
//         <View style={styles.activityBox}>
//           {[
//             { color: 'green', text: 'Handler-X92 verified delivery', time: '2 minutes ago' },
//             { color: 'gold', text: 'Route-B7 experiencing delays', time: '5 minutes ago' },
//             { color: 'red', text: 'Missing verification alert triggered', time: '8 minutes ago' }
//           ].map(({ color, text, time }, index) => (
//             <View key={index} style={styles.activityItem}>
//               <View style={[styles.dot, { backgroundColor: color }]} />
//               <View>
//                 <Text style={styles.activityText}>{text}</Text>
//                 <Text style={styles.activityTime}>{time}</Text>
//               </View>
//             </View>
//           ))}
//         </View>
//       </ScrollView>

//       {/* Bottom Navigation */}
//       <View style={styles.bottomNav}>
//         {navigationItems.map(({ id, label, icon: Icon }) => (
//           <TouchableOpacity key={id} style={styles.navItem} onPress={() => setActiveTab(id)}>
//             <Icon color={activeTab === id ? 'green' : 'gray'} size={20} />
//             <Text style={[styles.navLabel, { color: activeTab === id ? 'green' : 'gray' }]}>{label}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>
//     </View>
//   );
// };

// export default SupplyChainTheftManagement;

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#f9fafb' },
//   header: {
//     backgroundColor: '#fff', padding: 16, borderBottomWidth: 1, borderBottomColor: '#e5e7eb',
//     flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
//   },
//   headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#111827' },
//   headerSubtitle: { fontSize: 12, color: '#6b7280', marginTop: 4 },
//   status: { flexDirection: 'row', alignItems: 'center' },
//   greenDot: { width: 8, height: 8, backgroundColor: 'green', borderRadius: 4, marginRight: 6 },
//   statusText: { fontSize: 12, color: '#4b5563' },
//   scroll: { padding: 16, paddingBottom: 80 },
//   statusBar: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
//   statusGroup: { flexDirection: 'row', alignItems: 'center', gap: 6 },
//   dot: { width: 8, height: 8, borderRadius: 4, marginRight: 4 },
//   grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12 },
//   card: {
//     backgroundColor: '#fff', borderWidth: 1, borderColor: '#d1fae5', borderRadius: 12,
//     width: '48%', padding: 16, alignItems: 'center', marginBottom: 12
//   },
//   cardTitle: { fontWeight: 'bold', fontSize: 14, color: '#111827', marginTop: 8 },
//   cardSubtitle: { fontSize: 12, color: '#6b7280', marginTop: 2, textAlign: 'center' },
//   sectionTitle: { fontSize: 16, fontWeight: '600', marginTop: 16, marginBottom: 8, color: '#111827' },
//   actionBox: { backgroundColor: '#fff', borderRadius: 12, padding: 8, borderWidth: 1, borderColor: '#e5e7eb' },
//   actionItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 12 },
//   actionText: { marginLeft: 8, fontSize: 14, color: '#111827' },
//   activityBox: { backgroundColor: '#fff', borderRadius: 12, padding: 16, borderWidth: 1, borderColor: '#e5e7eb' },
//   activityItem: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12 },
//   activityText: { fontSize: 14, color: '#111827' },
//   activityTime: { fontSize: 12, color: '#6b7280' },
//   bottomNav: {
//     flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center',
//     backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#e5e7eb', paddingVertical: 8
//   },
//   navItem: { alignItems: 'center' },
//   navLabel: { fontSize: 10, marginTop: 2 }
// });









// import { router } from 'expo-router';
// import {
//   Activity,
//   AlertTriangle,
//   Bell,
//   Calendar,
//   Clock,
//   Home,
//   Package,
//   RefreshCw,
//   Shield,
//   UserCheck,
//   Users,
//   UserX,
// } from 'lucide-react-native';
// import React, { useState } from 'react';
// import {
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';

// const SupplyChainTheftManagement = () => {
//   const [activeTab, setActiveTab] = useState('dashboard');

//   const mainFeatures = [
//     {
//       id: 'team-assignments',
//       title: 'Team Assignments',
//       icon: Users,
//       subtitle: '12 handlers assigned',
//     },
//     {
//       id: 'delivery-schedule',
//       title: 'Delivery Schedule',
//       icon: Calendar,
//       subtitle: '8 routes scheduled',
//     },
//     {
//       id: 'handler-status',
//       title: 'Handler Status',
//       icon: Shield,
//       subtitle: '11 verified, 1 pending',
//     },
//     {
//       id: 'alert-monitor',
//       title: 'Alert Monitor',
//       icon: AlertTriangle,
//       subtitle: '3 active alerts',
//     },
//   ];

//   const quickActions = [
//     { id: 'rotate-assignments', title: 'Rotate Assignments', icon: RefreshCw },
//     { id: 'shift-schedule', title: 'Shift Schedule', icon: Clock },
//     { id: 'auto-assign', title: 'Auto-Assign', icon: Activity },
//   ];

//   const navigationItems = [
//     { id: 'dashboard', label: 'Dashboard', icon: Home },
//     { id: 'assignments', label: 'Assignments', icon: UserCheck },
//     { id: 'deliveries', label: 'Deliveries', icon: Package },
//     { id: 'handlers', label: 'Handlers', icon: UserX },
//     { id: 'alerts', label: 'Alerts', icon: Bell },
//   ];

//   const handleFeatureClick = (featureId: string) => {
//     if (featureId === 'team-assignments') {
//       router.push('/team-assignments'); // Expo Router path
//     } else {
//       console.log(`Navigating to ${featureId}`);
//     }
//   };

//   const handleQuickAction = (actionId: string) => {
//     console.log(`Executing ${actionId}`);
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <View>
//           <Text style={styles.headerTitle}>Supply Chain Theft Management</Text>
//           <Text style={styles.headerSubtitle}>Store Manager Dashboard</Text>
//         </View>
//         <View style={styles.status}>
//           <View style={styles.greenDot} />
//           <Text style={styles.statusText}>Active</Text>
//         </View>
//       </View>

//       <ScrollView contentContainerStyle={styles.scroll}>
//         <View style={styles.statusBar}>
//           <View style={styles.statusGroup}>
//             <View style={[styles.dot, { backgroundColor: 'green' }]} />
//             <Text>11 Verified</Text>
//           </View>
//           <View style={styles.statusGroup}>
//             <View style={[styles.dot, { backgroundColor: 'gold' }]} />
//             <Text>1 Pending</Text>
//           </View>
//           <View style={styles.statusGroup}>
//             <View style={[styles.dot, { backgroundColor: 'red' }]} />
//             <Text>3 Alerts</Text>
//           </View>
//         </View>

//         <View style={styles.grid}>
//           {mainFeatures.map(({ id, title, icon: Icon, subtitle }) => (
//             <TouchableOpacity
//               key={id}
//               style={styles.card}
//               onPress={() => handleFeatureClick(id)}
//             >
//               <Icon color="green" size={28} />
//               <Text style={styles.cardTitle}>{title}</Text>
//               <Text style={styles.cardSubtitle}>{subtitle}</Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         <Text style={styles.sectionTitle}>Quick Actions</Text>
//         <View style={styles.actionBox}>
//           {quickActions.map(({ id, title, icon: Icon }) => (
//             <TouchableOpacity
//               key={id}
//               style={styles.actionItem}
//               onPress={() => handleQuickAction(id)}
//             >
//               <Icon color="gray" size={20} />
//               <Text style={styles.actionText}>{title}</Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         <Text style={styles.sectionTitle}>Recent Activity</Text>
//         <View style={styles.activityBox}>
//           {[
//             {
//               color: 'green',
//               text: 'Handler-X92 verified delivery',
//               time: '2 minutes ago',
//             },
//             {
//               color: 'gold',
//               text: 'Route-B7 experiencing delays',
//               time: '5 minutes ago',
//             },
//             {
//               color: 'red',
//               text: 'Missing verification alert triggered',
//               time: '8 minutes ago',
//             },
//           ].map(({ color, text, time }, index) => (
//             <View key={index} style={styles.activityItem}>
//               <View style={[styles.dot, { backgroundColor: color }]} />
//               <View>
//                 <Text style={styles.activityText}>{text}</Text>
//                 <Text style={styles.activityTime}>{time}</Text>
//               </View>
//             </View>
//           ))}
//         </View>
//       </ScrollView>

//       <View style={styles.bottomNav}>
//         {navigationItems.map(({ id, label, icon: Icon }) => (
//           <TouchableOpacity
//             key={id}
//             style={styles.navItem}
//             onPress={() => setActiveTab(id)}
//           >
//             <Icon color={activeTab === id ? 'green' : 'gray'} size={20} />
//             <Text
//               style={[
//                 styles.navLabel,
//                 { color: activeTab === id ? 'green' : 'gray' },
//               ]}
//             >
//               {label}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </View>
//     </View>
//   );
// };

// export default SupplyChainTheftManagement;

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#f9fafb' },
//   header: {
//     backgroundColor: '#fff',
//     padding: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#e5e7eb',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#111827' },
//   headerSubtitle: { fontSize: 12, color: '#6b7280', marginTop: 4 },
//   status: { flexDirection: 'row', alignItems: 'center' },
//   greenDot: {
//     width: 8,
//     height: 8,
//     backgroundColor: 'green',
//     borderRadius: 4,
//     marginRight: 6,
//   },
//   statusText: { fontSize: 12, color: '#4b5563' },
//   scroll: { padding: 16, paddingBottom: 80 },
//   statusBar: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 12,
//   },
//   statusGroup: { flexDirection: 'row', alignItems: 'center', gap: 6 },
//   dot: { width: 8, height: 8, borderRadius: 4, marginRight: 4 },
//   grid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//     gap: 12,
//   },
//   card: {
//     backgroundColor: '#fff',
//     borderWidth: 1,
//     borderColor: '#d1fae5',
//     borderRadius: 12,
//     width: '48%',
//     padding: 16,
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   cardTitle: {
//     fontWeight: 'bold',
//     fontSize: 14,
//     color: '#111827',
//     marginTop: 8,
//   },
//   cardSubtitle: {
//     fontSize: 12,
//     color: '#6b7280',
//     marginTop: 2,
//     textAlign: 'center',
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//     marginTop: 16,
//     marginBottom: 8,
//     color: '#111827',
//   },
//   actionBox: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     padding: 8,
//     borderWidth: 1,
//     borderColor: '#e5e7eb',
//   },
//   actionItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 10,
//     paddingHorizontal: 12,
//   },
//   actionText: { marginLeft: 8, fontSize: 14, color: '#111827' },
//   activityBox: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     padding: 16,
//     borderWidth: 1,
//     borderColor: '#e5e7eb',
//   },
//   activityItem: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//     marginBottom: 12,
//   },
//   activityText: { fontSize: 14, color: '#111827' },
//   activityTime: { fontSize: 12, color: '#6b7280' },
//   bottomNav: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     borderTopWidth: 1,
//     borderTopColor: '#e5e7eb',
//     paddingVertical: 8,
//   },
//   navItem: { alignItems: 'center' },
//   navLabel: { fontSize: 10, marginTop: 2 },
// });







//DASHBOARD
import { router } from 'expo-router';
import {
  Activity,
  AlertTriangle,
  Bell,
  Calendar,
  Clock,
  Home,
  Package,
  RefreshCw,
  Shield,
  UserCheck,
  Users,
  UserX,
} from 'lucide-react-native';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const SupplyChainTheftManagement = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const mainFeatures = [
    {
      id: 'team-assignments',
      title: 'Team Assignments',
      icon: Users,
      subtitle: '12 handlers assigned',
    },
    {
      id: 'delivery-schedule',
      title: 'Delivery Schedule',
      icon: Calendar,
      subtitle: '8 routes scheduled',
    },
    {
      id: 'handler-status',
      title: 'Handler Status',
      icon: Shield,
      subtitle: '11 verified, 1 pending',
    },
    {
      id: 'alert-monitor',
      title: 'Alert Monitor',
      icon: AlertTriangle,
      subtitle: '3 active alerts',
    },
  ];

  const quickActions = [
    { id: 'rotate-assignments', title: 'Rotate Assignments', icon: RefreshCw },
    { id: 'shift-schedule', title: 'Shift Schedule', icon: Clock },
    { id: 'auto-assign', title: 'Auto-Assign', icon: Activity },
  ];

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'assignments', label: 'Assignments', icon: UserCheck },
    { id: 'deliveries', label: 'Deliveries', icon: Package },
    { id: 'handlers', label: 'Handlers', icon: UserX },
    { id: 'alerts', label: 'Alerts', icon: Bell },
  ];

  const handleFeatureClick = (featureId: string) => {
  switch (featureId) {
    case 'team-assignments':
      router.push('/team-assignments');
      break;
    case 'delivery-schedule':
      router.push('/delivery-schedule');
      break;
    case 'handler-status':
      router.push('/handler-status');
      break;
    case 'alert-monitor':
      router.push('/alert-monitor');
      break;
    default:
      console.warn(`No route defined for ${featureId}`);
  }
};


  const handleQuickAction = (actionId: string) => {
    console.log(`Executing ${actionId}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Supply Chain Theft Management</Text>
          <Text style={styles.headerSubtitle}>Store Manager Dashboard</Text>
        </View>
        <View style={styles.status}>
          <View style={styles.greenDot} />
          <Text style={styles.statusText}>Active</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.statusBar}>
          <View style={styles.statusGroup}>
            <View style={[styles.dot, { backgroundColor: 'green' }]} />
            <Text>11 Verified</Text>
          </View>
          <View style={styles.statusGroup}>
            <View style={[styles.dot, { backgroundColor: 'gold' }]} />
            <Text>1 Pending</Text>
          </View>
          <View style={styles.statusGroup}>
            <View style={[styles.dot, { backgroundColor: 'red' }]} />
            <Text>3 Alerts</Text>
          </View>
        </View>

        <View style={styles.grid}>
          {mainFeatures.map(({ id, title, icon: Icon, subtitle }) => (
            <TouchableOpacity
              key={id}
              style={styles.card}
              onPress={() => handleFeatureClick(id)}
            >
              <Icon color="green" size={28} />
              <Text style={styles.cardTitle}>{title}</Text>
              <Text style={styles.cardSubtitle}>{subtitle}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionBox}>
          {quickActions.map(({ id, title, icon: Icon }) => (
            <TouchableOpacity
              key={id}
              style={styles.actionItem}
              onPress={() => handleQuickAction(id)}
            >
              <Icon color="gray" size={20} />
              <Text style={styles.actionText}>{title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <View style={styles.activityBox}>
          {[
            {
              color: 'green',
              text: 'Handler-X92 verified delivery',
              time: '2 minutes ago',
            },
            {
              color: 'gold',
              text: 'Route-B7 experiencing delays',
              time: '5 minutes ago',
            },
            {
              color: 'red',
              text: 'Missing verification alert triggered',
              time: '8 minutes ago',
            },
          ].map(({ color, text, time }, index) => (
            <View key={index} style={styles.activityItem}>
              <View style={[styles.dot, { backgroundColor: color }]} />
              <View>
                <Text style={styles.activityText}>{text}</Text>
                <Text style={styles.activityTime}>{time}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.bottomNav}>
        {navigationItems.map(({ id, label, icon: Icon }) => (
          <TouchableOpacity
            key={id}
            style={styles.navItem}
            onPress={() => setActiveTab(id)}
          >
            <Icon color={activeTab === id ? 'green' : 'gray'} size={20} />
            <Text
              style={[
                styles.navLabel,
                { color: activeTab === id ? 'green' : 'gray' },
              ]}
            >
              {label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default SupplyChainTheftManagement;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb' },
  header: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#111827' },
  headerSubtitle: { fontSize: 12, color: '#6b7280', marginTop: 4 },
  status: { flexDirection: 'row', alignItems: 'center' },
  greenDot: {
    width: 8,
    height: 8,
    backgroundColor: 'green',
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: { fontSize: 12, color: '#4b5563' },
  scroll: { padding: 16, paddingBottom: 80 },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  statusGroup: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  dot: { width: 8, height: 8, borderRadius: 4, marginRight: 4 },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d1fae5',
    borderRadius: 12,
    width: '48%',
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#111827',
    marginTop: 8,
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
    color: '#111827',
  },
  actionBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  actionText: { marginLeft: 8, fontSize: 14, color: '#111827' },
  activityBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  activityText: { fontSize: 14, color: '#111827' },
  activityTime: { fontSize: 12, color: '#6b7280' },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingVertical: 8,
  },
  navItem: { alignItems: 'center' },
  navLabel: { fontSize: 10, marginTop: 2 },
});
