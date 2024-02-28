import React, { useContext } from 'react';
import CPUChart from './CPUChart';
import MemoryChart from './MemoryChart';
import Informations from './Informations';
import { SystemInfoContext } from '../context/SystemInfoContext';

const Dashboard = () => {
  const { error } = useContext(SystemInfoContext);

  // Hata durumu varsa, hata mesajını göster
  if (error) {
    return <div className="error-message">{error.message}</div>;
  }

  return (
    <div className="grid md:grid-cols-2 gap-5">
      <Informations />
      <CPUChart />
      <MemoryChart />
    </div>
  );
};

export default Dashboard;
