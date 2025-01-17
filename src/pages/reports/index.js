import MainLayout from '@/layout/MainLayout'
import withAuth from '@/utils/withAuth'
import React from 'react'

const Reports = () => {
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

// export default Reports
export default withAuth(Reports)

