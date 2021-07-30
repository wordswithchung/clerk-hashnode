import { IslandProfile } from "../types";

export const getIslandProfile = (user: any): IslandProfile => {
  if (!user) {
    return {
      id: "",
      userName: "",
      islandName: "",
      dreamAddress: "",
      villagers: [],
      url: "",
    };
  }
  return {
    id: user.id || "",
    userName: user.userName || "",
    islandName: user.islandName || "",
    dreamAddress: user.dreamAddress || "",
    villagers: user.villagers || [],
    url: user.url || "",
  };
};
