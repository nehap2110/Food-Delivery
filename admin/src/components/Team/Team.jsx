import React from 'react'
import Title from '../../ui/Title'
import { users } from '../../assets'
import Member from './Member'

const Team = () => {
  return (
    <div className='bg-whitep-3 p-4 rounded-xl dark:bg-gray-600 dark:text-gray-300 flex-1 flex-col gap-5 space-y-1' >
        <Title>Team</Title>
        {users.map((user,index)=>(
            <Member key={index} user={user} />
        ))}
    </div>
  )
}

export default Team