import React from "react";
import Alice from "./icons/Alice_NH_Villager_Icon.png";
import Alli from "./icons/Alli_NH_Villager_Icon.png";
import Apple from "./icons/Apple_NH_Villager_Icon.png";
import Axel from "./icons/Axel_NH_Villager_Icon.png";
import Bam from "./icons/Bam_NH_Villager_Icon.png";
import Beau from "./icons/Beau_NH_Villager_Icon.png";
import Bertha from "./icons/Bertha_NH_Villager_Icon.png";
import Blathers from "./icons/Blathers_NH_Character_Icon.png";
import Bluebear from "./icons/Bluebear_NH_Villager_Icon.png";
import Bunnie from "./icons/Bunnie_NH_Villager_Icon.png";
import Celeste from "./icons/Celeste_NH_Character_Icon.png";

const icons = [
  Alice,
  Alli,
  Apple,
  Axel,
  Bam,
  Beau,
  Bertha,
  Blathers,
  Bluebear,
  Bunnie,
  Celeste,
];

export const RandomIcon = () => {
  const randomIcon = icons[Math.floor(Math.random() * icons.length)];
  return <img src={randomIcon} alt="animal crossing character icon" />;
};
