import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Home, 
  Ship, 
  FileText, 
  Package, 
  MapPin, 
  LogOut, 
  User 
} from 'lucide-react';

const ModernSidebar = () => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/');
  };

  const SidebarItem = ({ icon: Icon, label, to, onClick }) => (
    <li className="group">
      {onClick ? (
        <a 
          href="#" 
          onClick={onClick} 
          className="flex items-center p-3 transition-colors 
          group-hover:bg-blue-50 group-hover:text-blue-600 
          dark:group-hover:bg-gray-800 dark:group-hover:text-blue-400"
        >
          <Icon className="w-6 h-6 mr-4" />
          {isExpanded && <span className="text-sm">{label}</span>}
        </a>
      ) : (
        <Link 
          to={to} 
          className="flex items-center p-3 transition-colors 
          group-hover:bg-blue-50 group-hover:text-blue-600 
          dark:group-hover:bg-gray-800 dark:group-hover:text-blue-400"
        >
          <Icon className="w-6 h-6 mr-4" />
          {isExpanded && <span className="text-sm">{label}</span>}
        </Link>
      )}
    </li>
  );

  return (
    <div 
      className={`fixed top-0 left-0 h-screen bg-white dark:bg-gray-900 
      shadow-lg transition-width duration-300 
      ${isExpanded ? 'w-64' : 'w-20'} 
      flex flex-col border-r dark:border-gray-800`}
    >
      <div className="p-4 flex justify-between items-center">
        {isExpanded && (
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Logistics
          </h1>
        )}
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="ml-auto text-gray-600 hover:text-blue-600 
          dark:text-gray-300 dark:hover:text-blue-400"
        >
          {isExpanded ? '←' : '→'}
        </button>
      </div>

      <nav className="flex-1 mt-8">
        <ul className="space-y-2">
          <SidebarItem icon={Home} label="Home" to="/AnimatedText" />
          <SidebarItem icon={Ship} label="View Ships" to="/ShipPage" />
          <SidebarItem icon={FileText} label="Importer Invoice" to="/ImpInvoice" />
          <SidebarItem icon={Package} label="Exporter Invoice" to="/ExpInvoice" />
          <SidebarItem icon={MapPin} label="Tracking" to="/tracking" />
          <SidebarItem icon={LogOut} label="Logout" onClick={handleLogout} />
        </ul>
      </nav>

      <div className="p-4 border-t dark:border-gray-800 flex items-center">
        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
          <User className="w-6 h-6 text-blue-600" />
        </div>
        {isExpanded && (
          <div className="ml-3">
            <p className="font-medium text-gray-800 dark:text-white">User</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Kiev, Ukraine</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModernSidebar;