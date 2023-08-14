// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
//import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper/modules';

import { useAppDispatch } from '../../../../../redux/hooks';
import styles from "./../../../../ConfigCategoryAndProducts.module.css";
import Slide from './Slide/Slide';

export default function Slider(props) {

    let sliderItems = props[0];
    const dispatch = useAppDispatch();

    let sliderSlides = sliderItems.map(el =>  <SwiperSlide key={el}>
                                                <Slide key={el} el={el} />
                                              </SwiperSlide>);

  return (
    <>
      <Swiper loop={true} navigation={true} modules={[Navigation]} className={styles.slider}>
        {sliderSlides}
      </Swiper>
    </>
  );
}