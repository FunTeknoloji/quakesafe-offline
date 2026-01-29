import { useState, useEffect } from 'react';
import { MapPin, Navigation, Info, Search } from 'lucide-react';

const Map = () => {
  const [userLocation, setUserLocation] = useState(null);

  // Mock data for assembly areas (Toplanma Alanları)
  const assemblyAreas = [
    { id: 1, name: "Atatürk Parkı", lat: 41.0082, lon: 28.9784, address: "Merkez Mah. No:1" },
    { id: 2, name: "Cumhuriyet Meydanı", lat: 41.0122, lon: 28.9714, address: "Hürriyet Cad. No:12" },
    { id: 3, name: "Spor Kompleksi", lat: 41.0052, lon: 28.9854, address: "Gül Sokak No:5" },
    { id: 4, name: "Belediye Bahçesi", lat: 41.0152, lon: 28.9654, address: "Atatürk Bulvarı" },
  ];

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setUserLocation({ lat: pos.coords.latitude, lon: pos.coords.longitude });
      });
    }
  }, []);

  const calculateDistance = (lat2, lon2) => {
    if (!userLocation) return null;
    // Simple Euclidean distance for mock
    const d = Math.sqrt(Math.pow(lat2 - userLocation.lat, 2) + Math.pow(lon2 - userLocation.lon, 2)) * 111;
    return d.toFixed(1);
  };

  return (
    <div className="pb-20">
      <h1 className="text-3xl font-black mb-6 border-b border-gray-800 pb-2 text-emerald-500">TOPLANMA ALANLARI</h1>

      <div className="bg-gray-900/50 rounded-2xl p-4 mb-6 border border-gray-800 flex items-center gap-3">
        <Search className="text-gray-500" size={20} />
        <input
          type="text"
          placeholder="İlçe veya mahalle ara..."
          className="bg-transparent border-none focus:outline-none text-white w-full"
        />
      </div>

      <div className="space-y-4">
        {assemblyAreas.map(area => (
          <div key={area.id} className="bg-gray-900 border border-gray-800 rounded-2xl p-5 flex items-start justify-between">
            <div className="flex gap-4">
              <div className="bg-emerald-900/30 p-3 rounded-xl">
                <MapPin className="text-emerald-500" size={28} />
              </div>
              <div>
                <h3 className="font-bold text-xl">{area.name}</h3>
                <p className="text-sm text-gray-400">{area.address}</p>
                {userLocation && (
                  <div className="flex items-center gap-1 mt-2 text-emerald-400 font-bold text-sm">
                    <Navigation size={14} />
                    <span>{calculateDistance(area.lat, area.lon)} KM Uzaklıkta</span>
                  </div>
                )}
              </div>
            </div>
            <button className="bg-emerald-600 p-2 rounded-lg">
              <Navigation size={20} />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-blue-900/20 border border-blue-800 rounded-2xl p-6">
        <h2 className="text-lg font-bold text-blue-400 mb-2 flex items-center gap-2">
          <Info size={20} /> Çevrimdışı Harita
        </h2>
        <p className="text-gray-400 text-sm">
          Harita verileri önceden indirildiği için internetiniz olmasa dahi konumunuzu ve en yakın alanları görebilirsiniz.
        </p>
      </div>
    </div>
  );
};

export default Map;
