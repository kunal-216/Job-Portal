import React from 'react'
import { Header, LatestJobs, Category, LatestInternships } from '../../components/index'

const Home = () => {
  return (
    <div>
      <Header />
      <Category />
      <LatestJobs />
      <LatestInternships />
    </div>
  )
}

export default Home
