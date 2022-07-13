import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Flex, Box, Text, Icon } from "@chakra-ui/react";
import { BsFilter } from "react-icons/bs";
import SearchFilters from "../components/SearchFilters";
import Property from "../components/Property";
import noresult from "../assets/images/noresult.svg";
import { fetchAPI, baseUrl } from "../utils/fetchApi";

const Search = ({ properties }) => {
  // State property to help filter out properties displayed
  const [searchFilters, setSearchFilters] = useState(false);
  // This is called as a hook
  const router = useRouter();

  return (
    <Box>
      <Flex
        cursor="pointer"
        bg="gray.100"
        borderBottom="1px"
        borderColor="gray.200"
        p="2"
        fontWeight="black"
        fontSize="lg"
        justifyContent="center"
        alignItems="center"
        // For when the user clicks on the BsFilter icon there should open up all of the filters, so what this does is toggle the previous filters on and off
        // In otherwords once it's clicked the filters are halted and vice versa
        onClick={() => setSearchFilters((prevFilters) => !prevFilters)}
      >
        <Text>Search Properties</Text>
        <Icon paddingLeft="2" w="7" as={BsFilter} />
      </Flex>
      {/* If we do have searchFilters, then we will render that component, else not. */}
      {searchFilters && <SearchFilters />}
      <Text fontSize="2xl" p="4" fontWeight="bold">
        {/* Because the Router contains the url, we use it to navigate to the correct page. "purpose" is used here because it's a query parameter in the url  */}
        Properties {router.query.purpose}
      </Text>
      <Flex flexWrap="wrap">
        {/* All properties are looped over, for each individual property a Property component is rendered */}
        {properties.map((property) => (
          <Property property={property} key={property.id} />
        ))}
      </Flex>
      {/* If no results are returned, then  */}
      {properties.length === 0 && (
        <Flex
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          marginTop="5"
          marginBottom="5"
        >
          <Image alt="no results" src={noresult} />
          <Text fontSize="2xl" marginTop="3">
            No Results Found
          </Text>
        </Flex>
      )}
    </Box>
  );
};

export default Search;

// The query here is coming from the url and this has to be getServerSideProps for this to work because if it was getStaticProps then the information would be retrieved at build time
// Wouldn't make sense for a search to be returned when the user didn't search anything before getting to the site/page
export async function getServerSideProps({ query }) {
  // The value after the || are the default values
  const purpose = query.purpose || "for-rent";
  const rentFrequency = query.rentFrequency || "yearly";
  const minPrice = query.minPrice || "0";
  const maxPrice = query.maxPrice || "1000000";
  const roomsMin = query.roomsMin || "0";
  const bathsMin = query.bathsMin || "0";
  const sort = query.sort || "price-desc";
  const areaMax = query.areaMax || "35000";
  const locationExternalIDs = query.locationExternalIDs || "5002";
  const categoryExternalID = query.categoryExternalID || "4";

  const data = await fetchAPI(
    `${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}`
  );

  return {
    props: {
      properties: data?.hits,
    },
  };
}
