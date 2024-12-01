/* eslint-
 react/prop-types */
import { ReactLenis } from "lenis/dist/lenis-react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { SiSpacex } from "react-icons/si";
import { FiArrowRight, FiMapPin } from "react-icons/fi";
import { useRef } from "react";
import { Link } from "react-router-dom";
import mainImg from "../public/grass.jpg";
import image1 from "../public/scene.jpg";
import image2 from "../public/leaf.jpg";
import image3 from "../public/green.jpg";
import image4 from "../public/tractor.jpg";
import image5 from "../public/land.jpg";

export const SmoothScrollHero = () => {
  return (
    <div className="bg-zinc-950">
      <ReactLenis
        root
        options={{
          lerp: 0.05,
        }}
      >
        <Nav />
        <Hero />
        <Schedule />
      </ReactLenis>
    </div>
  );
};

const Nav = () => {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-3 text-white ">
      <Link to="/LoginSignupForm">
        {" "}
        <SiSpacex className="text-3xl mix-blend-difference" />
      </Link>
      <button
        onClick={() => {
          document.getElementById("launch-schedule")?.scrollIntoView({
            behavior: "smooth",
          });
        }}
        className="flex items-center gap-1  text-xs text-zinc-400"
      >
        LAUNCH SCHEDULE <FiArrowRight />
      </button>
    </nav>
  );
};

const SECTION_HEIGHT = 1500;

const Hero = () => {
  return (
    <div
      style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
      className="relative w-full"
    >
      <CenterImage />
      <ParallaxImages />
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b from-zinc-950/0 to-zinc-950" />
    </div>
  );
};

const CenterImage = () => {
  const { scrollY } = useScroll();

  const clip1 = useTransform(scrollY, [0, 1500], [25, 0]);
  const clip2 = useTransform(scrollY, [0, 1500], [75, 100]);

  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}%)`;

  const backgroundSize = useTransform(
    scrollY,
    [0, SECTION_HEIGHT + 500],
    ["170%", "100%"]
  );
  const opacity = useTransform(
    scrollY,
    [SECTION_HEIGHT, SECTION_HEIGHT + 500],
    [1, 0]
  );

  return (
    <>
      <motion.div
        className="sticky top-0 h-screen w-full"
        style={{
          clipPath,
          backgroundSize,
          opacity,
          backgroundImage: `url(${mainImg})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <motion.div
        className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-8xl font-bold"
        style={{ opacity }}
      >
        KrishiSeva
      </motion.div>
    </>
  );
};

const ParallaxImages = () => {
  return (
    <div className="mx-auto max-w-5xl px-4 pt-[200px]">
      <ParallaxImg
        src={image5}
        alt="An example of a space launch"
        start={-200}
        end={200}
        className="w-1/3"
      />
      <ParallaxImg
        src={image4}
        alt="An example of a space launch"
        start={200}
        end={-250}
        className="mx-auto w-2/3"
      />
      <ParallaxImg
        src={image3}
        alt="Orbiting satellite"
        start={-200}
        end={200}
        className="ml-auto w-1/3"
      />
      <ParallaxImg
        src={image1}
        alt="Orbiting satellite"
        start={0}
        end={-500}
        className="ml-24 w-5/12"
      />
    </div>
  );
};

const ParallaxImg = ({ className, alt, src, start, end }) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${start}px end`, `end ${end * -1}px`],
  });

  const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.85]);

  const y = useTransform(scrollYProgress, [0, 1], [start, end]);
  const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;

  return (
    <motion.img
      src={src}
      alt={alt}
      className={className}
      ref={ref}
      style={{ transform, opacity }}
    />
  );
};

const Schedule = () => {
  return (
    <>
      <section
        id="launch-schedule"
        className="mx-auto max-w-5xl px-4 py-48 text-white"
      >
        <motion.h1
          initial={{ y: 48, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ ease: "easeInOut", duration: 0.75 }}
          className="mb-20 text-4xl font-black uppercase text-zinc-50"
        >
          What KrishiSeva can do for you
        </motion.h1>
        <ScheduleItem
          title="  - Get personalized crop recommendations and soil health insights based on location, soil tests, and weather patterns.  
"
        />
        <ScheduleItem title="Predict crop yields and monitor growth using AI-powered analytics and satellite imagery for better planning and decision-making" />
        <ScheduleItem title="Our friendly AI chatbot has answers for all your travel queries — from local tips to hidden gems!" />
        <ScheduleItem
          title="Access tailored farming calendars, crop rotation plans, irrigation schedules, and pest control strategies to optimize productivity.  
"
        />
        <ScheduleItem title="Secure micro-loans with ease through AI-driven credit scoring and connect with financial services to fund your farming needs.  " />
        <ScheduleItem title="Predict crop yields and monitor growth using AI-powered analytics and satellite imagery for better planning and decision-making" />
        <Link to="/LoginSignupForm">
          <div className="flex justify-center items-center h-screen">
            <button className="bg-gradient-to-r from-green-600 via-yellow-500 to-orange-400 text-white font-bold py-4 px-6 rounded-xl shadow-xl transform -translate-y-80 transition-all duration-300 text-lg">
              Explore Agriculture
            </button>
          </div>
        </Link>
      </section>
    </>
  );
};

const ScheduleItem = ({ title, date, location }) => {
  return (
    <motion.div
      initial={{ y: 48, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.75 }}
      className="mb-9 flex items-center justify-between border-b border-zinc-800 px-3 pb-9"
    >
      <div>
        <p className="mb-1.5 text-xl text-zinc-50">{title}</p>
        <p className="text-sm uppercase text-zinc-50">{date}</p>
      </div>
      <div className="flex items-center gap-1.5 text-end text-sm uppercase text-zinc-50">
        <p>{location}</p>
        <FiMapPin />
      </div>
    </motion.div>
  );
};
