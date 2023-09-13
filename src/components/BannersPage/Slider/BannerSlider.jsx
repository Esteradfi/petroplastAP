// Import Swiper React components
import {Swiper, SwiperSlide} from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
//import 'swiper/css/navigation';

// import required modules
import {Navigation, Pagination} from 'swiper/modules';

import {useAppDispatch} from "./../../../redux/hooks";
import styles from "./../../ConfigCategoryAndProducts.module.css";
import Slide from './Slide/Slide';

export default function BannerSlider(props) {

    let sliderItems = props[0];

    let sliderSlides = sliderItems.map(el => <SwiperSlide key={el._id}>
        <Slide key={el._id} el={el}/>
    </SwiperSlide>);

    return (
        <>
            <Swiper loop={true} navigation={true} modules={[Navigation, Pagination]} pagination={{ clickable: true }} className={styles.slider}>
                {sliderSlides}
            </Swiper>
        </>
    );
}