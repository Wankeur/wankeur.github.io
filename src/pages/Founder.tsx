import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Founder from "@/components/Founder";

const FounderPage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-20">
        <Founder />
      </div>
      <Footer />
    </div>
  );
};

export default FounderPage;