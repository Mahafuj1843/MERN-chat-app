import React, { Fragment, Suspense, lazy } from 'react'
import LazyLoader from '../components/masterLayout/LazyLoader'
const ResetPassword = lazy(()=>import('../components/ResetPassword'))

const ResetPasswordPage = () => {
  return (
    <Fragment>
      <Suspense fallback={<LazyLoader />}>
        <ResetPassword />
      </Suspense>
    </Fragment>
  )
}

export default ResetPasswordPage