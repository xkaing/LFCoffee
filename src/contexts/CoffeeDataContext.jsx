import { createContext } from "react";
import { getCoffeeData } from "../serve";
import { useEffect, useState } from "react";
import { addRealName } from "../tools";

export const CoffeeDataContextProvider = ({ children }) => {
  const [coffeeData, setCoffeeData] = useState();

  useEffect(() => {
    getCoffeeData().then((data) => {
      setCoffeeData(addRealName(data));
    });
  }, []);

  return (
    <CoffeeDataContext.Provider value={coffeeData}>
      {children}
    </CoffeeDataContext.Provider>
  );
};

export const CoffeeDataContext = createContext();
