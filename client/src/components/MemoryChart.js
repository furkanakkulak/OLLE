import React, { useContext, useState, useEffect } from 'react';
import { SystemInfoContext } from '../context/SystemInfoContext';
import ApexCharts from 'react-apexcharts';
import axios from 'axios';

const MemoryChart = () => {
  const { memoryInfo } = useContext(SystemInfoContext);
  const [memorySeries, setMemorySeries] = useState([]);
  const [totalMemory, setTotalMemory] = useState(0);

  useEffect(() => {
    if (totalMemory === 0) {
      fetchTotalMemory();
    }
    if (memoryInfo) {
      updateMemoryData(memoryInfo);
    }
  }, [memoryInfo]);

  function bytesToGB(bytes) {
    if (bytes === 0) return '0 GB';
    const GB = bytes / (1024 * 1024 * 1024);
    return GB.toFixed(2);
  }

  const fetchTotalMemory = async () => {
    try {
      const response = await axios.post(
        'http://localhost:4000/api/system-info',
        { command: 'TOTALMEM' }
      );
      setTotalMemory(response.data.data);
    } catch (error) {
      console.error('Error fetching total memory:', error);
    }
  };

  const updateMemoryData = (memoryInfo) => {
    // Her yeni bellek verisi geldiğinde state'i güncelle
    const freeMemoryBytes = parseFloat(memoryInfo);
    const usedMemoryGb = bytesToGB(totalMemory - freeMemoryBytes); // Kullanılan bellek miktarını hesapla
    setMemorySeries((prevMemoryUsage) => [
      ...prevMemoryUsage,
      { x: new Date(), y: usedMemoryGb },
    ]);
  };

  // Grafik seçenekleri
  const options = {
    chart: {
      id: 'memory-chart',
      type: 'line',
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      type: 'datetime',
    },
    yaxis: {
      title: {
        text: 'Memory Usage (GB)',
      },
    },
    stroke: {
      width: 1.5,
    },
  };

  return (
    <div className="p-3 shadow rounded col-span-2 md:col-span-1 flex flex-col gap-2">
      <p className="text-lg font-bold">
        <i className="fa-solid fa-memory"></i> Memory Usage
      </p>
      <ApexCharts
        options={options}
        series={[{ name: 'Memory Usage', data: memorySeries }]}
        type="line"
        height={350}
      />
      <div className="text-center text-sm">
        Memory: {bytesToGB(totalMemory - memoryInfo)}GB /
        {bytesToGB(totalMemory)}GB (
        {(((totalMemory - memoryInfo) / totalMemory) * 100).toFixed(2)}%)
      </div>
    </div>
  );
};

export default MemoryChart;
