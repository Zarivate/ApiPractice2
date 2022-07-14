import { useContext } from "react";
import Image from "next/image";
import { Box, Icon, Flex } from "@chakra-ui/react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

const LeftArrow = () => {
  const { scrollPrev } = useContext(VisibilityContext);

  return (
    <Flex justifyContent="center" alignItems="center" marginRight="1">
      <Icon
        as={FaArrowAltCircleLeft}
        // Same as onClick = {() => scrollPrev()}, just that since all this is is a function that calls itself it can be reduced
        onClick={() => scrollPrev()}
        fontSize="2xl"
        cursor="pointer"
      />
    </Flex>
  );
};

const RightArrow = () => {
  const { scrollNext } = useContext(VisibilityContext);

  return (
    <Flex justifyContent="center" alignItems="center" marginRight="1">
      <Icon
        as={FaArrowAltCircleRight}
        // Same as onClick = {() => scrollPrev}, just that since all this is is a function that calls itself it can be reduced
        onClick={() => scrollNext()}
        fontSize="2xl"
        cursor="pointer"
      />
    </Flex>
  );
};

// The images are being passed as "data"
const ImageScrollbar = ({ data }) => (
  <ScrollMenu
    LeftArrow={LeftArrow}
    RightArrow={RightArrow}
    style={{ overflow: "hidden" }}
  >
    {/* The "item" is just an individual image that returns an Image component for each image */}
    {data.map((item) => (
      <Box key={item.id} width="910px" itemID={item.id} overflow="hidden" p="1">
        <Image
          alt="property"
          placeholder="blur"
          // As image loads, shows a blured version of image
          blurDataURL={item.url}
          src={item.url}
          width={1000}
          height={500}
          // Depending on the device size, the size of the image displayed is adjusted
          sizes="(max-width:500px) 100px, (max-width):1023px 400px, 1000px"
        />
      </Box>
    ))}
  </ScrollMenu>
);

export default ImageScrollbar;
