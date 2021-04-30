import React, { useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import { GET_WEATHER_QUERY } from '../graphql/Queries'

export default function Dashboard() {
  const [result, setResult] = useState('')
  const [value, setValue] = useState('')
  const [getWeather, { loading, data, error }] = useLazyQuery(
    GET_WEATHER_QUERY,
    {
      variables: { name: value },
    }
  )

  if (error) return <h1>No City found!</h1>
  if (data) {
    console.log(data)
    console.log(loading)
  }

  return (
    <div className="App parent">
      <h1>Search your city</h1>
      <div className="children">
        <input
          type="text"
          placeholder="Enter city name"
          onChange={(event) => setResult(event.target.value)}
        />
        <button
          onClick={() => {
            setValue(result)
            getWeather()
          }}
        >
          Search
        </button>
      </div>
      <div>
        {data && (
          <>
            <p>{data.getCityByName.name}</p>
            <p>
              {Math.floor(data.getCityByName.weather.temperature.actual - 273) +
                ' '}
              deg C
            </p>
            <p>{data.getCityByName.weather.summary.description}</p>
            <p>{data.getCityByName.weather.wind.speed + ' '}mph</p>
          </>
        )}
      </div>
    </div>
  )
}
