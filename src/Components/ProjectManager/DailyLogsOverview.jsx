import React from 'react';
import DashboardStats from './DashboardStats';
import { Camera, Edit3, AlertTriangle, Send } from 'lucide-react';

const DailyLogsOverview = () => {
  return (
    <div>
        <DashboardStats />
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen space-y-6 sm:space-y-10">
      {/* Card 1 */}
      <div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-xl sm:text-2xl font-semibold text-black">Daily Logs Overview</h1>
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-md flex items-center gap-2 w-full sm:w-auto justify-center">
            <span className="text-lg font-bold">+</span> Create Log Entry
          </button>
        </div>

        <div className="bg-white shadow-sm border border-gray-200 rounded-2xl p-4 sm:p-6 flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div>
              <h2 className="font-semibold text-gray-900 text-lg">South Shore Estates</h2>
              <p className="text-gray-600 text-sm mt-1">2024-01-13 • Time</p>
              <button className="bg-gray-100 border text-gray-700 text-xs font-medium py-1 px-3 mt-2 rounded-md">
                Framing Crew A
              </button>
            </div>

            <div className="text-right">
              <p className="text-gray-700 text-sm">By <span className="font-medium">Mike Chen</span></p>
              <p className="font-semibold text-gray-900 mt-1">12 Photos</p>
            </div>
          </div>

          <div className="mt-3">
            <h3 className="font-semibold text-gray-900 mb-2">Activities :</h3>
            <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
              <li>Completed framing on units 12-14</li>
              <li>Started electrical rough-in prep</li>
              <li>Delivered lumber for next phase</li>
            </ul>
          </div>

          <div className="mt-3">
            <h3 className="font-semibold text-red-600 mb-1">Issues:</h3>
            <p className="text-sm text-orange-600 flex items-center gap-2">
              <AlertTriangle size={16} className="text-yellow-500" />
              Minor delay on electrical delivery
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-5 gap-4">
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <button className="flex items-center gap-2 border border-gray-300 text-gray-700 text-sm font-medium py-2 px-4 rounded-md hover:bg-gray-100 transition justify-center">
                <Camera size={16} /> View Photos
              </button>
              <button className="flex items-center gap-2 border border-gray-300 text-gray-700 text-sm font-medium py-2 px-4 rounded-md hover:bg-gray-100 transition justify-center">
                <Edit3 size={16} /> Edit
              </button>
            </div>

            <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-md flex items-center gap-2 w-full sm:w-auto justify-center">
              <Send size={16} /> Share Report
            </button>
          </div>
        </div>
      </div>

      {/* Card 2 */}
      <div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-xl sm:text-2xl font-semibold text-black">Daily Logs Overview</h1>
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-md flex items-center gap-2 w-full sm:w-auto justify-center">
            <span className="text-lg font-bold">+</span> Create Log Entry
          </button>
        </div>

        <div className="bg-white shadow-sm border border-gray-200 rounded-2xl p-4 sm:p-6 flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div>
              <h2 className="font-semibold text-gray-900 text-lg">Lakefront Custom</h2>
              <p className="text-gray-600 text-sm mt-1">2024-01-12 • Overcast, 8°C</p>
              <button className="bg-gray-100 border text-gray-700 text-xs font-medium py-1 px-3 mt-2 rounded-md">
                Foundation Crew
              </button>
            </div>

            <div className="text-left sm:text-right">
              <p className="text-gray-700 text-sm">By <span className="font-medium">Sarah Johnson</span></p>
              <p className="font-semibold text-gray-900 mt-1">8 Photos</p>
            </div>
          </div>

          <div className="mt-3">
            <h3 className="font-semibold text-gray-900 mb-2">Activities :</h3>
            <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
              <li>Poured foundation walls</li>
              <li>Installed vapor barrier</li>
              <li>Backfilled north side</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-5 gap-4">
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <button className="flex items-center gap-2 border border-gray-300 text-gray-700 text-sm font-medium py-2 px-4 rounded-md hover:bg-gray-100 transition justify-center">
                <Camera size={16} /> View Photos
              </button>
              <button className="flex items-center gap-2 border border-gray-300 text-gray-700 text-sm font-medium py-2 px-4 rounded-md hover:bg-gray-100 transition justify-center">
                <Edit3 size={16} /> Edit
              </button>
            </div>

            <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-md flex items-center gap-2 w-full sm:w-auto justify-center">
              <Send size={16} /> Share Report
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default DailyLogsOverview;