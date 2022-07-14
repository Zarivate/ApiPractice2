import { Box, Flex, Spacer, Text, Avatar } from "@chakra-ui/react";
import { FaBed, FaBath } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import millify from "millify";

import { baseUrl, fetchAPI } from "../../utils/fetchApi";
import ImageScrollbar from "../../components/ImageScrollbar";

// Because we need a lot of details from the propertyDetails prop, in order to avoid retyping propertyDetails."something" so many times,
// what is needed is instead destructured right at the start instead
const PropertyDetails = ({
  propertyDetails: {
    price,
    rentFrequency,
    rooms,
    title,
    baths,
    area,
    agency,
    isVerified,
    description,
    type,
    purpose,
    furnishingStatus,
    amenities,
    photos,
  },
}) => (
  <Box maxWidth="1000px" margin="auto" p="4">
    {photos && <ImageScrollbar data={photos} />}
  </Box>
);

export default PropertyDetails;

// The params come from the url itself
export async function getServerSideProps({ params: { id } }) {
  const data = await fetchAPI(`${baseUrl}/properties/detail?externalID=${id}`);

  return {
    props: {
      propertyDetails: data,
    },
  };
}
