import React, { useContext, useState, useEffect } from 'react';
import { SystemInfoContext } from '../context/SystemInfoContext';
import ApexCharts from 'react-apexcharts';

const CPUChart = () => {
  const { cpuInfo } = useContext(SystemInfoContext);
  const [cpuSeries, setCpuSeries] = useState([]);

  useEffect(() => {
    if (cpuInfo) {
      updateCpuData(cpuInfo);
    }
  }, [cpuInfo]);

  const updateCpuData = (tabs) => {
    const newData = { ...cpuSeries };
    cpuInfo.forEach((cpu, index) => {
      const cpuName = `CPU${index + 1} - ${cpu.model}`;
      const speedGHz = parseFloat(cpu.speed) / 1000;
      const newDataPoint = { x: new Date(), y: speedGHz };

      // CPU adına göre verileri güncelle
      if (!newData[cpuName]) {
        newData[cpuName] = [];
      }
      // newData[cpuName] = [...newData[cpuName], newDataPoint].slice(-20); // Son 20 veriyi sakla
      newData[cpuName] = [...newData[cpuName], newDataPoint];
    });

    setCpuSeries(newData);
  };

  // Grafik seçenekleri
  const options = {
    chart: {
      id: 'cpu-chart',
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
        text: 'CPU Speed (GHz)',
      },
    },
    stroke: {
      width: 1.5,
    },
  };

  return (
    <div className="p-3 shadow rounded col-span-2 md:col-span-1 flex flex-col gap-2">
      <p className="text-lg font-bold">
        <i className="fa-solid fa-microchip"></i> CPU Speed
      </p>
      <ApexCharts
        options={options}
        series={Object.entries(cpuSeries).map(([name, data]) => ({
          name,
          data,
        }))}
        type="line"
        height={350}
      />
    </div>
  );
};

export default CPUChart;
