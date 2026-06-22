import Image from "next/image";
import Banner from '../layers/Banner'
import WhyChoose from "@/layers/WhyChoose";
import SuccessStories from "@/layers/Success";
import FeatureClasses from "@/layers/FeatureClasses";
export default function Home() {
  return (
    <div>
      <Banner></Banner>
      <FeatureClasses></FeatureClasses>
      <SuccessStories></SuccessStories>
      <WhyChoose></WhyChoose>
    </div>
  );
}
