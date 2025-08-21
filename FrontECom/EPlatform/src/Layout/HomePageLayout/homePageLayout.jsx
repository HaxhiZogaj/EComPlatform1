import CategoryTiles from '../CategoryTiles/categoryTiles';
import Footer from '../Footer/footer';
import HeroBanner from '../HeroBanner/heroBanner';
import Navbar from '../Navbar/navbar';
import ProductRow from '../ProductRow/productRow';

function HomePageLayout() {
  return (
    <>
      <Navbar />
      <HeroBanner />
      <CategoryTiles />
      <ProductRow />
      <Footer />
    </>
  );
}

export default HomePageLayout;
