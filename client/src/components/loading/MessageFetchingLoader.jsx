import React, { Fragment } from 'react'
import Loader from '../../assets/images/Double Ring-0.9s-264px.svg'

const MessageFetchingLoader = () => {
    return (
        <Fragment>
            <div className="flex item-center justify-center w-full h-full py-4 px-5 xl:px-14 bg-black-rgba scroller overflow-x-hidden overflow-y-auto flex-grow">
                <img src={Loader} className='h-32 w-32 my-auto' alt="" srcset="" />
            </div>
        </Fragment>
    )
}

export default MessageFetchingLoader
