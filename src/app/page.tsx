'use client';

import { useState } from 'react';
import Link from 'next/link';

// Mock types
interface Position {
  token0: string;
  token1: string;
  poolAddress: string;
  liquidity: string;
  tickLower: number;
  tickUpper: number;
  currentTick: number;
}

interface NotificationSettings {
  outOfRangeAlerts: boolean;
  impermanentLossAlerts: boolean;
  outOfRangeThreshold: number;
  impermanentLossThreshold: number;
  notificationFrequency: 'realtime' | 'hourly' | 'daily';
}

interface Notification {
  id: string;
  timestamp: number;
  position: Position;
  message: string;
  read: boolean;
}

// Mock data
const mockPositions: Position[] = [
  {
    token0: 'USDC',
    token1: 'ETH',
    poolAddress: '0x...',
    liquidity: '1000000',
    tickLower: -100,
    tickUpper: 100,
    currentTick: 0
  },
  {
    token0: 'USDC',
    token1: 'WBTC',
    poolAddress: '0x...',
    liquidity: '2000000',
    tickLower: -200,
    tickUpper: 200,
    currentTick: 250
  },
  {
    token0: 'ETH',
    token1: 'ARB',
    poolAddress: '0x...',
    liquidity: '500000',
    tickLower: -150,
    tickUpper: 150,
    currentTick: -180
  }
];

const mockNotifications: Notification[] = [
  {
    id: '1',
    timestamp: Date.now() - 3600000, // 1 hour ago
    position: mockPositions[1],
    message: 'USDC/WBTC position is out of range',
    read: false
  },
  {
    id: '2',
    timestamp: Date.now() - 7200000, // 2 hours ago
    position: mockPositions[2],
    message: 'ETH/ARB position is out of range',
    read: true
  }
];

const mockNotificationSettings: NotificationSettings = {
  outOfRangeAlerts: true,
  impermanentLossAlerts: false,
  outOfRangeThreshold: 5,
  impermanentLossThreshold: 10,
  notificationFrequency: 'realtime'
};

export default function Home() {
  const [activeTab, setActiveTab] = useState<'positions' | 'notifications' | 'settings'>('positions');
  const [notificationSettings, setNotificationSettings] = useState(mockNotificationSettings);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const isInRange = (position: Position) => {
    return position.currentTick >= position.tickLower && position.currentTick <= position.tickUpper;
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const handleFrequencyChange = (frequency: NotificationSettings['notificationFrequency']) => {
    setNotificationSettings(prev => ({
      ...prev,
      notificationFrequency: frequency
    }));
  };

  return (
    <main className="min-h-screen p-3 md:p-6">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-3 md:p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-bold text-black">
              Aerodrome Position Monitor
            </h2>
            <p className="text-black text-sm">Monitor your LP positions</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-4">
          <nav className="flex space-x-2 md:space-x-4 overflow-x-auto">
            {['positions', 'notifications', 'settings'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`py-2 px-1 border-b-2 font-medium text-xs md:text-sm whitespace-nowrap ${
                  activeTab === tab
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-black hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content - Fixed height container to prevent layout shifts */}
        <div className="min-h-[300px]">
          {activeTab === 'positions' && (
            <div className="space-y-3">
              {mockPositions.map((position, index) => (
                <Link
                  key={index}
                  href={`/position/${position.poolAddress}`}
                  className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-base font-medium text-black">
                          {position.token0}/{position.token1}
                        </span>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          isInRange(position) 
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {isInRange(position) ? '● In Range' : '● Out of Range'}
                        </span>
                      </div>
                      <p className="text-xs text-black mt-1">
                        Liquidity: ${parseInt(position.liquidity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-3">
              {notifications.length === 0 ? (
                <p className="text-black text-center py-3">No notifications</p>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 rounded-lg ${
                      notification.read ? 'bg-gray-50' : 'bg-blue-50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-black text-sm">{notification.message}</p>
                        <p className="text-xs text-black mt-1">
                          {new Date(notification.timestamp).toLocaleString()}
                        </p>
                      </div>
                      {!notification.read && (
                        <button
                          onClick={() => markNotificationAsRead(notification.id)}
                          className="text-xs text-blue-600 hover:text-blue-800"
                        >
                          Mark as read
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-medium text-black">Out of Range Alerts</h3>
                    <p className="text-xs text-black">Get notified when positions go out of range</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notificationSettings.outOfRangeAlerts}
                      onChange={(e) => setNotificationSettings(prev => ({
                        ...prev,
                        outOfRangeAlerts: e.target.checked
                      }))}
                      className="sr-only peer"
                    />
                    <div className="w-10 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="mt-4">
                  <h3 className="text-base font-medium text-black mb-2">Notification Frequency</h3>
                  <div className="space-y-2">
                    {(['realtime', 'hourly', 'daily'] as const).map((frequency) => (
                      <div 
                        key={frequency}
                        onClick={() => handleFrequencyChange(frequency)}
                        className={`p-3 rounded-lg border cursor-pointer ${
                          notificationSettings.notificationFrequency === frequency 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-black text-sm">{frequency}</p>
                          </div>
                          {notificationSettings.notificationFrequency === frequency && (
                            <div className="h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
