import { useState, useEffect } from "react";
// hero images
import hero1 from "../assets/hero1.jpg";
import hero2 from "../assets/hero2.jpg";
import hero3 from "../assets/hero3.jpg";

const heroData = [
  {image: hero1, text: "Discover New Vibes🎧", para: "Stream your favorite tunes on repeat."},
  {image: hero2, text: "Feel Da Heat🔥", para: "Dance to the rhythm non-stop"},
  {image: hero3, text: "Flow with It🎵", para: "Every sound is worth it"}
];

export default function Header() {
  const [activeHeroData, setActiveHeroData] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveHeroData((prev) => (prev + 1) % heroData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-[200px] sm:h-[400px] mt-8 flex items-center justify-start gap-2 sm:gap-4 lg:gap-10 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 rounded-xl overflow-hidden">
      <img
        src={heroData[activeHeroData].image}
        alt="hero"
        className="w-[120px] sm:w-[300px] lg:w-[400px] h-full object-cover rounded-l-lg"
      />
      <div className="flex flex-col">
        <h1 className="text-2xl sm:text-4xl lg:text-8xl font-extrabold leading-tight font-montserrat">
          {heroData[activeHeroData].text}
        </h1>
        <p className="text-sm sm:text-base lg:text-2xl text-gray-600 mt-1 sm:mt-2 lg:mt-4 font-montserrat">
          {heroData[activeHeroData].para}
        </p>
      </div>
    </div>
  );
}