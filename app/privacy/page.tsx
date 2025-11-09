import PrivacyPolicy from "@/components/privacy-policy"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function PrivacyPage() {
  return (
    <div className="bg-white text-black">
      <Header scrolled={false} /> {/* scrolled={false} vì trang tĩnh */}
      <PrivacyPolicy />
      <Footer />
    </div>
  )
}