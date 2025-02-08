import React, { useEffect, useState } from 'react';
import { 
    ShipIcon,
    DollarSign,
    Users,
    BarChart2,
} from 'lucide-react';
import axios from 'axios';

function Card() {
    const [stats, setStats] = useState([
        { id: 1, title: 'Total Users', value: '0', icon: Users, change: '+0%', color: 'bg-purple-500' },
        { id: 2, title: 'Total Ships', value: '0', icon: ShipIcon, change: '+0%', color: 'bg-green-500' },
        { id: 3, title: 'Total Officers', value: '0', icon: BarChart2, change: '+0%', color: 'bg-orange-500' },
        { id: 4, title: 'Total Revenue', value: '$0', icon: DollarSign, change: '+0%', color: 'bg-blue-500' }
    ]);

    const fetchData = async () => {
        try {
            // Fetch Total Ships
            const shipsResponse = await axios.get("http://localhost:7070/ccts/getAllShip");
            const totalShips = shipsResponse.data.length; // Assuming the result is an array

            // Fetch Total Users and Count Officers
            const usersResponse = await axios.get("http://localhost:7070/ccts/getAllUser");
            const totalUsers = usersResponse.data.length; // Assuming the result is an array
            const officerCount = usersResponse.data.filter(user => user.role === 'officer').length; // Adjust based on your data structure
            
            // Update stats
            setStats([
                { id: 1, title: 'Total Users', value: totalUsers.toString(), icon: Users, change: '+0%', color: 'bg-purple-500' },
                { id: 2, title: 'Total Ships', value: totalShips.toString(), icon: ShipIcon, change: '+0%', color: 'bg-green-500' },
                { id: 3, title: 'Total Officers', value: officerCount.toString(), icon: BarChart2, change: '+0%', color: 'bg-orange-500' },
                { id: 4, title: 'Total Revenue', value: '$0', icon: DollarSign, change: '+0%', color: 'bg-blue-500' } // Placeholder for revenue
            ]);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []); // Run once when the component mounts

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                    <div key={stat.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300 ease-in-out p-6">
                        <div className="flex items-center justify-between">
                            <div className="flex">
                                <div className="flex items-center">
                                    <div className={`${stat.color} rounded-md p-3 md:p-4 lg:p-2`}>
                                        <Icon className="h-6 w-6 text-white" />
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-xl font-semibold text-gray-900">{stat.value}</h3>
                                    <p className="text-sm text-gray-500">{stat.title}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default Card;