import MainLayout from '@/layout/MainLayout'
import withAuth from '@/utils/withAuth'
import React from 'react'

const Details = () => {
  return (
    <MainLayout>
      <div className='comingSoon'>
        <h3>
        Coming Soon...
        </h3>
      </div>
    </MainLayout>
  )
}

// export default Details
export default withAuth(Details)

