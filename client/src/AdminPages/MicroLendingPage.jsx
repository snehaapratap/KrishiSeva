import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { mockLendingItems } from "./data/mockLendingData";

const MicroLendingPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [maxPrice, setMaxPrice] = useState(1000);

  const filteredItems = useMemo(() => {
    return mockLendingItems.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;
      const matchesPrice = item.dailyRate <= maxPrice;

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [searchQuery, selectedCategory, maxPrice]);

  const categories = ["all", "tools", "services", "tractors", "livestock"];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Micro Lending Marketplace</h1>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Max Price:</span>
              <input
                type="range"
                min="0"
                max="1000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-32"
              />
              <span className="text-sm font-medium">${maxPrice}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-sm overflow-hidden"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500">{item.location}</p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  ${item.dailyRate}/day
                </span>
              </div>
              <p className="mt-2 text-gray-600">{item.description}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  Owner: {item.owner}
                </span>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  Request to Rent
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MicroLendingPage;
