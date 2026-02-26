import React, { useContext, useState } from "react";
import Title from "../../ui/Title";
import { toast } from "react-toastify";
import { appContext } from "../../context/appContext";

const AddProduct = () => {
  const { backendUrl } = useContext(appContext);
  const [loading, setLoading] = useState(false);

  const [product, setProduct] = useState({
    name: "",
    image: null,
    price: "",
    discount: "",
    category: "Salad",
    description: "",
  });

  const [previewUrl, setPreviewUrl] = useState("");

  const categories = [
    { value: "Salad", label: "Salad" },
    { value: "Rolls", label: "Rolls" },
    { value: "Deserts", label: "Deserts" },
    { value: "Sandwich", label: "Sandwich" },
    { value: "Cake", label: "Cake" },
    { value: "Pure Veg", label: "Pure Veg" },
    { value: "Pasta", label: "Pasta" },
    { value: "Noodles", label: "Noodles" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProduct((prev) => ({
        ...prev,
        image: file,
      }));

      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        setPreviewUrl(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("image", product.image);
    formData.append("price", parseFloat(product.price));
    formData.append("discount", parseFloat(product.discount));
    formData.append("category", product.category);
    formData.append("description", product.description);

    try {
      const response = await fetch(backendUrl + "/api/food/add-food", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Food added successfully");

        setProduct({
          name: "",
          image: null,
          price: "",
          discount: "",
          category: "Salad",
          description: "",
        });
        setPreviewUrl("");
      } else {
        toast.error("Failed to add food: " + data.message);
      }
    } catch (error) {
      console.error("Error adding food:", error);
      alert("An error occurred while adding food.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 w-1/2 rounded-lg p-6 shadow-md">
      <Title>Add New Food Item</Title>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Food Name
          </label>
          <input
            type="text"
            accept="image/*"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Food Image
          </label>
          <div className="mt-1 flex items-center space-x-4">
            <div className="flex-shrink-0">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="h-32 w-32 object-cover rounded-lg"
                />
              ) : (
                <div className="h-32 w-32 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400 dark:text-gray-500">
                    No image
                  </span>
                </div>
              )}
            </div>
            <div className="flex-grow">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-500 dark:text-gray-400
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    dark:file:bg-blue-900 dark:file:text-blue-300
                    hover:file:bg-blue-100 dark:hover:file:bg-blue-800"
                required
              />
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                PNG, JPG, JPEG up to 10MB
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Price
            </label>
            <input
              type="number"
              name="price"
              step={0.01}
              value={product.price}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Discounted Price
            </label>
            <input
              type="number"
              name="discount"
              step={0.01}
              value={product.discount}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Category
          </label>
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          >
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            loading
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {loading ? "Adding..." : "Add Food Item"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
