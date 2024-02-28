import React, { useContext, useState, useEffect } from 'react';
import { SystemInfoContext } from '../context/SystemInfoContext';
import axios from 'axios';

const Informations = () => {
  const { uptime } = useContext(SystemInfoContext);
  const [osInfo, setOsInfo] = useState();
  const [arch, setArch] = useState('');
  const [platform, setPlatform] = useState('');

  useEffect(() => {
    axios
      .post('http://localhost:4000/api/system-info', {
        command: 'type',
      })
      .then((response) => {
        setOsInfo(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching OS info:', error);
      });

    axios
      .post('http://localhost:4000/api/system-info', {
        command: 'ARCH',
      })
      .then((response) => {
        setArch(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching architecture info:', error);
      });

    axios
      .post('http://localhost:4000/api/system-info', {
        command: 'PLATFORM',
      })
      .then((response) => {
        setPlatform(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching platform info:', error);
      });
  }, []);

  const formatSecondsToYWDHMS = (seconds) => {
    const years = Math.floor(seconds / (365 * 24 * 3600));
    seconds %= 365 * 24 * 3600;
    const months = Math.floor(seconds / (30 * 24 * 3600));
    seconds %= 30 * 24 * 3600;
    const weeks = Math.floor(seconds / (7 * 24 * 3600));
    seconds %= 7 * 24 * 3600;
    const days = Math.floor(seconds / (24 * 3600));
    seconds %= 24 * 3600;
    const hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    const minutes = Math.floor(seconds / 60);
    seconds %= 60;

    const formattedYears = years > 0 ? `${years}Y:` : '';
    const formattedMonths = months > 0 ? `${months}M:` : '';
    const formattedWeeks = weeks > 0 ? `${weeks}W:` : '';
    const formattedDays = days > 0 ? `${days}D:` : '0D:';
    const formattedHours = hours > 0 ? `${hours}H:` : '0H:';
    const formattedMinutes = minutes > 0 ? `${minutes}M:` : '0M:';
    const formattedSeconds = seconds > 0 ? `${seconds}s` : '0s';

    return `${formattedYears}${formattedMonths}${formattedWeeks}${formattedDays}${formattedHours}${formattedMinutes}${formattedSeconds}`;
  };

  return (
    <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="p-3 shadow rounded col-span-1 flex flex-col gap-2">
        <p className="text-lg font-bold">
          <i className="fa-solid fa-clock"></i> Upkeep Time
        </p>
        <p className=" font-light tracking-tight text-xl">
          {formatSecondsToYWDHMS(uptime)}
        </p>
      </div>
      <div className="p-3 shadow rounded col-span-1 flex flex-col gap-2">
        <p className="text-lg font-bold">
          <i className="fa-solid fa-desktop"></i> OS
        </p>
        <p className=" font-light tracking-tight text-xl">
          {osInfo}/{platform} ({arch})
        </p>
      </div>
    </div>
  );
};

export default Informations;
