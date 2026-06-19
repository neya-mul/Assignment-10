import Image from "next/image";
import Banner from '../layers/Banner'
import WhyChoose from "@/layers/WhyChoose";
import SuccessStories from "@/layers/Success";
export default function Home() {
  return (
    <div>
      <Banner></Banner>
      <SuccessStories></SuccessStories>
      <WhyChoose></WhyChoose>
    </div>
  );
}
