import axios from "axios";

export const getCoffeeData = async () => {
  let coffeeData;
  try {
    const response = await axios.get("/coffee.json");
    coffeeData = response.data;
  } catch (error) {
    console.error("Error fetching coffee data:", error);
    coffeeData = []
  }
  return coffeeData;
};