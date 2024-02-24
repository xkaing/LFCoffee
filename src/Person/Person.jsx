import { useContext } from "react";
import { CoffeeDataContext } from "../contexts/CoffeeDataContext.jsx";

const Person = () => {
  const coffeeData = useContext(CoffeeDataContext);
  console.log(coffeeData);
  return (
    <div>
      <h1>Person</h1>
    </div>
  );
};

export default Person;
