import { useState } from "react";
import { Flex, Select, Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { filterData, getFilterValues } from "../utils/filterData";

const SearchFilters = () => {
  // Filters initilized as empty object since at start no filters are assigned
  const [filters] = useState(filterData);
  const router = useRouter();

  const searchProperties = (filterValues) => {
    // Gets the actual url
    const path = router.pathname;
    const { query } = router;

    const values = getFilterValues(filterValues);

    // Each one of these values is looped over
    values.forEach((item) => {
      // This is to fix bug where after selecting more than 1 filter option, the previous one is cleared.
      // If there is a specific item that the user wants to add to their chosen filters and if there is a specific value in what is trying to be searched/filtered
      if (item.value && filterValues?.[item.name]) {
        // Only add the ones to the query if there is a value for it
        query[item.name] = item.value;
      }
    });

    router.push({ pathname: path, query });
  };

  return (
    <Flex bg="gray.100" p="4" justifyContent="center" flexWrap="wrap">
      {/* Here the filters are looped through and for each filter a speicific handler is shown */}
      {filters.map((filter) => (
        <Box key={filter.queryName}>
          <Select
            placeholder={filter.placeholder}
            w="fit-content"
            p="2"
            // For each filter, we'll only focus on the one specific that the user is currently on
            onChange={(e) =>
              searchProperties({ [filter.queryName]: e.target.value })
            }
          >
            {/* Here, for each filter, each individual option within that filter is being rendered. IE: the drop down menu options on the filters*/}
            {filter?.items?.map((item) => (
              <option value={item.value} key={item.value}>
                {item.name}
              </option>
            ))}
          </Select>
        </Box>
      ))}
    </Flex>
  );
};

export default SearchFilters;
