import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import { getToken } from '../helper/sessionHelper';

const NotFoundPage = () => {
    return (
        <Fragment>
            <section className="bg-white h-full">
                <div className="p-8 m-auto max-h-screen max-w-screen-xl">
                    <div className="mx-auto max-w-screen-sm text-center">
                        <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 ">404</h1>
                        <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl">Not Found.</p>
                        <p className="mb-4 text-lg font-light text-gray-500">Sorry, we can't find that page. You'll find lots to explore on the home page. </p>
                        <Link to={getToken()? '/chat' : '/'} className="inline-flex text-white bg-primary-600 hover:bg-[#0f4d50] focus:ring-4 focus:outline-none focus:ring-[#4dd6dd] font-medium rounded-lg text-sm px-5 py-2.5 text-center my-4">Back to Homepage</Link>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}

export default NotFoundPage
