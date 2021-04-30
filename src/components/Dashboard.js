import React, { useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import { GET_WEATHER_QUERY } from '../graphql/Queries'
import { FiSearch } from 'react-icons/fi'
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
} from '@chakra-ui/react'

export default function Dashboard() {
  const [result, setResult] = useState('')
  const [value, setValue] = useState('')
  //const [message, setMessage] = useState('')
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
      <h1>Search your city</h1>
      <HStack>
        <Input
          type="text"
          placeholder="Enter city name"
          onChange={(event) => setResult(event.target.value)}
        />
        <IconButton
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
      <div>
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

                    <Td isNumeric>
                      {Math.floor(
                        data.getCityByName.weather.temperature.actual - 273
                      ) + ' '}
                      Deg C
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Feels like</Td>
                    <Td>{data.getCityByName.weather.summary.description}</Td>
                  </Tr>
                  <Tr>
                    <Td>Wind speed (mph)</Td>

                    <Td isNumeric>
                      {data.getCityByName.weather.wind.speed + ' '}
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </VStack>
          </>
        )}
      </div>
    </VStack>
  )
}
