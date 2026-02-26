import { useEffect } from "react"
import Categories from "../components/Categories"
import Discount from "../components/Discount"
import FeaturedProducts from "../components/FeaturedProducts"
import Features from "../components/Features"
import Heading from "../components/Heading"
import NewsArticles from "../components/NewsArticles"
import Products from '../components/Products'
import Reservation from "../components/Reservation"
import ScrollToTop from "../components/ScrollToTop"


const Hero = () => {



  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  return (
    <div className="min-h-screen" >
      <Heading />
      <Categories />
      <Features />
      <Products />
      <Discount />
      <FeaturedProducts />
      <NewsArticles />
      <Reservation />
      <ScrollToTop />
    </div>
  )
}

export default Hero