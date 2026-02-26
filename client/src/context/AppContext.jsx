import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext(null);

const AppContextProvider = (props) => {
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [category, setCategory] = useState("All");
  const [food_list, setFood_List] = useState([]);
  const [displayFood, setDisplayFood] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [addingStates, setAddingStates] = useState({});
  const [cartOpen, setCartOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const [totalQuantity, setTotalQuantity] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);
  const [token, setToken] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState("Default");

  useEffect(() => {
    loadFoods();
  }, []);

  const loadFoods = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(backendUrl + "/api/food/get-food");
      setFood_List(data.foods);
    } catch (error) {
      console.log("error in fetching food list ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const isUserAvailable = localStorage.getItem("token");
    if (isUserAvailable) {
      setToken(isUserAvailable);
      loadCartData();
    }
  }, [token]);

  const loadCartData = async () => {
    try {
      if (token) {
        const { data } = await axios.get(backendUrl + "/api/cart/getCart", {
          headers: { token },
        });
        setCartItems(data.cartData.items || []);
      }
    } catch (error) {
      console.log("error in loadcart data ", error);
    }
  };

  const getTotalQuantity = () => {
    return (
      cartItems?.reduce((total, item) => total + (item?.quantity || 0), 0) || 0
    );
  };

  const getTotalAmount = () => {
    return (
      cartItems?.reduce((total, item) => {
        if (!item || !item.productId) return total;
        return total + (item.quantity || 0) * (item.productId.discount || 0);
      }, 0) || 0
    );
  };

  const logout = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("userName");
      navigate("/");
      setToken(null);
      setCartItems([]);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const newTotal = getTotalQuantity(cartItems);
    setTotalQuantity(newTotal);
    const TotalPrice = getTotalAmount(cartItems);
    setTotalAmount(TotalPrice);
  }, [cartItems]);

  const addToCart = async (product) => {
    setAddingStates((prev) => ({ ...prev, [product._id]: true }));
    try {
      const response = await axios.post(
        backendUrl + "/api/cart/add",
        { productId: product._id },
        { headers: { token } }
      );

      console.log(response.data);
      setCartItems(response.data.cartData.items || []);
    } catch (error) {
      setShowLogin(true);
    }
    setInterval(() => {
      setAddingStates((prev) => ({ ...prev, [product._id]: false }));
    }, 500);
  };

  const removeFromCart = async (product) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/cart/removeItem",
        { productId: product.productId._id },
        { headers: { token } }
      );
      if (response.data.success) {
        setCartItems(response.data.cartData.items);
      }
    } catch (error) {
      console.log("error in removefromcart");
    }
  };

  const categorise = (newCategory) => {
    setCategory(newCategory);
  };

  const clearCart = async () => {
    const response = await axios.post(
      backendUrl + "/api/cart/delete",
      {},
      { headers: { token } }
    );
    if (response.data.success) {
      setCartItems([]);
    }
  };

  const filterAndSortFood = () => {
    let currentFood = [...food_list]; // Start with a fresh copy of the original food_list

    // Apply category filter
    if (category !== "All") {
      currentFood = currentFood.filter((item) => item.category === category);
    }

    // Apply search filter
    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      currentFood = currentFood.filter(
        (item) =>
          (item.name && item.name.toLowerCase().includes(lowerCaseSearchTerm))
      );
    }

    // Apply sorting
    if (sortType === "Price: Low to High") {
      currentFood.sort((a, b) => (a.discount || 0) - (b.discount || 0));
    } else if (sortType === "Price: High to Low") {
      currentFood.sort((a, b) => (b.discount || 0) - (a.discount || 0));
    }
    // If sortType is "Default", no additional sorting is needed as we started with food_list

    setDisplayFood(currentFood);
  };

  useEffect(() => {
    filterAndSortFood();
  }, [food_list, category, searchTerm, sortType]);

  const value = {
    category,
    setCategory,
    displayFood,
    setDisplayFood,
    categorise,
    addToCart,
    removeFromCart,
    cartItems,
    setCartItems,
    cartOpen,
    setCartOpen,
    addingStates,
    totalQuantity,
    totalAmount,
    showLogin,
    setShowLogin,
    setShowMobileMenu,
    showMobileMenu,
    backendUrl,
    token,
    setToken,
    logout,
    food_list,
    clearCart,
    isLoading,
    searchTerm,
    setSearchTerm,
    sortType,
    setSortType,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
