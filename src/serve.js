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

export const getTrophyData = async () => {
  let trophyData;
  try {
    const response = await axios.get("/data.json");
    trophyData = response.data;
  } catch (error) {
    console.error("Error fetching coffee data:", error);
    trophyData = []
  }
  return trophyData;
};