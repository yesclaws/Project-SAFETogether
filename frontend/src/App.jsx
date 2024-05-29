import React, { useState, useEffect  } from 'react';
import Map from './Map';
import { AppShell } from '@mantine/core';
import { NavbarMinimal } from './Navbar';
import { HeaderTabs, SecondHeaderTabs, ThirdHeaderTabs } from './Tabs';
import HeatMap from './Heatmap';
import Incident from './Incident';
import Dashboard from './Dashboard';
import Statistics from './Statistics';
import Upload from './Upload';

function App() {
  const [activeTab, setActiveTab] = useState(0); // Set the default tab to 'Dashboard'
  const [activeHeaderTab, setActiveHeaderTab] = useState('Dashboard'); 
  const handleExit = () => {
    if (window.confirm('Are you sure you want to exit?')) {
      window.close(); // Close the current window/tab if the user confirms
    }
  };
  
  // Refresh to current tab
  // Load the active tab from local storage on component mount
  useEffect(() => {
    const savedActiveTab = localStorage.getItem('activeTab');
    const savedActiveHeaderTab = localStorage.getItem('activeHeaderTab');
    if (savedActiveTab && savedActiveHeaderTab) {
      setActiveTab(Number(savedActiveTab));
      setActiveHeaderTab(savedActiveHeaderTab);
    } 
  }, []);

  // Update local storage when the active tab changes
  useEffect(() => {
    localStorage.setItem('activeTab', activeTab);
    localStorage.setItem('activeHeaderTab', activeHeaderTab);
  }, [activeTab, activeHeaderTab]);

  return (
      <AppShell navbar={{ width: 200, breakpoint: 'lg' }} padding="lg">
      {activeTab === 1 && (
        <AppShell.Header style={{ backgroundColor: '#F8F8FF', transform: 'translateX(125px)', height: '50px' }}>
          <HeaderTabs setActiveHeaderTab={setActiveHeaderTab} activeHeaderTab={activeHeaderTab} />
        </AppShell.Header>
      )}
      {activeTab === 2 && (
        <AppShell.Header style={{ backgroundColor: '#F8F8FF', transform: 'translateX(125px)', height: '50px' }}>
          <SecondHeaderTabs setActiveHeaderTab={setActiveHeaderTab} activeHeaderTab={activeHeaderTab} />
        </AppShell.Header>
      )}
      {activeTab === 0 && (
        <AppShell.Header style={{ backgroundColor: '#F8F8FF', transform: 'translateX(125px)', height: '50px' }}>
          <ThirdHeaderTabs setActiveHeaderTab={setActiveHeaderTab} activeHeaderTab={activeHeaderTab} />
        </AppShell.Header>
      )}
      <AppShell.Navbar style={{ backgroundColor: '#F8F8FF' }}>
        <NavbarMinimal setActiveTab={setActiveTab} activeTab={activeTab} onExitClick={handleExit} />
      </AppShell.Navbar>
      <AppShell.Main>
        {activeTab === 0 && activeHeaderTab === 'Overview(API Data)' && <Dashboard />}
        {activeTab === 0 && activeHeaderTab === 'Overview(SF Data)' && <DashboardSF />}
        {activeTab === 0 && activeHeaderTab != 'Statistics' && <Dashboard />}
        {activeTab === 0 && activeHeaderTab === 'Statistics' && <Statistics />}
        {activeTab === 1 && activeHeaderTab != 'Heat Map' && <Map />} {/* Render the map only for the "Map" tab */}
        {activeTab === 1 && activeHeaderTab === 'Heat Map' && <HeatMap />} {/* Render the HeatMap component for the "Heat Map" tab */}
        {/* {activeTab === 0 && <Dashboard />} */}
        {activeTab === 2 && activeHeaderTab != 'Form' && <Upload />} {/* Render the Upload component for the "Audio Upload" tab */}
        {activeTab === 2 && activeHeaderTab === 'Form' && <Incident />} {/* Render the Incident component for the "Form" tab */}
      </AppShell.Main>
    </AppShell>
  );
}


export default App;
