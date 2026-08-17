import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { MobileDrawer } from './components/layout/MobileDrawer';
import { VehicleSelectorModal } from './components/common/VehicleSelectorModal';

import { HomePage } from './pages/HomePage';
import { VehicleSelectorPage } from './pages/VehicleSelectorPage';
import { SmartDiagnosisPage } from './pages/SmartDiagnosisPage';
import { DtcPage } from './pages/DtcPage';
import { SensorsPage } from './pages/SensorsPage';
import { ActuatorsPage } from './pages/ActuatorsPage';
import { LiveDataPage } from './pages/LiveDataPage';
import { ObdPage } from './pages/ObdPage';
import { AiMechanicPage } from './pages/AiMechanicPage';
import { KnowledgePage } from './pages/KnowledgePage';
import { CoursesPage } from './pages/CoursesPage';
import { ExpertLibraryPage } from './pages/ExpertLibraryPage';
import { WiringDiagramsPage } from './pages/WiringDiagramsPage';
import { RepairCasesPage } from './pages/RepairCasesPage';
import { ExamsPage } from './pages/ExamsPage';
import { CertificatesPage } from './pages/CertificatesPage';
import { ForumPage } from './pages/ForumPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { ProfilePage } from './pages/ProfilePage';
import { AdminPage } from './pages/AdminPage';
import { DeveloperPage } from './pages/DeveloperPage';

const MainContent: React.FC = () => {
  const { currentRoute } = useApp();

  const renderRoute = () => {
    switch (currentRoute) {
      case 'home':
        return <HomePage />;
      case 'vehicle-select':
        return <VehicleSelectorPage />;
      case 'smart-diagnosis':
        return <SmartDiagnosisPage />;
      case 'dtc':
        return <DtcPage />;
      case 'sensors':
        return <SensorsPage />;
      case 'actuators':
        return <ActuatorsPage />;
      case 'live-data':
        return <LiveDataPage />;
      case 'obd':
        return <ObdPage />;
      case 'ai-mechanic':
        return <AiMechanicPage />;
      case 'knowledge':
        return <KnowledgePage />;
      case 'courses':
        return <CoursesPage />;
      case 'expert-library':
        return <ExpertLibraryPage />;
      case 'wiring-diagrams':
        return <WiringDiagramsPage />;
      case 'repair-cases':
        return <RepairCasesPage />;
      case 'exams':
        return <ExamsPage />;
      case 'certificates':
        return <CertificatesPage />;
      case 'forum':
        return <ForumPage />;
      case 'notifications':
        return <NotificationsPage />;
      case 'profile':
        return <ProfilePage />;
      case 'admin':
        return <AdminPage />;
      case 'developer':
        return <DeveloperPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-cairo flex flex-col selection:bg-amber-500/30 selection:text-amber-300">
      <Header />
      <div className="flex-1 max-w-7xl w-full mx-auto flex">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">
          {renderRoute()}
        </main>
      </div>
      <MobileDrawer />
      <VehicleSelectorModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
