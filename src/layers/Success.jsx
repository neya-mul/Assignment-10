'use client';

import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

const testimonials = [
  {
    name: 'Michael Carter',
    role: 'Lost 18kg in 5 Months',
    image: 'https://i.pravatar.cc/300?img=11',
    review:
      'Fitness Cafe completely transformed my lifestyle. The trainers kept me motivated and the workout plans delivered incredible results.',
  },
  {
    name: 'Sarah Wilson',
    role: 'Muscle Gain Journey',
    image: 'https://i.pravatar.cc/300?img=32',
    review:
      'I gained confidence and strength faster than I imagined. The coaching and support system are simply amazing.',
  },
  {
    name: 'David Johnson',
    role: 'Body Transformation',
    image: 'https://i.pravatar.cc/300?img=15',
    review:
      'The personalized workout and nutrition plans helped me achieve my dream physique while staying healthy.',
  },
  {
    name: 'Emily Brown',
    role: 'Fitness Enthusiast',
    image: 'https://i.pravatar.cc/300?img=45',
    review:
      'The atmosphere, trainers, and community make Fitness Cafe the best place to stay committed to fitness.',
  },
];

const SuccessStories = () => {
  return (
    <section className="bg-[#050816] py-24 px-5">
      <div className="max-w-7xl mx-auto">
        
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="uppercase tracking-[6px] text-purple-400 text-sm mb-3">
            Success Stories
          </p>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            Real Results From Our
            <span className="text-purple-500"> Members</span>
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto mt-5">
            Discover how Fitness Cafe has helped thousands of people
            transform their lives and achieve their fitness goals.
          </p>
        </motion.div>

        {/* Swiper */}
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1280: {
              slidesPerView: 3,
            },
          }}
          className="pb-14"
        >
          {testimonials.map((person, index) => (
            <SwiperSlide key={index}>
              <motion.div
                whileHover={{
                  y: -10,
                  scale: 1.02,
                }}
                className="
                  bg-white/5
                  border border-purple-500/20
                  backdrop-blur-md
                  rounded-3xl
                  p-8
                  h-full
                  hover:border-purple-500
                  hover:shadow-[0_0_25px_rgba(168,85,247,0.25)]
                  transition-all
                "
              >
                {/* Stars */}
                <div className="flex gap-1 mb-5 text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>

                {/* Review */}
                <p className="text-gray-300 leading-relaxed mb-8 line-clamp-3">
                  "{person.review}"
                </p>

                {/* User */}
                <div className="flex items-center gap-4">
                  <img
                    src={person.image}
                    alt={person.name}
                    className="w-14 h-14 rounded-full border-2 border-purple-500 object-cover"
                  />

                  <div>
                    <h4 className="text-white font-semibold">
                      {person.name}
                    </h4>

                    <p className="text-purple-400 text-sm">
                      {person.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default SuccessStories;