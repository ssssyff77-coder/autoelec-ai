import React, { createContext, useContext, useState, useEffect } from 'react';
import { RouteType, VehicleSelection, UserProfile } from '../types';

interface AppContextType {
  currentRoute: RouteType;
  setCurrentRoute: (route: RouteType) => void;
  selectedVehicle: VehicleSelection | null;
  setSelectedVehicle: (vehicle: VehicleSelection | null) => void;
  isVehicleModalOpen: boolean;
  setIsVehicleModalOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  user: UserProfile;
  setUserRole: (role: UserProfile['role']) => void;
  setSubscriptionTier: (tier: 'مجاني' | 'فني احترافي' | 'ورشة شريكة') => void;
  notificationsCount: number;
  targetWiringSearch: string;
  setTargetWiringSearch: (query: string) => void;
  navigateToWiring: (queryOrDtc?: string) => void;
  isOffline: boolean;
  setIsOffline: (offline: boolean) => void;
  isSyncing: boolean;
  lastSyncTime: string;
  syncData: () => Promise<void>;
}

const defaultUser: UserProfile = {
  id: 'usr-1',
  name: 'المهندس علي السعيد',
  email: 'ali.electrician@autoelec.pro',
  role: 'فني معتمد',
  subscriptionTier: 'فني احترافي',
  points: 1250,
  completedCourses: 4,
  earnedCertificates: 2,
  avatar: '👨‍🔧'
};

const defaultVehicle: VehicleSelection = {
  companyId: 'toyota',
  companyName: 'تويوتا',
  modelId: 'camry',
  modelName: 'كامري (Camry)',
  year: 2021,
  engineId: '2ar-fe',
  engineName: '2.5L 2AR-FE (4-Cyl)',
  systemId: 'efi',
  systemName: 'نظام حقن الوقود وإدارة المحرك (EFI)'
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRoute, setCurrentRoute] = useState<RouteType>('home');
  const [selectedVehicle, setSelectedVehicleState] = useState<VehicleSelection | null>(() => {
    const saved = localStorage.getItem('autoelec_selected_vehicle');
    return saved ? JSON.parse(saved) : defaultVehicle;
  });
  const [isVehicleModalOpen, setIsVehicleModalOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [targetWiringSearch, setTargetWiringSearch] = useState<string>('');
  
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('autoelec_user');
    return saved ? JSON.parse(saved) : defaultUser;
  });

  const [isOffline, setIsOffline] = useState<boolean>(false);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [lastSyncTime, setLastSyncTime] = useState<string>('الآن (الذاكرة محدّثة)');

  const [notificationsCount] = useState<number>(3);

  const setUserRole = (role: UserProfile['role']) => {
    setUser(prev => {
      const updated = { ...prev, role };
      localStorage.setItem('autoelec_user', JSON.stringify(updated));
      return updated;
    });
  };

  const setSubscriptionTier = (subscriptionTier: 'مجاني' | 'فني احترافي' | 'ورشة شريكة') => {
    setUser(prev => {
      const updated = { ...prev, subscriptionTier };
      localStorage.setItem('autoelec_user', JSON.stringify(updated));
      return updated;
    });
  };

  const syncData = async () => {
    setIsSyncing(true);
    await new Promise(r => setTimeout(r, 1200));
    setLastSyncTime(new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' }));
    setIsSyncing(false);
  };

  const navigateToWiring = (queryOrDtc?: string) => {
    if (queryOrDtc) {
      setTargetWiringSearch(queryOrDtc);
    }
    setCurrentRoute('wiring-diagrams');
  };

  const setSelectedVehicle = (vehicle: VehicleSelection | null) => {
    setSelectedVehicleState(vehicle);
    if (vehicle) {
      localStorage.setItem('autoelec_selected_vehicle', JSON.stringify(vehicle));
    } else {
      localStorage.removeItem('autoelec_selected_vehicle');
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentRoute]);

  return (
    <AppContext.Provider
      value={{
        currentRoute,
        setCurrentRoute,
        selectedVehicle,
        setSelectedVehicle,
        isVehicleModalOpen,
        setIsVehicleModalOpen,
        searchQuery,
        setSearchQuery,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        user,
        setUserRole,
        setSubscriptionTier,
        notificationsCount,
        targetWiringSearch,
        setTargetWiringSearch,
        navigateToWiring,
        isOffline,
        setIsOffline,
        isSyncing,
        lastSyncTime,
        syncData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
