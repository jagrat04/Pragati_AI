"use client";

import MemberCard from "./components/card";

import { useLanguage } from "@/context/LanguageContext";

export default function Team() {
  const { translations } = useLanguage();

  return (
    <section className="pb-10 pt-20 bg-white lg:pb-20 lg:pt-[120px]">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mb-[60px] max-w-[510px] text-center">
              <span className="mb-2 block text-lg font-semibold text-black">
                {translations.team1}
              </span>
              <h2 className="mb-3 text-3xl font-bold leading-[1.2] text-black text-black sm:text-4xl md:text-[40px]">
                {translations.team2}
              </h2>
              <p className="text-base text-body-color text-black">
                {translations.team_info}
              </p>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4">
        <div className="-mx-4 flex flex-wrap justify-center">
          <MemberCard
            name="Aakash Raj Jindal"
            profession="Web Developer"
            imageSrc = "/Aakash.jpg"
          />
          <MemberCard
            name="Jagrat Singh Chandel"
            profession="Web Developer"
            imageSrc = "/Jagrat.jpg"
          />
          <MemberCard
            name="Karan Singh"
            profession="Web Developer"
            imageSrc = "/Karan.jpg"
          />
          <MemberCard
            name="Rudra Pratap Jha"
            profession="Web Developer"
            imageSrc = "/Rudra.jpg"
          />
        </div></div>
        
      </div>
    </section>
  );
};
