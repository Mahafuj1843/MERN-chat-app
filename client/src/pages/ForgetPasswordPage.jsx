import React, { Fragment, Suspense, lazy } from 'react'
import LazyLoader from '../components/masterLayout/LazyLoader'
const ForgetPassword = lazy(()=>import('../components/ForgetPassword'))

const ForgetPasswordPage = () => {
  return (
    <Fragment>
      <Suspense fallback={<LazyLoader />}>
        <ForgetPassword />
      </Suspense>
    </Fragment>
  )
}

export default ForgetPasswordPage