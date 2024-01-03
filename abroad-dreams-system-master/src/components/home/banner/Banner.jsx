import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import ban2 from '../../../assets/ban2.jpg';
import ban3 from '../../../assets/ban3.jpg';
import ban4 from '../../../assets/ban4.jpg';

const Banner = () => {
    const slideStyles = {
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        minHeight: '600px'
    };

    return (
        <div className="swiper-container">
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                spaceBetween={50}
                slidesPerView={1}
                autoplay={{ delay: 3000 }}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
            >
                <SwiperSlide style={{ ...slideStyles, backgroundImage: `url(${ban2})`, height: '100%' }}>
                    <div className="hero min-h-screen flex items-center justify-center">
                        {/*<div className="text-white text-center">*/}
                        {/*    <h1 className="text-6xl font-bold"><span className="text-[#82b041]">Abroad Dreams</span> is Where Your Journey Begins</h1>*/}
                        {/*    <p className="py-6 text-xl">Start your journey in the world of abroad studies. Browse and Discover with Ease.</p>*/}
                        {/*</div>*/}
                    </div>
                </SwiperSlide>
                <SwiperSlide style={{ ...slideStyles, backgroundImage: `url(${ban3})`, height: '100%' }}>
                    <div className="hero min-h-screen flex items-center justify-center">
                        {/*<div className="text-white text-center">*/}
                        {/*    <h1 className="text-6xl font-bold"><span className="text-[#82b041]">Abroad Dreams</span> is Your Passport to a World of Education</h1>*/}
                        {/*    <p className="py-6 text-xl">Your One-Stop Solution for Managing Profiles Online.</p>*/}
                        {/*</div>*/}
                    </div>
                </SwiperSlide>
                <SwiperSlide style={{ ...slideStyles, backgroundImage: `url(${ban4})`, height: '100%' }}>
                    <div className="hero min-h-screen flex items-center justify-center">
                        {/*<div className="text-white text-center">*/}
                        {/*    <h1 className="text-6xl font-bold"><span className="text-[#82b041]">Abroad Dreams</span> is Your Key to the Career Aim of Tomorrow</h1>*/}
                        {/*    <p className="py-6 text-xl">Experience Modern Application Management.</p>*/}
                        {/*</div>*/}
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Banner;
