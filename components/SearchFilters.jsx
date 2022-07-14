import { useEffect, useState } from "react";
import {
  Flex,
  Select,
  Box,
  Text,
  Input,
  Spinner,
  Icon,
  Button,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { MdCancel } from "react-icons/md";
import Image from "next/image";
import { filterData, getFilterValues } from "../utils/filterData";

const SearchFilters = () => {
  // Filters initilized as empty object since at start no filters are assigned
  const [filters, setFilters] = useState(filterData);
  const router = useRouter();

  const searchProperties = (filterValues) => {
    // Gets the actual url
    const path = router.pathname;
    const { query } = router;

    const values = getFilterValues(filterValues);

    // Each one of these values is looped over
    values.forEach((item) => {
      query[item.name] = item.value;
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
