'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AlertsPage() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the email to your backend
    setIsSubscribed(true);
  };

  return (
    <main className="min-h-screen p-3 md:p-6">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-3 md:p-4">
        <div className="mb-4">
          <Link href="/" className="text-blue-600 hover:text-blue-800 mb-2 inline-block text-sm">
            ← Back to Home
          </Link>
          <h2 className="text-xl font-bold text-black">Alert Settings</h2>
        </div>

        {isSubscribed ? (
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-green-800">You've successfully subscribed to alerts!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            >
              Subscribe to Alerts
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
