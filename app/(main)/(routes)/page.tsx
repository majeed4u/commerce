import HeroSlider from '@/app/(main)/components/hero-slider';
import ProductData from '../components/product-data';
export default function Home() {
  return (
    <div>
      <HeroSlider />
      <div className='mx-auto max-w-screen-2xl'>
        <h1>Hello</h1>
        <ProductData />
      </div>
    </div>
  );
}
