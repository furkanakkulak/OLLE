import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const SystemInfoContext = createContext();

export const SystemInfoProvider = ({ children }) => {
  const [cpuInfo, setCpuInfo] = useState([]);
  const [memoryInfo, setMemoryInfo] = useState('');
  const [uptime, setUptime] = useState(0);
  const [error, setError] = useState(null); // Hata durumu için state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cpuResponse = await axios.post(
          'http://localhost:4000/api/system-info',
          { command: 'CPU' }
        );
        const memoryResponse = await axios.post(
          'http://localhost:4000/api/system-info',
          { command: 'FREEMEM' }
        );
        const uptimeResponse = await axios.post(
          'http://localhost:4000/api/system-info',
          { command: 'UPTIME' }
        );

        setCpuInfo(cpuResponse.data.data);
        setMemoryInfo(memoryResponse.data.data);
        setUptime(uptimeResponse.data.data);
      } catch (error) {
        console.error('Error fetching system info:', error);
        setError(error);
      }
    };

    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <SystemInfoContext.Provider value={{ cpuInfo, memoryInfo, uptime }}>
      {children}
    </SystemInfoContext.Provider>
  );
};
