import { useState, useEffect } from "react";
import UserNavbar from "../UserNavbar";
import { Tractor, Grain, HandHelping, Plus, X } from "lucide-react";
import axios from "axios";

const MicroLendingPage = () => {
  const [listings, setListings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newListing, setNewListing] = useState({
    type: 'TOOL',
    title: '',
    description: '',
    price: '',
    duration: '',
    location: '',
    availability: {
      startDate: '',
      endDate: ''
    }
  });

  const categories = [
    {
      icon: Tractor,
      name: "Tools",
      type: "TOOL",
      description: "Farming tools and equipment",
    },
    {
      icon: Tractor,
      name: "Machinery",
      type: "MACHINERY",
      description: "Tractors and heavy machinery",
    },
    {
      icon: Grain,
      name: "Seeds & Grains",
      type: "SEEDS",
      description: "Various types of seeds and grains",
    },
    {
      icon: HandHelping,
      name: "Services",
      type: "SERVICE",
      description: "Labor and expert services",
    },
  ];

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const response = await axios.get('/api/microlending');
      setListings(response.data);
    } catch (error) {
      console.error('Error fetching listings:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/microlending', newListing);
      setShowModal(false);
      setNewListing({
        type: 'TOOL',
        title: '',
        description: '',
        price: '',
        duration: '',
        location: '',
        availability: {
          startDate: '',
          endDate: ''
        }
      });
      fetchListings();
    } catch (error) {
      console.error('Error creating listing:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <UserNavbar />
      <div className="max-w-7xl mx-auto pt-20 px-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Micro Lending Marketplace</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Listing
          </button>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <div
                key={category.name}
                className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <Icon className="w-8 h-8 text-green-600 mb-4" />
                <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
                <p className="text-gray-600">{category.description}</p>
              </div>
            );
          })}
        </div>

        {/* Listings */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Active Listings</h2>
          <div className="space-y-4">
            {listings.map((listing) => (
              <div key={listing._id} className="border-b pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{listing.title}</h3>
                    <p className="text-sm text-gray-600">{listing.description}</p>
                    <p className="text-sm text-gray-600">
                      Available from {new Date(listing.availability.startDate).toLocaleDateString()} 
                      to {new Date(listing.availability.endDate).toLocaleDateString()}
                    </p>
                    <p className="text-sm font-medium text-green-600">${listing.price} / {listing.duration}</p>
                  </div>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    {listing.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Create Listing Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Create New Listing</h3>
                <button onClick={() => setShowModal(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Type</label>
                  <select
                    value={newListing.type}
                    onChange={(e) => setNewListing({...newListing, type: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  >
                    {categories.map((cat) => (
                      <option key={cat.type} value={cat.type}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    value={newListing.title}
                    onChange={(e) => setNewListing({...newListing, title: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    value={newListing.description}
                    onChange={(e) => setNewListing({...newListing, description: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    rows="3"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Price</label>
                    <input
                      type="number"
                      value={newListing.price}
                      onChange={(e) => setNewListing({...newListing, price: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Duration</label>
                    <input
                      type="text"
                      value={newListing.duration}
                      onChange={(e) => setNewListing({...newListing, duration: e.target.value})}
                      placeholder="per day/week"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Location</label>
                  <input
                    type="text"
                    value={newListing.location}
                    onChange={(e) => setNewListing({...newListing, location: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Start Date</label>
                    <input
                      type="date"
                      value={newListing.availability.startDate}
                      onChange={(e) => setNewListing({
                        ...newListing,
                        availability: {...newListing.availability, startDate: e.target.value}
                      })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">End Date</label>
                    <input
                      type="date"
                      value={newListing.availability.endDate}
                      onChange={(e) => setNewListing({
                        ...newListing,
                        availability: {...newListing.availability, endDate: e.target.value}
                      })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    Create Listing
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MicroLendingPage;
