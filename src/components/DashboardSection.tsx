import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Users,
  Eye,
  Clock,
  TrendingUp,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  Bitcoin,
  Activity,
  Zap,
  Server
} from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface AnalyticsData {
  overview: {
    totalVisitors: number;
    pageViews: number;
    averageSessionDuration: string;
    bounceRate: string;
    topProjects: Array<{ name: string; views: number }>;
  };
  visitorsThisWeek: Array<{ day: string; visitors: number; pageViews: number }>;
  geographicData: Array<{ country: string; visitors: number; percentage: number }>;
  deviceData: Array<{ device: string; users: number; percentage: number }>;
  cryptoPrices: Array<{ symbol: string; price: number; change: number }>;
  techMetrics: Array<{ metric: string; value: string; status: string }>;
}

const DashboardSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [activeMetric, setActiveMetric] = useState('visitors');

  useEffect(() => {
    // Load analytics data
    fetch('/data/analytics.json')
      .then(response => response.json())
      .then(data => setAnalyticsData(data))
      .catch(error => console.error('Error loading analytics:', error));
  }, []);

  if (!analyticsData) {
    return (
      <section id="dashboard" className="py-20 relative">
        <div className="container mx-auto px-4 text-center">
          <div className="text-neon-green">Loading dashboard...</div>
        </div>
      </section>
    );
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#FFFFFF',
        },
      },
    },
    scales: {
      x: {
        ticks: { color: '#808080' },
        grid: { color: 'rgba(0, 255, 0, 0.1)' },
      },
      y: {
        ticks: { color: '#808080' },
        grid: { color: 'rgba(0, 255, 0, 0.1)' },
      },
    },
  };

  const weeklyVisitorsData = {
    labels: analyticsData.visitorsThisWeek.map(item => item.day),
    datasets: [
      {
        label: 'Visitors',
        data: analyticsData.visitorsThisWeek.map(item => item.visitors),
        borderColor: '#00FF00',
        backgroundColor: 'rgba(0, 255, 0, 0.1)',
        borderWidth: 2,
        fill: true,
      },
      {
        label: 'Page Views',
        data: analyticsData.visitorsThisWeek.map(item => item.pageViews),
        borderColor: '#00FFFF',
        backgroundColor: 'rgba(0, 255, 255, 0.1)',
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  const deviceData = {
    labels: analyticsData.deviceData.map(item => item.device),
    datasets: [
      {
        data: analyticsData.deviceData.map(item => item.percentage),
        backgroundColor: ['#00FF00', '#00FFFF', '#FF00FF'],
        borderColor: ['#00FF00', '#00FFFF', '#FF00FF'],
        borderWidth: 2,
      },
    ],
  };

  const getDeviceIcon = (device: string) => {
    switch (device) {
      case 'Desktop': return <Monitor size={20} />;
      case 'Mobile': return <Smartphone size={20} />;
      case 'Tablet': return <Tablet size={20} />;
      default: return <Monitor size={20} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-neon-green';
      case 'good': return 'text-quantum-blue';
      case 'warning': return 'text-bitcoin-orange';
      default: return 'text-medium-gray';
    }
  };

  return (
    <section id="dashboard" className="py-20 relative">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-tech-white">Smart </span>
            <span className="text-neon-green">Analytics</span>
            <span className="text-tech-white"> Dashboard</span>
          </h2>
          <p className="text-xl text-medium-gray max-w-3xl mx-auto">
            Real-time insights into website performance, user engagement, and technology metrics.
          </p>
        </motion.div>

        {/* Overview Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          <div className="glass-effect p-6 rounded-xl text-center">
            <Users className="text-neon-green mx-auto mb-3" size={32} />
            <div className="text-2xl font-bold text-tech-white mb-1">
              {analyticsData.overview.totalVisitors.toLocaleString()}
            </div>
            <div className="text-medium-gray text-sm">Total Visitors</div>
          </div>
          
          <div className="glass-effect p-6 rounded-xl text-center">
            <Eye className="text-quantum-blue mx-auto mb-3" size={32} />
            <div className="text-2xl font-bold text-tech-white mb-1">
              {analyticsData.overview.pageViews.toLocaleString()}
            </div>
            <div className="text-medium-gray text-sm">Page Views</div>
          </div>
          
          <div className="glass-effect p-6 rounded-xl text-center">
            <Clock className="text-bitcoin-orange mx-auto mb-3" size={32} />
            <div className="text-2xl font-bold text-tech-white mb-1">
              {analyticsData.overview.averageSessionDuration}
            </div>
            <div className="text-medium-gray text-sm">Avg. Session</div>
          </div>
          
          <div className="glass-effect p-6 rounded-xl text-center">
            <TrendingUp className="text-neon-green mx-auto mb-3" size={32} />
            <div className="text-2xl font-bold text-tech-white mb-1">
              {analyticsData.overview.bounceRate}
            </div>
            <div className="text-medium-gray text-sm">Bounce Rate</div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {/* Weekly Traffic Chart */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="glass-effect p-6 rounded-xl"
          >
            <h3 className="text-xl font-bold text-tech-white mb-6 flex items-center">
              <Activity className="text-neon-green mr-3" size={24} />
              Weekly Traffic Analysis
            </h3>
            <div className="h-64">
              <Line data={weeklyVisitorsData} options={chartOptions} />
            </div>
          </motion.div>

          {/* Device Distribution */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="glass-effect p-6 rounded-xl"
          >
            <h3 className="text-xl font-bold text-tech-white mb-6 flex items-center">
              <Monitor className="text-quantum-blue mr-3" size={24} />
              Device Distribution
            </h3>
            <div className="h-64 flex items-center justify-center">
              <div className="w-48 h-48">
                <Doughnut data={deviceData} options={{ ...chartOptions, scales: undefined }} />
              </div>
            </div>
            <div className="mt-4 space-y-2">
              {analyticsData.deviceData.map((device, index) => (
                <div key={device.device} className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <div className="text-tech-white mr-2">{getDeviceIcon(device.device)}</div>
                    <span className="text-medium-gray">{device.device}</span>
                  </div>
                  <span className="text-neon-green font-semibold">{device.percentage}%</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Geographic Distribution & Crypto Ticker */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Geographic Data */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="lg:col-span-2 glass-effect p-6 rounded-xl"
          >
            <h3 className="text-xl font-bold text-tech-white mb-6 flex items-center">
              <Globe className="text-neon-green mr-3" size={24} />
              Geographic Distribution
            </h3>
            <div className="space-y-3">
              {analyticsData.geographicData.map((country, index) => (
                <motion.div
                  key={country.country}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 1 + index * 0.1 }}
                  className="flex items-center justify-between"
                >
                  <span className="text-tech-white">{country.country}</span>
                  <div className="flex items-center space-x-3">
                    <div className="w-32 bg-dark-bg rounded-full h-2 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-neon-green to-quantum-blue"
                        style={{ width: `${country.percentage}%` }}
                      />
                    </div>
                    <span className="text-medium-gray text-sm w-12 text-right">
                      {country.percentage}%
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Crypto Ticker */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1 }}
            className="glass-effect p-6 rounded-xl"
          >
            <h3 className="text-xl font-bold text-tech-white mb-6 flex items-center">
              <Bitcoin className="text-bitcoin-orange mr-3" size={24} />
              Crypto Tracker
            </h3>
            <div className="space-y-4">
              {analyticsData.cryptoPrices.map((crypto, index) => (
                <motion.div
                  key={crypto.symbol}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 1.2 + index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-dark-bg/50 rounded-lg"
                >
                  <div>
                    <div className="text-tech-white font-bold">{crypto.symbol}</div>
                    <div className="text-medium-gray text-sm">
                      ${crypto.price.toLocaleString()}
                    </div>
                  </div>
                  <div className={`text-right ${crypto.change >= 0 ? 'text-neon-green' : 'text-red-400'}`}>
                    <div className="text-sm font-semibold">
                      {crypto.change >= 0 ? '+' : ''}{crypto.change}%
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Top Projects & Tech Metrics */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Top Projects */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="glass-effect p-6 rounded-xl"
          >
            <h3 className="text-xl font-bold text-tech-white mb-6 flex items-center">
              <TrendingUp className="text-neon-green mr-3" size={24} />
              Top Performing Projects
            </h3>
            <div className="space-y-4">
              {analyticsData.overview.topProjects.map((project, index) => (
                <motion.div
                  key={project.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 1.4 + index * 0.1 }}
                  className="flex items-center justify-between p-3 hover:bg-dark-bg/30 rounded-lg transition-colors"
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-neon-green text-dark-bg rounded-full flex items-center justify-center text-sm font-bold mr-3">
                      {index + 1}
                    </div>
                    <span className="text-tech-white">{project.name}</span>
                  </div>
                  <span className="text-neon-green font-semibold">{project.views.toLocaleString()}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Tech Metrics */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="glass-effect p-6 rounded-xl"
          >
            <h3 className="text-xl font-bold text-tech-white mb-6 flex items-center">
              <Server className="text-quantum-blue mr-3" size={24} />
              Technical Performance
            </h3>
            <div className="space-y-4">
              {analyticsData.techMetrics.map((metric, index) => (
                <motion.div
                  key={metric.metric}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 1.6 + index * 0.1 }}
                  className="flex items-center justify-between p-3 hover:bg-dark-bg/30 rounded-lg transition-colors"
                >
                  <div className="flex items-center">
                    <Zap className={`mr-3 ${getStatusColor(metric.status)}`} size={16} />
                    <span className="text-tech-white">{metric.metric}</span>
                  </div>
                  <div className="text-right">
                    <div className={`font-semibold ${getStatusColor(metric.status)}`}>
                      {metric.value}
                    </div>
                    <div className="text-xs text-medium-gray capitalize">{metric.status}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DashboardSection;
