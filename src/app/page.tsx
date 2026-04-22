import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeatureSection from "@/components/FeatureSection";
import VideoFeature from "@/components/VideoFeature";
import Showcase from "@/components/Showcase";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      
      <FeatureSection 
        id="camera"
        tag="ZEISS Optics"
        title="Master the Light."
        description="Equipped with the revolutionary ZEISS APO floating telephoto lens, ensuring breathtaking clarity and professional-grade portraits day or night."
        imageSrc="/fitur1.png"
        imageAlt="vivo X300 Pro Master the Light"
        imageStyle={{ objectPosition: "center top", transform: "scale(1.15)", transformOrigin: "top center" }}
      />

      <FeatureSection 
        id="design"
        tag="Design"
        title="Elegance in Every Curve."
        description="A masterpiece of craftsmanship. The ultra-sleek metallic frame combined with a premium frosted glass back creates a perfect balance of aesthetics and ergonomics."
        imageSrc="/fitur2.jpg"
        imageAlt="vivo X300 Pro Elegance"
        reverse={true}
        imageStyle={{ objectPosition: "center bottom" }}
      />

      <VideoFeature />

      <Showcase />

      <Footer />
    </main>
  );
}
