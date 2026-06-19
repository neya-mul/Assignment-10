'use client';

import { motion } from 'framer-motion';
import {
  FaDumbbell,
  FaUserTie,
  FaAppleAlt,
  FaHeartbeat,
} from 'react-icons/fa';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

const features = [
  {
    icon: FaUserTie,
    title: 'Expert Trainers',
    description:
      'Train with certified professionals dedicated to helping you achieve your fitness goals.',
  },
  {
    icon: FaDumbbell,
    title: 'Modern Equipment',
    description:
      'Access top-quality gym equipment designed for strength, cardio, and endurance training.',
  },
  {
    icon: FaAppleAlt,
    title: 'Nutrition Guidance',
    description:
      'Get personalized nutrition plans that complement your workouts and lifestyle.',
  },
  {
    icon: FaHeartbeat,
    title: 'Healthy Lifestyle',
    description:
      'Build sustainable habits that improve your physical and mental well-being.',
  },
  {
    icon: FaDumbbell,
    title: 'Strength Programs',
    description:
      'Specialized programs designed for muscle growth, endurance, and athletic performance.',
  },
  {
    icon: FaHeartbeat,
    title: 'Community Support',
    description:
      'Join a motivating fitness community that keeps you inspired every day.',
  },
];

const WhyChoose = () => {
  return (
    <section className="bg-[#050816] py-24 px-5 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="uppercase tracking-[6px] text-purple-400 text-sm mb-3">
            Why Choose Us
          </p>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            Why Choose{' '}
            <span className="text-purple-500">
              Fitness Cafe
            </span>
            ?
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto mt-5">
            Experience world-class training, personalized guidance,
            and a supportive environment designed to help you achieve
            your fitness goals faster.
          </p>
        </motion.div>

        {/* Swiper */}
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
          className="pb-14"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <SwiperSlide key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.1,
                  }}
                  viewport={{ once: true }}
                  whileHover={{
                    y: -10,
                    scale: 1.03,
                  }}
                  className="
                    h-[300px]
                    bg-white/5
                    backdrop-blur-md
                    border
                    border-purple-500/20
                    rounded-3xl
                    p-8
                    flex
                    flex-col
                    items-center
                    text-center
                    transition-all
                    duration-300
                    hover:border-purple-500
                    hover:shadow-[0_0_25px_rgba(168,85,247,0.25)]
                  "
                >
                  <div className="w-16 h-16 rounded-full bg-purple-600/20 flex items-center justify-center mb-6">
                    <Icon className="text-3xl text-purple-400" />
                  </div>

                  <h3 className="text-xl font-semibold text-white mb-4">
                    {feature.title}
                  </h3>

                  <p className="text-gray-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
};

export default WhyChoose;