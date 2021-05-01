import { Divider, HStack, Link, Text, VStack } from '@chakra-ui/layout'
import React from 'react'
import { FiExternalLink } from 'react-icons/fi'

export default function Footer() {
  return (
    <VStack>
      <Divider m={6} borderColor="gray.100" />
      <HStack>
        <Text>Built using </Text>
        <Link
          color="teal.500"
          href="https://graphql-weather-api.herokuapp.com/"
          isExternal
        >
          Graphql Weather API
        </Link>
        <FiExternalLink />
      </HStack>
      <Text>2021 - Georgey V B</Text>
    </VStack>
  )
}
