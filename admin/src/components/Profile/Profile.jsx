import React from 'react'
import User from './User'
import Sidebar from '../Sidebar/Sidebar'
import DonutChart from './DonutChart'
import Shortcuts from './Shortcuts'

const Profile = () => {
  return (
    <div className='px-2 py-4 mt-2 bg-gray-200 rounded-lg w-full dark:bg-gray-700 lg:w-60 xl:w-80 flex flex-col
    justify-between gap-4 ' >
      <User />
      <Shortcuts />
      <DonutChart />
    </div>
  )
}

export default Profile