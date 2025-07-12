
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/Feather';

const screenWidth = Dimensions.get('window').width;

const PerformanceAnalytics = () => {
  const [selectedTime, setSelectedTime] = useState('Week');
  const [selectedChart, setSelectedChart] = useState('Revenue');

  const times = ['Today', 'Week', 'Month', 'Quarter', 'Year'];
  const chartTypes = ['Revenue', 'Trips', 'Hours'];

  const kpis = [
    { label: 'Service Uptime', value: '98.5%', change: '+0.3%', type: 'positive' },
    { label: 'Avg Rating', value: '4.8★', change: '+0.2', type: 'positive' },
    { label: 'Trips/Day', value: '12.5', change: '-1.2', type: 'negative' },
    { label: 'Avg Hours', value: '8.2h', change: '+0.8h', type: 'positive' },
    { label: 'Revenue/Driver', value: '$2,450', change: '+$185', type: 'positive' },
    { label: 'Avg Response', value: '3.2min', change: '→ 0.0', type: 'neutral' }
  ];

  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [85, 92, 78, 95, 88, 65, 72]
      }
    ]
  };

  const barColors = ['#22c55e', '#22c55e', '#22c55e', '#22c55e', '#22c55e', '#fbbf24', '#22c55e'];

  const metrics = [
    { title: 'Fleet Utilization', value: '87%', fill: 87 },
    { title: 'Fuel Efficiency', value: '24.5 MPG', fill: 82 },
    { title: 'Maintenance Score', value: '94%', fill: 94 },
    { title: 'Safety Score', value: '96%', fill: 96 },
    { title: 'Punctuality', value: '89%', fill: 89 },
    { title: 'Completion Rate', value: '98%', fill: 98 },
    { title: 'Overall Rating', value: '4.8/5.0', fill: 96 },
    { title: 'Complaint Rate', value: '2.1%', fill: 21, warning: true },
    { title: 'Repeat Customers', value: '78%', fill: 78 }
  ];

  const performers = [
    { name: 'Michael Chen', score: '4.9★ • 18 trips • 98% on-time', value: '$3,250' },
    { name: 'Sarah Johnson', score: '4.8★ • 16 trips • 95% on-time', value: '$2,980' },
    { name: 'David Rodriguez', score: '4.7★ • 15 trips • 92% on-time', value: '$2,750' },
    { name: 'Emma Wilson', score: '4.8★ • 14 trips • 96% on-time', value: '$2,650' },
    { name: 'James Anderson', score: '4.6★ • 13 trips • 90% on-time', value: '$2,420' }
  ];

  const getChangeStyle = (type) => {
    switch (type) {
      case 'positive': return styles.changePositive;
      case 'negative': return styles.changeNegative;
      case 'neutral': return styles.changeNeutral;
      default: return styles.changeNeutral;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Performance Analytics</Text>
        <Text style={styles.subtitle}>Real-time insights and key performance indicators</Text>
      </View>

      {/* Time Filters */}
      <View style={styles.timeFilters}>
        {times.map(time => (
          <TouchableOpacity
            key={time}
            onPress={() => setSelectedTime(time)}
            style={[
              styles.timeButton,
              selectedTime === time && styles.timeButtonActive
            ]}
          >
            <Text style={selectedTime === time ? styles.timeTextActive : styles.timeText}>
              {time}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* KPI Cards */}
      <View style={styles.kpiGrid}>
        {kpis.map((kpi, index) => (
          <View key={index} style={styles.kpiCard}>
            <Text style={styles.kpiValue}>{kpi.value}</Text>
            <Text style={styles.kpiLabel}>{kpi.label}</Text>
            <Text style={[styles.kpiChange, getChangeStyle(kpi.type)]}>{kpi.change}</Text>
          </View>
        ))}
      </View>

      {/* Chart Section */}
      <View style={styles.chartSection}>
        <View style={styles.chartHeader}>
          <Text style={styles.chartTitle}>Daily Performance Trends</Text>
          <View style={styles.chartControls}>
            {chartTypes.map(chart => (
              <TouchableOpacity
                key={chart}
                onPress={() => setSelectedChart(chart)}
                style={[
                  styles.chartBtn,
                  selectedChart === chart && styles.chartBtnActive
                ]}
              >
                <Text style={selectedChart === chart ? styles.chartTextActive : styles.chartText}>
                  {chart}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <BarChart
          data={chartData}
          width={screenWidth - 40}
          height={220}
          chartConfig={{
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            color: (opacity = 1) => `rgba(34, 197, 94, ${opacity})`,
            barPercentage: 0.6,
            decimalPlaces: 0
          }}
          style={{ borderRadius: 8 }}
          fromZero
        />
      </View>

      {/* Performance Metrics */}
      <View style={styles.metricsSection}>
        {metrics.map((metric, idx) => (
          <View key={idx} style={styles.metricCard}>
            <Text style={styles.metricTitle}>{metric.title}</Text>
            <Text style={styles.metricValue}>{metric.value}</Text>
            <View style={styles.progressBar}>
              <View style={[
                styles.progressFill,
                { width: `${metric.fill}%` },
                metric.warning && styles.progressWarning
              ]} />
            </View>
          </View>
        ))}
      </View>

      {/* Top Performers */}
      <View style={styles.performerSection}>
        <Text style={styles.sectionTitle}>Top Performers This Week</Text>
        {performers.map((p, i) => (
          <View key={i} style={styles.performerItem}>
            <View style={[styles.rankCircle, i === 0 && styles.gold, i === 1 && styles.silver, i === 2 && styles.bronze]}>
              <Text style={styles.rankText}>{i + 1}</Text>
            </View>
            <View style={styles.performerInfo}>
              <Text style={styles.performerName}>{p.name}</Text>
              <Text style={styles.performerScore}>{p.score}</Text>
            </View>
            <Text style={styles.performerValue}>{p.value}</Text>
          </View>
        ))}
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="users" size={20} color="#64748b" />
          <Text style={styles.navLabel}>Drivers</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="alert-circle" size={20} color="#64748b" />
          <Text style={styles.navLabel}>Alerts</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem, styles.navItemActive]}>
          <Icon name="bar-chart-2" size={20} color="#1e293b" />
          <Text style={[styles.navLabel, styles.navLabelActive]}>Reports</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="settings" size={20} color="#64748b" />
          <Text style={styles.navLabel}>Settings</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  header: { padding: 20, borderBottomWidth: 1, borderColor: '#e2e8f0' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1e293b' },
  subtitle: { fontSize: 14, color: '#64748b', marginTop: 4 },
  timeFilters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#e2e8f0',
  },
  timeButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginRight: 8,
    marginBottom: 8,
  },
  timeButtonActive: {
    backgroundColor: '#1e293b',
    borderColor: '#1e293b',
  },
  timeText: { color: '#64748b', fontSize: 14 },
  timeTextActive: { color: '#ffffff', fontSize: 14 },
  kpiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 16,
  },
  kpiCard: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    padding: 16,
    width: '47%',
    marginBottom: 12,
    alignItems: 'center',
  },
  kpiValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  kpiLabel: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 4,
    textAlign: 'center',
  },
  kpiChange: {
    fontSize: 12,
    fontWeight: '500',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 16,
    overflow: 'hidden',
  },
  changePositive: {
    backgroundColor: '#dcfce7',
    color: '#16a34a',
  },
  changeNegative: {
    backgroundColor: '#fee2e2',
    color: '#dc2626',
  },
  changeNeutral: {
    backgroundColor: '#f1f5f9',
    color: '#64748b',
  },
  chartSection: { padding: 20 },
  chartHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  chartTitle: { fontSize: 18, fontWeight: '600', color: '#1e293b' },
  chartControls: { flexDirection: 'row' },
  chartBtn: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#e2e8f0'
  },
  chartBtnActive: { backgroundColor: '#f8fafc', borderColor: '#cbd5e1' },
  chartText: { color: '#64748b', fontSize: 12 },
  chartTextActive: { color: '#1e293b', fontSize: 12 },
  metricsSection: { padding: 20 },
  metricCard: { marginBottom: 16 },
  metricTitle: { fontSize: 14, color: '#64748b' },
  metricValue: { fontSize: 16, fontWeight: '600', color: '#1e293b' },
  progressBar: {
    width: '100%',
    height: 6,
    backgroundColor: '#f1f5f9',
    borderRadius: 3,
    overflow: 'hidden',
    marginTop: 6
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#22c55e'
  },
  progressWarning: {
    backgroundColor: '#fbbf24'
  },
  performerSection: { padding: 20 },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: '#1e293b', marginBottom: 16 },
  performerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#f1f5f9'
  },
  rankCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f8fafc',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12
  },
  rankText: { fontSize: 14, fontWeight: '600', color: '#64748b' },
  gold: { backgroundColor: '#fef3c7' },
  silver: { backgroundColor: '#f1f5f9' },
  bronze: { backgroundColor: '#fed7aa' },
  performerInfo: { flex: 1 },
  performerName: { fontSize: 16, fontWeight: '500', color: '#1e293b' },
  performerScore: { fontSize: 14, color: '#64748b' },
  performerValue: { fontSize: 16, fontWeight: '600', color: '#16a34a' },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: '#e2e8f0',
    marginTop: 20
  },
  navItem: { alignItems: 'center' },
  navLabel: { fontSize: 12, color: '#64748b', marginTop: 4 },
  navItemActive: {},
  navLabelActive: { color: '#1e293b', fontWeight: '500' }
});

export default PerformanceAnalytics;
