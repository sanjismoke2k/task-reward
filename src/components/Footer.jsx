import { DollarSign } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900/80 border-t border-gray-200/80 dark:border-gray-800/50 py-6 z-10 relative">
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg flex items-center justify-center text-white shadow-sm">
              <DollarSign size={14} />
            </div>
            <span className="font-heading font-bold text-base text-gray-900 dark:text-white">
              TaskRewards
            </span>
          </div>
          <div className="text-gray-400 dark:text-gray-500 text-xs font-medium">
            &copy; {new Date().getFullYear()} TaskRewards. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
