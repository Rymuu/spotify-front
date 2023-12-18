import Card from "@/components/Card";
import HorizontalCard from "@/components/HorizontalCard";
import Section from "@/components/Section";
import Image from "next/image";

export default function Home() {
  return (
    <div className="px-5 py-5 bg-gradient-to-b from-indigo-950 from-0% to-neutral-900 to-50% rounded-lg">
      <Section label={"Good Morning"} textSize="3xl">
        <div className="grid grid-cols-2 gap-4">
          <HorizontalCard
            label={"Liked Songs"}
            bgColor="white"
            borderRadius="l-lg"
            width="100%"
          />
          <HorizontalCard
            label={"Most Popular Songs"}
            bgColor="white"
            borderRadius="l-lg"
            width="100%"
          />
          <HorizontalCard
            label={"Dernières sorties"}
            bgColor="white"
            borderRadius="l-lg"
            width="100%"
          />
          <HorizontalCard
            label={"Disney"}
            bgColor="white"
            borderRadius="l-lg"
            width="100%"
          />
        </div>
      </Section>
      <Section label={"Derniers albums"}>
        <Card label={"Album"} greyText={"Artist"} />
      </Section>
      <Section label={"Artistes populaires"}>Bloup</Section>
      <Section label={"Albums Pop"}>Bloup</Section>
    </div>
  );
}
