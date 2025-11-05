import React from 'react';
import { ClipboardList, Minus, CalendarDays, CheckCircle, Clock, Users } from 'lucide-react';

const stats = [
  {
    id: 1,
    icon: <ClipboardList className="text-blue-500 w-6 h-6" />,
    label: 'Active To-Dos',
    value: 23,
  },
  {
    id: 2,
    icon: <Minus className="text-red-500 w-6 h-6" />,
    label: 'Pending RFIs',
    value: 8,
  },
  {
    id: 3,
    icon: <CalendarDays className="text-green-500 w-6 h-6" />,
    label: "Today's Task",
    value: 12,
  },
  {
    id: 4,
    icon: <CheckCircle className="text-emerald-500 w-6 h-6" />,
    label: 'Completed',
    value: 45,
  },
  {
    id: 5,
    icon: <Clock className="text-purple-500 w-6 h-6" />,
    label: 'Milestones',
    value: 5,
  },
  {
    id: 6,
    icon: <Users className="text-indigo-500 w-6 h-6" />,
    label: 'Team Members',
    value: 15,
  },
];

const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-6 w-full">
      {stats.map((item) => (
        <div
          key={item.id}
          className="bg-white shadow-sm rounded-2xl p-4 sm:p-5 flex flex-col items-start hover:shadow-md transition-shadow duration-300"
        >
          <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-gray-50 rounded-full mb-3">
            {item.icon}
          </div>
          <p className="text-gray-600 text-xs sm:text-sm font-medium mb-1">{item.label}</p>
          <p className="text-black text-xl sm:text-2xl font-semibold">{item.value}</p>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
