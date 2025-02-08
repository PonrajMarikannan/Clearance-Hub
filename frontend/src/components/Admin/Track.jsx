import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  Ship,
  CheckCircle,
  Clock,
  AlertCircle,
  X,
  Anchor,
  Navigation,
  Ship as ShipIcon,
  Building2,
  Container,
  ArrowRight,
  MapPin,
  Package,
  Search,
} from "lucide-react";
import axios from "axios";

const Track = () => {
  const [shipsData, setShipsData] = useState([]);
  const [selectedShip, setSelectedShip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const getStatusBadgeColor = (status) => {
    const statusColors = {
      "At Anchor": "bg-yellow-100 text-yellow-800",
      Departed: "bg-purple-100 text-purple-800",
      "In Transit": "bg-blue-100 text-blue-800",
      Arriving: "bg-orange-100 text-orange-800",
      Docked: "bg-green-100 text-green-800",
    };
    return statusColors[status] || "bg-gray-100 text-gray-800";
  };

  // Define status stages with icons and colors
  const statusStages = [
    {
      name: "At Anchor",
      label: "At-Anchor",
      icon: Anchor,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    {
      name: "Departed",
      label: "Departure",
      icon: Navigation,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      name: "In Transit",
      label: "In-Transit",
      icon: ShipIcon,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      name: "Arriving",
      label: "Customs Clearance",
      icon: Building2,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      name: "Docked",
      label: "Docked",
      icon: Container,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
  ];

  // Get status completion based on current ship status
  const getStatusCompletion = (shipStatus, currentStage) => {
    const stageIndex = statusStages.findIndex(
      (stage) => stage.name === currentStage
    );
    const shipStatusIndex = statusStages.findIndex(
      (stage) => stage.name === shipStatus
    );
    return shipStatusIndex >= stageIndex;
  };

  // Get current stage info
  const getCurrentStageInfo = (status) => {
    return (
      statusStages.find((stage) => stage.name === status) || statusStages[0]
    );
  };

  useEffect(() => {
    const fetchShips = async () => {
      try {
        const response = await axios.get(
          "http://localhost:7070/ccts/getAllShip"
        );
        setShipsData(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch ship data");
        setLoading(false);
      }
    };

    fetchShips();
  }, []);

  const filteredShips = shipsData.filter((ship) =>
    ship.shipName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderStatusPipeline = (ship) => {
    const currentStage = getCurrentStageInfo(ship.shipStatus);

    return (
      <div className="mt-4">
        <div className="mb-4 p-3 rounded-lg flex items-center gap-3 bg-gray-50">
          <div className={`p-2 rounded-full ${currentStage.bgColor}`}>
            <currentStage.icon className={`h-6 w-6 ${currentStage.color}`} />
          </div>
          <div>
            <p className="text-sm font-medium">Current Status</p>
            <p className={`text-lg font-bold ${currentStage.color}`}>
              {currentStage.label}
            </p>
          </div>
        </div>
        <div className="relative">
          {/* Progress Line */}
          <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200" />
          <div
            className="absolute top-5 left-0 h-1 bg-blue-500 transition-all"
            style={{
              width: `${
                (statusStages.findIndex(
                  (stage) => stage.name === ship.shipStatus
                ) +
                  1) *
                (100 / statusStages.length)
              }%`,
            }}
          />

          {/* Status Steps */}
          <div className="relative flex justify-between">
            {statusStages.map((stage, index) => {
              const isCompleted = getStatusCompletion(
                ship.shipStatus,
                stage.name
              );
              const isCurrent = ship.shipStatus === stage.name;

              return (
                <div key={stage.name} className="flex flex-col items-center">
                  <div
                    className={`rounded-full p-2 transition-all duration-200 ${
                      isCurrent
                        ? `${stage.bgColor} ${stage.color} ring-4 ring-offset-2 ring-blue-100`
                        : isCompleted
                        ? `${stage.bgColor} ${stage.color}`
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    <stage.icon className="h-6 w-6" />
                  </div>
                  <span
                    className={`mt-2 text-sm font-medium ${
                      isCurrent
                        ? stage.color
                        : isCompleted
                        ? "text-gray-900"
                        : "text-gray-400"
                    }`}
                  >
                    {stage.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const ShipDetailsModal = ({ ship, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Ship Details</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-center gap-2 mb-1">
            <Ship className="h-5 w-5 text-blue-600" />
            <h3 className="text-xl font-semibold text-gray-800">
              {ship.shipName}
            </h3>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <MapPin className="h-4 w-4" />
            <span>
              {ship.boardingPort} → {ship.departurePort}
            </span>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Package className="h-4 w-4" />
              <span>
                Capacity: {ship.currentLoad} / {ship.maxCapacity}
              </span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${(ship.currentLoad / ship.maxCapacity) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h4 className="font-semibold mb-4">Status Timeline</h4>
          {renderStatusPipeline(ship)}
        </div>
      </div>
    </div>
  );

  if (loading)
    return (
      <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-md">
        <p>Loading ship data...</p>
      </div>
    );

  if (error)
    return (
      <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-md">
        <p className="text-red-500">{error}</p>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-6">
      <header className="mb-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Ship className="h-6 w-6" />
          <h2 className="text-xl font-bold">Ship Tracking</h2>
        </div>
      </header>

      <div className="flex justify-center mb-6">
      <div className="relative w-full max-w-md">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200 transition duration-200"
          placeholder="search ship"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>


      <section className="mb-6 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {filteredShips.map((ship) => (
            <div
              key={ship.id}
              onClick={() => {
                setSelectedShip(ship);
                setShowModal(true);
              }}
              className={`cursor-pointer group p-4 rounded-lg border transition-all duration-200 hover:shadow-lg ${
                selectedShip?.id === ship.id
                  ? "border-blue-300 bg-blue-50"
                  : "border-gray-200 hover:border-blue-300"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div
                    className={`p-2 rounded-lg ${
                      selectedShip?.id === ship.id
                        ? "bg-blue-100"
                        : "bg-gray-100 group-hover:bg-blue-50"
                    }`}
                  >
                    <Ship
                      className={`h-5 w-5 ${
                        selectedShip?.id === ship.id
                          ? "text-blue-600"
                          : "text-gray-600 group-hover:text-blue-600"
                      }`}
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {ship.shipName}
                    </h4>
                    <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                      <MapPin className="h-4 w-4" />
                      <span>
                        {ship.boardingPort} → {ship.departurePort}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {showModal && selectedShip && (
        <ShipDetailsModal
          ship={selectedShip}
          onClose={() => {
            setShowModal(false);
            setSelectedShip(null);
          }}
        />
      )}
    </div>
  );
};

export default Track;
