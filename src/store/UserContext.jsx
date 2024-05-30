import { createContext, useState } from "react";

export const UserContext = createContext({
  user: false,
  allProducts: null,
  salesData: null,
  paidData: null,
  addPaidData: () => {},
  addProducts: () => {},
  addUser: () => {},
  removeUser: () => {},
  addSalesData: () => {},
});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(false);
  const [allProducts, setAllProducts] = useState(null);
  const [salesData, setSalesData] = useState(null);
  const [paidData, setPaidData] = useState(null);
  const addUser = () => {
    setUser("User");
  };
  const removeUser = () => {
    setUser(false);
  };
  const addProducts = (products) => {
    setAllProducts(products);
  };

  const addSalesData = (data) => {
    setSalesData(data);
  };
  const addPaidData = (data) => {
    setPaidData(data);
  };

  const ctxValue = {
    user,
    allProducts,
    salesData,
    paidData,
    addSalesData,
    addPaidData,
    addProducts,
    addUser,
    removeUser,
  };
  return (
    <UserContext.Provider value={ctxValue}>{children}</UserContext.Provider>
  );
};
export default UserProvider;
