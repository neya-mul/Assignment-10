import Image from "next/image";
import Link from "next/link";
import boy from "../../public/boy.png";
// import bg from '../../public/bg-effect.png'

const Banner = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#050816]">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#6D28D9_0%,#050816_60%)] opacity-30" />

      {/* Purple Effects */}
      <div className="absolute inset-0 bg-[url('/effects.png')] bg-center bg-cover bg-no-repeat opacity-60" />

      <div className="container mx-auto px-6 lg:px-12  min-h-screen flex flex-col lg:flex-row items-center">
        {/* Content */}
        <div className="relative z-20 max-w-xl">
          <p className="uppercase tracking-[6px] text-purple-400 mb-4 text-sm font-medium">
            FITNESS CAFE
          </p>

          <h1 className="font-extrabold text-white leading-[0.95]">
            <span className="block text-4xl md:text-5xl lg:text-6xl">
              BUILT TODAY.
            </span>

            <span className="block text-4xl md:text-5xl lg:text-6xl">
              UNSTOPPABLE
            </span>

            <span className="block text-4xl md:text-5xl lg:text-6xl text-purple-500">
              TOMORROW.
            </span>
          </h1>

          <p className="mt-6 text-gray-400 text-base md:text-lg max-w-md">
            Transform your body, boost your confidence, and unlock your
            full potential with expert coaching and customized workout
            plans.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link
              href="/join"
              className="px-6 py-3 rounded-full bg-purple-600 hover:bg-purple-700 transition text-white font-semibold text-center"
            >
              Start Your Journey
            </Link>

            <Link
              href="/programs"
              className="px-6 py-3 rounded-full border border-purple-500 text-white hover:bg-purple-500/10 transition text-center"
            >
              Explore Programs
            </Link>
          </div>

          <div className="flex gap-8 mt-10">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-purple-400">
                50K+
              </h3>
              <p className="text-sm text-gray-400">Transformations</p>
            </div>

            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-purple-400">
                250+
              </h3>
              <p className="text-sm text-gray-400">Coaches</p>
            </div>

            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-purple-400">
                98%
              </h3>
              <p className="text-sm text-gray-400">Success Rate</p>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div>
          <Image
            src={boy}
            alt="Fitness Cafe"
            priority
            className="
              absolute
              bottom-0
              right-[-80px]
              xl:right-[-40px]
              w-[650px]
              xl:w-[850px]
              h-auto
              z-10
              pointer-events-none
              select-none
            "
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;