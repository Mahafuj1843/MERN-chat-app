import React, { Fragment } from 'react'

const Message = () => {
    return (
        <Fragment>
            {/* <!-- Date --> */}
            <div class="flex justify-center">
                <span class="px-2 py-1 bg-[#aebac1] text-gray-700 rounded-md text-sm">21 April 2023</span>
            </div>
            {/* <!-- Date --> */}
            <div className="chat chat-start">
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <img src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" />
                    </div>
                </div>
                <div className="chat-header" style={{ color: '#aebac1' }}>
                    Obi-Wan Kenobi
                </div>
                <div className="chat-bubble" style={{ backgroundColor: '#aebac1', color: 'black' }}>You were the Chosen One!</div>
                <div className="chat-footer opacity-50" style={{ color: '#aebac1' }}>
                    <time className="text-xs opacity-50">12:45</time>
                </div>
            </div>

            <div className="chat chat-end">
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <img src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" />
                    </div>
                </div>
                <div className="chat-header" style={{ color: '#aebac1' }}>
                    Obi-Wan Kenobi
                </div>
                <div className="chat-bubble" style={{ backgroundColor: '#aebac1', color: 'black' }}>You were the Chosen One!</div>
                <div className="chat-footer opacity-50" style={{ color: '#aebac1' }}>
                    <time className="text-xs opacity-50">12:45</time>
                </div>
            </div>
        </Fragment>
    )
}

export default Message