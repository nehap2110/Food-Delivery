import React, { useContext, useEffect, useState } from "react";
import Title from "../../ui/Title";
import { FaTrash } from "react-icons/fa";
import { appContext } from "../../context/appContext";
import axios from "axios";
import { toast } from "react-toastify";

const FoodList = () => {
  const { backendUrl } = useContext(appContext);
  const [foodList, setFoodList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFoods = async () => {
      if (!backendUrl) {
        console.error("Backend URL is not configured");
        toast.error(
          "Backend URL is not configured. Please check your environment variables."
        );
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        console.log("Fetching foods from:", backendUrl + "/api/food/get-food");
        const response = await axios.get(backendUrl + "/api/food/get-food");
        console.log("Server response:", response.data);

        if (response.data.success) {
          console.log("Setting food list:", response.data.foods);
          setFoodList(response.data.foods || []);
        } else {
          console.error(
            "Server returned unsuccessful response:",
            response.data
          );
          toast.error(
            "Failed to fetch foods: " +
              (response.data.message || "Unknown error")
          );
        }
      } catch (error) {
        console.error("Error fetching foods:", error);
        toast.error(
          "Failed to fetch foods: " + (error.message || "Unknown error")
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchFoods();
  }, [backendUrl]);

  const categories = [
    { value: "all", label: "All Foods" },
    { value: "salad", label: "Salad" },
    { value: "rolls", label: "Rolls" },
    { value: "deserts", label: "Deserts" },
    { value: "sandwich", label: "Sandwich" },
    { value: "cake", label: "Cake" },
    { value: "pure veg", label: "Pure Veg" },
    { value: "pasta", label: "Pasta" },
    { value: "noodles", label: "Noodles" },
  ];

  const getCategoryLabel = (category) => {
    const categoryMap = {
      salad: "Salad",
      rolls: "Rolls",
      deserts: "Deserts",
      sandwich: "Sandwich",
      cake: "Cake",
      pure_veg: "Pure Veg",
      pasta: "Pasta",
      noodles: "Noodles",
    };
    return categoryMap[category] || category;
  };

  const handleDeleteFood = async (id) => {
    console.log("delete start");

    try {
      const response = await axios.post(backendUrl + "/api/food/delete", {
        id,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        setFoodList(response.data.data);
      }
    } catch (error) {
      console.log("error in delete food", error);
    }
  };

  const filteredFoods =
    selectedCategory === "all"
      ? foodList
      : foodList.filter(
          (food) =>
            food.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
      <Title>All Foods</Title>

      {/* Category Filter Bar */}
      <div className="mt-6 mb-8">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                ${
                  selectedCategory === category.value
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredFoods.map((food, idx) => (
          <div
            key={food._id}
            className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="relative h-48">
              <img
                src={food.image}
                alt={food.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2">
                <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-sm">
                  {getCategoryLabel(food.category)}
                </span>
              </div>
            </div>

            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                {food.name}
              </h3>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {food.discount ? (
                    <>
                      <span className="text-gray-500 dark:text-gray-400 line-through">
                        {(food?.price || 0).toFixed(2)}{" "}
                        <span className="text-sm font-normal">INR</span>
                      </span>
                      <span className="text-green-600 dark:text-green-400 font-bold">
                        {(food?.discount || 0).toFixed(2)}{" "}
                        <span className="text-sm font-normal">INR</span>
                      </span>
                    </>
                  ) : (
                    <span className="text-gray-800 dark:text-white font-bold">
                      ${food.price}
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    className="bg-red-600 text-white px-3 py-2 rounded-md hover:bg-red-700 transition-colors"
                    onClick={() => handleDeleteFood(food._id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodList;
