import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Flex, IconButton } from "@chakra-ui/react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import * as React from "react";
import Image from "next/image";

interface ICarouselProps {
  images: Array<{ src: string; alt: string }>;
}

export const slideVariants: Variants = {
  enter: (i) => ({
    transform: i > 0 ? "translateX(100%)" : `translateX(-100%)`,
    opacity: 0,
  }),
  center: {
    transform: "translateX(0%)",
    opacity: 1,
  },
  leave: (i) => ({
    transform: i > 0 ? "translateX(-100%)" : `translateX(100%)`,
    opacity: 0,
  }),
};

const Carousel: React.FunctionComponent<ICarouselProps> = ({ images }) => {
  const [[currentSlide, direction], setCurrentSlide] = React.useState([1, 0]);
  const [carouselActive, setCarouselActive] = React.useState(true);
  const prevSlide = () => {
    setCurrentSlide((prev) => {
      if (prev[0] !== 1) {
        return [prev[0] - 1, -1];
      }
      return [images.length, -1];
    });
  };
  const nextSlide = React.useCallback(() => {
    setCurrentSlide((prev) => {
      if (prev[0] !== images.length) {
        return [prev[0] + 1, 1];
      }
      return [1, 1];
    });
  }, [images.length]);
  React.useEffect(() => {
    if (!carouselActive) {
      return;
    }
    const loop = setInterval(() => nextSlide(), 5000);
    return () => clearInterval(loop);
  }, [nextSlide, carouselActive]);

  return (
    <Box
      w="100%"
      h="100%"
      position="relative"
      onMouseEnter={() => setCarouselActive(false)}
    >
      <Box w="100%" h="100%" overflow="hidden">
        <AnimatePresence custom={direction} exitBeforeEnter initial={false}>
          {images.map((i, index) => {
            if (currentSlide === index + 1)
              return (
                <motion.div
                  key={i.src}
                  variants={slideVariants}
                  custom={direction}
                  initial="enter"
                  animate="center"
                  exit="leave"
                  transition={{ duration: 0.3 }}
                  style={{ width: "100%", height: "100%" }}
                >
                  <Image
                    alt={i.alt}
                    src={i.src}
                    width={1080}
                    height={607}
                    loading="eager"
                  />
                </motion.div>
              );
          })}
        </AnimatePresence>
      </Box>
      <IconButton
        aria-label="Previous Slide"
        icon={<ChevronLeftIcon color="white" fontSize="2rem" />}
        position="absolute"
        top="50%"
        left="0"
        transform="translate(-50%,-50%)"
        borderRadius="50%"
        bgColor="primary"
        onClick={prevSlide}
      />
      <IconButton
        aria-label="Next Slide"
        icon={<ChevronRightIcon color="white" fontSize="2rem" />}
        position="absolute"
        top="50%"
        right="0"
        transform="translate(50%,-50%)"
        borderRadius="50%"
        bgColor="primary"
        onClick={nextSlide}
      />
      <Flex
        position="absolute"
        bottom="-30px"
        left="50%"
        transform="translateX(-50%)"
        style={{ gap: "20px" }}
      >
        {images.map((i, index) => (
          <Box
            key={i.src}
            border="1px solid black"
            padding="0px"
            w="10px"
            h="10px"
            borderRadius="50%"
            cursor="pointer"
            bgColor={index === currentSlide - 1 ? "primary" : "transparent"}
            _hover={{ borderWidth: "2px" }}
            onClick={() =>
              setCurrentSlide((prev) => {
                if (index === prev[0] - 1) {
                  return [index + 1, 0];
                }
                if (index > prev[0] - 1) {
                  return [index + 1, 1];
                }
                return [index + 1, -1];
              })
            }
          ></Box>
        ))}
      </Flex>
    </Box>
  );
};

export default Carousel;
