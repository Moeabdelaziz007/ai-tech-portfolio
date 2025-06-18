import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
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
} from "chart.js";
import { Line, Bar, Doughnut } from "react-chartjs-2";
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
  Server,
} from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
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
  geographicData: Array<{
    country: string;
    visitors: number;
    percentage: number;
  }>;
  deviceData: Array<{ device: string; users: number; percentage: number }>;
  cryptoPrices: Array<{ symbol: string; price: number; change: number }>;
  techMetrics: Array<{ metric: string; value: string; status: string }>;
}

const DashboardSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(
    null,
  );
  const [activeMetric, setActiveMetric] = useState("visitors");

  useEffect(() => {
    // Load analytics data
    fetch("/data/analytics.json")
      .then((response) => response.json())
      .then((data) => setAnalyticsData(data))
      .catch((error) => console.error("Error loading analytics:", error));
  }, []);

  if (!analyticsData) {
    return (
      <section id="dashboard" className="py-20 relative" data-oid="sco5coe">
        <div className="container mx-auto px-4 text-center" data-oid="go.qmas">
          <div className="text-neon-green" data-oid="s:s9ez3">
            Loading dashboard...
          </div>
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
          color: "#FFFFFF",
        },
      },
    },
    scales: {
      x: {
        ticks: { color: "#808080" },
        grid: { color: "rgba(0, 255, 0, 0.1)" },
      },
      y: {
        ticks: { color: "#808080" },
        grid: { color: "rgba(0, 255, 0, 0.1)" },
      },
    },
  };

  const weeklyVisitorsData = {
    labels: analyticsData.visitorsThisWeek.map((item) => item.day),
    datasets: [
      {
        label: "Visitors",
        data: analyticsData.visitorsThisWeek.map((item) => item.visitors),
        borderColor: "#00FF00",
        backgroundColor: "rgba(0, 255, 0, 0.1)",
        borderWidth: 2,
        fill: true,
      },
      {
        label: "Page Views",
        data: analyticsData.visitorsThisWeek.map((item) => item.pageViews),
        borderColor: "#00FFFF",
        backgroundColor: "rgba(0, 255, 255, 0.1)",
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  const deviceData = {
    labels: analyticsData.deviceData.map((item) => item.device),
    datasets: [
      {
        data: analyticsData.deviceData.map((item) => item.percentage),
        backgroundColor: ["#00FF00", "#00FFFF", "#FF00FF"],
        borderColor: ["#00FF00", "#00FFFF", "#FF00FF"],
        borderWidth: 2,
      },
    ],
  };

  const getDeviceIcon = (device: string) => {
    switch (device) {
      case "Desktop":
        return <Monitor size={20} data-oid="h04adk7" />;
      case "Mobile":
        return <Smartphone size={20} data-oid="283u.sc" />;
      case "Tablet":
        return <Tablet size={20} data-oid="rzkb6e2" />;
      default:
        return <Monitor size={20} data-oid="cxmw-54" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "text-neon-green";
      case "good":
        return "text-quantum-blue";
      case "warning":
        return "text-bitcoin-orange";
      default:
        return "text-medium-gray";
    }
  };

  return (
    <section id="dashboard" className="py-20 relative" data-oid="xdh:::m">
      <div className="container mx-auto px-4" ref={ref} data-oid="v80p3:z">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
          data-oid="rvcfh00"
        >
          <h2
            className="text-4xl md:text-5xl font-bold mb-6"
            data-oid="ydujg.w"
          >
            <span className="text-tech-white" data-oid="kf678va">
              Smart{" "}
            </span>
            <span className="text-neon-green" data-oid="4h-1-vp">
              Analytics
            </span>
            <span className="text-tech-white" data-oid=".8ea7r0">
              {" "}
              Dashboard
            </span>
          </h2>
          <p
            className="text-xl text-medium-gray max-w-3xl mx-auto"
            data-oid="bg2d5_a"
          >
            Real-time insights into website performance, user engagement, and
            technology metrics.
          </p>
        </motion.div>

        {/* Overview Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          data-oid="nnha2qp"
        >
          <div
            className="glass-effect p-6 rounded-xl text-center"
            data-oid="ak1_80l"
          >
            <Users
              className="text-neon-green mx-auto mb-3"
              size={32}
              data-oid="oy4m2e1"
            />

            <div
              className="text-2xl font-bold text-tech-white mb-1"
              data-oid="c:j764r"
            >
              {analyticsData.overview.totalVisitors.toLocaleString()}
            </div>
            <div className="text-medium-gray text-sm" data-oid="sy8-.8v">
              Total Visitors
            </div>
          </div>

          <div
            className="glass-effect p-6 rounded-xl text-center"
            data-oid="v0_9kp0"
          >
            <Eye
              className="text-quantum-blue mx-auto mb-3"
              size={32}
              data-oid="9mqord6"
            />

            <div
              className="text-2xl font-bold text-tech-white mb-1"
              data-oid="4rk1y8i"
            >
              {analyticsData.overview.pageViews.toLocaleString()}
            </div>
            <div className="text-medium-gray text-sm" data-oid="h09qlfo">
              Page Views
            </div>
          </div>

          <div
            className="glass-effect p-6 rounded-xl text-center"
            data-oid="zkcp4st"
          >
            <Clock
              className="text-bitcoin-orange mx-auto mb-3"
              size={32}
              data-oid="1nf3r2_"
            />

            <div
              className="text-2xl font-bold text-tech-white mb-1"
              data-oid="w1ih57s"
            >
              {analyticsData.overview.averageSessionDuration}
            </div>
            <div className="text-medium-gray text-sm" data-oid="7h1.a:0">
              Avg. Session
            </div>
          </div>

          <div
            className="glass-effect p-6 rounded-xl text-center"
            data-oid="hf_thmw"
          >
            <TrendingUp
              className="text-neon-green mx-auto mb-3"
              size={32}
              data-oid="osbre-9"
            />

            <div
              className="text-2xl font-bold text-tech-white mb-1"
              data-oid="2h0dn.9"
            >
              {analyticsData.overview.bounceRate}
            </div>
            <div className="text-medium-gray text-sm" data-oid="y4p_31.">
              Bounce Rate
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-12" data-oid="4j6alka">
          {/* Weekly Traffic Chart */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="glass-effect p-6 rounded-xl"
            data-oid="y7m8c1:"
          >
            <h3
              className="text-xl font-bold text-tech-white mb-6 flex items-center"
              data-oid="zl8z2py"
            >
              <Activity
                className="text-neon-green mr-3"
                size={24}
                data-oid="3xp7oqz"
              />
              Weekly Traffic Analysis
            </h3>
            <div className="h-64" data-oid="7cjvbcw">
              <Line
                data={weeklyVisitorsData}
                options={chartOptions}
                data-oid="ngmmfva"
              />
            </div>
          </motion.div>

          {/* Device Distribution */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="glass-effect p-6 rounded-xl"
            data-oid="x-lbcjb"
          >
            <h3
              className="text-xl font-bold text-tech-white mb-6 flex items-center"
              data-oid="xx:y_oq"
            >
              <Monitor
                className="text-quantum-blue mr-3"
                size={24}
                data-oid="tu5dogy"
              />
              Device Distribution
            </h3>
            <div
              className="h-64 flex items-center justify-center"
              data-oid="0___d35"
            >
              <div className="w-48 h-48" data-oid="q7fpqxx">
                <Doughnut
                  data={deviceData}
                  options={{ ...chartOptions, scales: undefined }}
                  data-oid="0m63.k_"
                />
              </div>
            </div>
            <div className="mt-4 space-y-2" data-oid="nmkzqm2">
              {analyticsData.deviceData.map((device, index) => (
                <div
                  key={device.device}
                  className="flex items-center justify-between text-sm"
                  data-oid="gl.6n4o"
                >
                  <div className="flex items-center" data-oid="acfee1r">
                    <div className="text-tech-white mr-2" data-oid="18exilp">
                      {getDeviceIcon(device.device)}
                    </div>
                    <span className="text-medium-gray" data-oid="o6lnkq:">
                      {device.device}
                    </span>
                  </div>
                  <span
                    className="text-neon-green font-semibold"
                    data-oid="hl2-isk"
                  >
                    {device.percentage}%
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Geographic Distribution & Crypto Ticker */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12" data-oid="imfd-21">
          {/* Geographic Data */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="lg:col-span-2 glass-effect p-6 rounded-xl"
            data-oid="4qh_08r"
          >
            <h3
              className="text-xl font-bold text-tech-white mb-6 flex items-center"
              data-oid="z2w0-nt"
            >
              <Globe
                className="text-neon-green mr-3"
                size={24}
                data-oid="ba:o910"
              />
              Geographic Distribution
            </h3>
            <div className="space-y-3" data-oid="q4r:hi4">
              {analyticsData.geographicData.map((country, index) => (
                <motion.div
                  key={country.country}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 1 + index * 0.1 }}
                  className="flex items-center justify-between"
                  data-oid="fnmubjd"
                >
                  <span className="text-tech-white" data-oid="gut5x0r">
                    {country.country}
                  </span>
                  <div
                    className="flex items-center space-x-3"
                    data-oid=".kwwu1."
                  >
                    <div
                      className="w-32 bg-dark-bg rounded-full h-2 overflow-hidden"
                      data-oid="5qum.qp"
                    >
                      <div
                        className="h-full bg-gradient-to-r from-neon-green to-quantum-blue"
                        style={{ width: `${country.percentage}%` }}
                        data-oid="cnlgrdx"
                      />
                    </div>
                    <span
                      className="text-medium-gray text-sm w-12 text-right"
                      data-oid="6doqbp1"
                    >
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
            data-oid="i41:u1e"
          >
            <h3
              className="text-xl font-bold text-tech-white mb-6 flex items-center"
              data-oid="idebe1y"
            >
              <Bitcoin
                className="text-bitcoin-orange mr-3"
                size={24}
                data-oid="dtjnwk4"
              />
              Crypto Tracker
            </h3>
            <div className="space-y-4" data-oid="cqxbbv8">
              {analyticsData.cryptoPrices.map((crypto, index) => (
                <motion.div
                  key={crypto.symbol}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 1.2 + index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-dark-bg/50 rounded-lg"
                  data-oid="jwz:n9p"
                >
                  <div data-oid="ra17:ak">
                    <div
                      className="text-tech-white font-bold"
                      data-oid="qfpa4.8"
                    >
                      {crypto.symbol}
                    </div>
                    <div
                      className="text-medium-gray text-sm"
                      data-oid="qern:9x"
                    >
                      ${crypto.price.toLocaleString()}
                    </div>
                  </div>
                  <div
                    className={`text-right ${crypto.change >= 0 ? "text-neon-green" : "text-red-400"}`}
                    data-oid="jna_0rw"
                  >
                    <div className="text-sm font-semibold" data-oid="4j-m.p:">
                      {crypto.change >= 0 ? "+" : ""}
                      {crypto.change}%
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Top Projects & Tech Metrics */}
        <div className="grid lg:grid-cols-2 gap-8" data-oid="g2-4f7a">
          {/* Top Projects */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="glass-effect p-6 rounded-xl"
            data-oid="b:24u5d"
          >
            <h3
              className="text-xl font-bold text-tech-white mb-6 flex items-center"
              data-oid="vyxt1_7"
            >
              <TrendingUp
                className="text-neon-green mr-3"
                size={24}
                data-oid="30exsa9"
              />
              Top Performing Projects
            </h3>
            <div className="space-y-4" data-oid="tbrjspi">
              {analyticsData.overview.topProjects.map((project, index) => (
                <motion.div
                  key={project.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 1.4 + index * 0.1 }}
                  className="flex items-center justify-between p-3 hover:bg-dark-bg/30 rounded-lg transition-colors"
                  data-oid="i5onpj6"
                >
                  <div className="flex items-center" data-oid="2sa_2lr">
                    <div
                      className="w-8 h-8 bg-neon-green text-dark-bg rounded-full flex items-center justify-center text-sm font-bold mr-3"
                      data-oid="sdf1is6"
                    >
                      {index + 1}
                    </div>
                    <span className="text-tech-white" data-oid="zoukmbw">
                      {project.name}
                    </span>
                  </div>
                  <span
                    className="text-neon-green font-semibold"
                    data-oid="anjvyrc"
                  >
                    {project.views.toLocaleString()}
                  </span>
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
            data-oid="oyig.75"
          >
            <h3
              className="text-xl font-bold text-tech-white mb-6 flex items-center"
              data-oid="tkpc4ta"
            >
              <Server
                className="text-quantum-blue mr-3"
                size={24}
                data-oid="j91i414"
              />
              Technical Performance
            </h3>
            <div className="space-y-4" data-oid="5qjz1:u">
              {analyticsData.techMetrics.map((metric, index) => (
                <motion.div
                  key={metric.metric}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 1.6 + index * 0.1 }}
                  className="flex items-center justify-between p-3 hover:bg-dark-bg/30 rounded-lg transition-colors"
                  data-oid="::azmdn"
                >
                  <div className="flex items-center" data-oid="7otqch6">
                    <Zap
                      className={`mr-3 ${getStatusColor(metric.status)}`}
                      size={16}
                      data-oid="nzi2o8n"
                    />

                    <span className="text-tech-white" data-oid="2c5po19">
                      {metric.metric}
                    </span>
                  </div>
                  <div className="text-right" data-oid="z9z_8hs">
                    <div
                      className={`font-semibold ${getStatusColor(metric.status)}`}
                      data-oid="v7e1axa"
                    >
                      {metric.value}
                    </div>
                    <div
                      className="text-xs text-medium-gray capitalize"
                      data-oid="1vc-z92"
                    >
                      {metric.status}
                    </div>
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
