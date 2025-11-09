import TermsOfService from "@/components/terms-of-service"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function TermsPage() {
  return (
    <div className="bg-white text-black">
      <Header scrolled={false} />
      <TermsOfService />  {/* Sửa từ <TermsPage /> thành <TermsOfService /> */}
      <Footer />
    </div>
  )
}