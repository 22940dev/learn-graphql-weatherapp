import React, { useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import { GET_WEATHER_QUERY } from '../graphql/Queries'
import { FiMoon, FiSearch, FiSun } from 'react-icons/fi'
import {
  Spinner,
  Input,
  Stack,
  Table,
  Tbody,
  Tr,
  Td,
  TableCaption,
  VStack,
  StackDivider,
  HStack,
  IconButton,
  Heading,
  useColorMode,
  Divider,
} from '@chakra-ui/react'
import Footer from './Footer'

export default function Dashboard() {
  const [result, setResult] = useState('')
  const [value, setValue] = useState('')
  //const [message, setMessage] = useState('')
  const { colorMode, toggleColorMode } = useColorMode()

  const [getWeather, { loading, data, error }] = useLazyQuery(
    GET_WEATHER_QUERY,
    {
      variables: { name: value },
    }
  )

  if (error) return <h1>No City found!</h1>
  if (data) {
    //console.log(data)
    //console.log(error, loading)
  }

  // function Errormessage(data) {
  //   const nullvalue = data.getCityByName
  //   setMessage(nullvalue)
  // }

  return (
    <VStack>
      <IconButton
        aria-label="Toggle Dark Mode"
        icon={colorMode === 'light' ? <FiMoon /> : <FiSun />}
        m="8"
        size="md"
        alignSelf="flex-end"
        onClick={toggleColorMode}
      />
      <Heading mb="8" size="xl">
        Search your city
      </Heading>
      <HStack>
        <Input
          type="text"
          placeholder="Enter city name"
          value={result}
          onChange={(event) => setResult(event.target.value)}
        />
        <IconButton
          aria-label="Search city button"
          icon={<FiSearch />}
          onClick={() => {
            setValue(result)
            getWeather()
            //Errormessage()
          }}
        >
          Search
        </IconButton>
      </HStack>
      <Stack>
        {loading && (
          <>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </>
        )}
      </Stack>
      <Stack>
        <Divider mt="4" mb="4" borderColor="gray.100" />
        {data && (
          <>
            <VStack
              divider={<StackDivider />}
              borderColor="gray.100"
              borderWidth="2px"
              p="4"
              borderRadius="lg"
              w="100%"
              maxW={{ base: '90vw', sm: '80vw', lg: '50vw', xl: '40vw' }}
              alignItems="stretch"
            >
              <Table variant="simple">
                <TableCaption>
                  Weather in {data.getCityByName.name} right now
                </TableCaption>

                <Tbody>
                  <Tr>
                    <Td>Temperature</Td>

                    <Td textAlign="right">
                      {Math.floor(
                        data.getCityByName.weather.temperature.actual - 273
                      ) + ' '}
                      Deg C
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Feels like</Td>
                    <Td textAlign="right">
                      {data.getCityByName.weather.summary.description}
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Wind speed (mph)</Td>

                    <Td textAlign="right">
                      {data.getCityByName.weather.wind.speed + ' '}
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </VStack>
          </>
        )}
      </Stack>
      <Footer />
    </VStack>
  )
}
