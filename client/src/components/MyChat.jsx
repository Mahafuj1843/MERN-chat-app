import React, { Fragment } from 'react'

const MyChat = () => {
    return (
        <Fragment>
            <div class="flex flex-col flex-none h-full w-[30rem] border-r border-[#272f34]">
                <div class="flex justify-between bg-[#202c33] px-4 py-2">
                    <div class="flex items-center space-x-8 ms-auto">
                        <svg width="27" height="27" class="cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" clip-rule="evenodd" viewBox="0 0 48 48" id="group">
                            <path fill="#aebac1" d="M155.469,79.103C155.009,79.037 154.52,79 154,79C150.17,79 148.031,81.021 147.211,82.028C147.078,82.201 147.007,82.413 147.007,82.632C147.007,82.638 147.007,82.644 147.006,82.649C147,83.019 147,83.509 147,84C147,84.552 147.448,85 148,85L155.172,85C155.059,84.682 155,84.344 155,84C155,84 155,84 155,84C155,82.862 155,81.506 155.004,80.705C155.004,80.135 155.167,79.58 155.469,79.103ZM178,85L158,85C157.735,85 157.48,84.895 157.293,84.707C157.105,84.52 157,84.265 157,84C157,82.865 157,81.515 157.004,80.711C157.004,80.709 157.004,80.707 157.004,80.705C157.004,80.475 157.084,80.253 157.229,80.075C158.47,78.658 162.22,75 168,75C174.542,75 177.827,78.651 178.832,80.028C178.943,80.197 179,80.388 179,80.583L179,84C179,84.265 178.895,84.52 178.707,84.707C178.52,84.895 178.265,85 178,85ZM180.828,85L188,85C188.552,85 189,84.552 189,84L189,82.631C189,82.41 188.927,82.196 188.793,82.021C187.969,81.021 185.829,79 182,79C181.507,79 181.042,79.033 180.604,79.093C180.863,79.546 181,80.06 181,80.585L181,84C181,84.344 180.941,84.682 180.828,85ZM154,67C151.24,67 149,69.24 149,72C149,74.76 151.24,77 154,77C156.76,77 159,74.76 159,72C159,69.24 156.76,67 154,67ZM182,67C179.24,67 177,69.24 177,72C177,74.76 179.24,77 182,77C184.76,77 187,74.76 187,72C187,69.24 184.76,67 182,67ZM168,59C164.137,59 161,62.137 161,66C161,69.863 164.137,73 168,73C171.863,73 175,69.863 175,66C175,62.137 171.863,59 168,59Z" transform="translate(-144 -48)"></path>
                        </svg>
                        <svg viewBox="0 0 24 24" width="24" height="24">
                            <path fill="#aebac1"
                                d="M19.005 3.175H4.674C3.642 3.175 3 3.789 3 4.821V21.02l3.544-3.514h12.461c1.033 0 2.064-1.06 2.064-2.093V4.821c-.001-1.032-1.032-1.646-2.064-1.646zm-4.989 9.869H7.041V11.1h6.975v1.944zm3-4H7.041V7.1h9.975v1.944z">
                            </path>
                        </svg>
                        <svg viewBox="0 0 24 24" width="24" height="24">
                            <path fill="#aebac1"
                                d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z">
                            </path>
                        </svg>
                    </div>
                </div>

                <div class="flex flex-col space-y-2 flex-grow">
                    <div class="flex flex-col space-y-4 flex-grow mt-2">
                        <div class="flex space-x-2 items-center px-4">
                            <div class="flex-grow flex items-center space-x-2 bg-[#202c33] py-1 px-4 rounded-md">
                                <svg viewBox="0 0 24 24" width="24" height="24" class="cursor-pointer">
                                    <path fill="#aebac1"
                                        d="M15.009 13.805h-.636l-.22-.219a5.184 5.184 0 0 0 1.256-3.386 5.207 5.207 0 1 0-5.207 5.208 5.183 5.183 0 0 0 3.385-1.255l.221.22v.635l4.004 3.999 1.194-1.195-3.997-4.007zm-4.808 0a3.605 3.605 0 1 1 0-7.21 3.605 3.605 0 0 1 0 7.21z">
                                    </path>
                                </svg>
                                <input type="search" class="focus:outline-none bg-[#202c33] w-full text-[#aebac1] text-xs"
                                    placeholder="Search or start new chat"/>
                            </div>
                             {/* <svg viewBox="0 0 24 24" width="20" height="20" class="cursor-pointer">
                                <path fill="#aebac1" d="M10 18.1h4v-2h-4v2zm-7-12v2h18v-2H3zm3 7h12v-2H6v2z"></path>
                            </svg>  */}
                        </div>

                        <div class="overflow-x-hidden overflow-y-auto flex-grow scroller h-10">
                            <div
                                class="flex items-center space-x-2 px-4 hover:bg-[#202c33] cursor-pointer transition mr-2">
                                <svg viewBox="0 0 212 212" class="flex-none w-12 h-12">
                                    <path fill="#DFE5E7" class="background"
                                        d="M106.251.5C164.653.5 212 47.846 212 106.25S164.653 212 106.25 212C47.846 212 .5 164.654.5 106.25S47.846.5 106.251.5z">
                                    </path>
                                    <g fill="#FFF">
                                        <path class="primary"
                                            d="M173.561 171.615a62.767 62.767 0 0 0-2.065-2.955 67.7 67.7 0 0 0-2.608-3.299 70.112 70.112 0 0 0-3.184-3.527 71.097 71.097 0 0 0-5.924-5.47 72.458 72.458 0 0 0-10.204-7.026 75.2 75.2 0 0 0-5.98-3.055c-.062-.028-.118-.059-.18-.087-9.792-4.44-22.106-7.529-37.416-7.529s-27.624 3.089-37.416 7.529c-.338.153-.653.318-.985.474a75.37 75.37 0 0 0-6.229 3.298 72.589 72.589 0 0 0-9.15 6.395 71.243 71.243 0 0 0-5.924 5.47 70.064 70.064 0 0 0-3.184 3.527 67.142 67.142 0 0 0-2.609 3.299 63.292 63.292 0 0 0-2.065 2.955 56.33 56.33 0 0 0-1.447 2.324c-.033.056-.073.119-.104.174a47.92 47.92 0 0 0-1.07 1.926c-.559 1.068-.818 1.678-.818 1.678v.398c18.285 17.927 43.322 28.985 70.945 28.985 27.678 0 52.761-11.103 71.055-29.095v-.289s-.619-1.45-1.992-3.778a58.346 58.346 0 0 0-1.446-2.322zM106.002 125.5c2.645 0 5.212-.253 7.68-.737a38.272 38.272 0 0 0 3.624-.896 37.124 37.124 0 0 0 5.12-1.958 36.307 36.307 0 0 0 6.15-3.67 35.923 35.923 0 0 0 9.489-10.48 36.558 36.558 0 0 0 2.422-4.84 37.051 37.051 0 0 0 1.716-5.25c.299-1.208.542-2.443.725-3.701.275-1.887.417-3.827.417-5.811s-.142-3.925-.417-5.811a38.734 38.734 0 0 0-1.215-5.494 36.68 36.68 0 0 0-3.648-8.298 35.923 35.923 0 0 0-9.489-10.48 36.347 36.347 0 0 0-6.15-3.67 37.124 37.124 0 0 0-5.12-1.958 37.67 37.67 0 0 0-3.624-.896 39.875 39.875 0 0 0-7.68-.737c-21.162 0-37.345 16.183-37.345 37.345 0 21.159 16.183 37.342 37.345 37.342z">
                                        </path>
                                    </g>
                                </svg>
                                <div class="flex justify-between border-b py-4 border-[#272f34]">
                                    <div class="flex flex-col w-80">
                                        <span class="text-white">M Dupond</span>
                                        <div class="flex text-[#aebac1] space-x-2">
                                            <svg viewBox="0 0 18 18" width="18" height="18" class="flex-none">
                                                <path fill="#aebac1"
                                                    d="m17.394 5.035-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-.427-.388a.381.381 0 0 0-.578.038l-.451.576a.497.497 0 0 0 .043.645l1.575 1.51a.38.38 0 0 0 .577-.039l7.483-9.602a.436.436 0 0 0-.076-.609zm-4.892 0-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-2.614-2.556a.435.435 0 0 0-.614.007l-.505.516a.435.435 0 0 0 .007.614l3.887 3.8a.38.38 0 0 0 .577-.039l7.483-9.602a.435.435 0 0 0-.075-.609z">
                                                </path>
                                            </svg>
                                            <span class="text-sm truncate">Oui Oui</span>
                                        </div>
                                    </div>
                                    <div class="flex flex-col flex-none text-xs items-end space-y-1 w-20 pr-2">
                                        <span class="text-[#00a884] font-bold"></span>
                                        <div
                                            class="flex bg-[#00a884] justify-center text-xs items-center rounded-full w-5 h-5 text-black">
                                            1
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                class="flex items-center space-x-2 px-4 hover:bg-[#202c33] cursor-pointer transition mr-2">
                                <img src="https://flowbite.com/docs/images/people/profile-picture-1.jpg" class="rounded-full h-12 w-12" alt=""/>
                                    <div class="flex justify-between border-b py-4 border-[#272f34]">
                                        <div class="flex flex-col w-80">
                                            <span class="text-white">M Dupond</span>
                                            <div class="flex text-[#aebac1] space-x-2">
                                                <svg viewBox="0 0 18 18" width="18" height="18" class="flex-none">
                                                    <path fill="#aebac1"
                                                        d="m17.394 5.035-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-.427-.388a.381.381 0 0 0-.578.038l-.451.576a.497.497 0 0 0 .043.645l1.575 1.51a.38.38 0 0 0 .577-.039l7.483-9.602a.436.436 0 0 0-.076-.609zm-4.892 0-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-2.614-2.556a.435.435 0 0 0-.614.007l-.505.516a.435.435 0 0 0 .007.614l3.887 3.8a.38.38 0 0 0 .577-.039l7.483-9.602a.435.435 0 0 0-.075-.609z">
                                                    </path>
                                                </svg>
                                                <span class="text-sm truncate">Oui Oui</span>
                                            </div>
                                        </div>
                                        <div class="flex flex-col flex-none text-xs items-end space-y-1 w-20 pr-2">
                                            <span class="text-[#00a884] font-bold">hier</span>
                                            <div
                                                class="flex bg-[#00a884] justify-center text-xs items-center rounded-full w-5 h-5 text-black">
                                                1
                                            </div>
                                        </div>
                                    </div>
                            </div>
                            <div
                                class="flex items-center space-x-2 px-4 hover:bg-[#202c33] cursor-pointer transition mr-2">
                                <img src="https://flowbite.com/docs/images/people/profile-picture-2.jpg" class="rounded-full h-12 w-12" alt=""/>
                                    <div class="flex justify-between border-b py-4 border-[#272f34]">
                                        <div class="flex flex-col w-80">
                                            <span class="text-white">M Dupond</span>
                                            <div class="flex text-[#aebac1] space-x-2">
                                                <svg viewBox="0 0 18 18" width="18" height="18" class="flex-none">
                                                    <path fill="#aebac1"
                                                        d="m17.394 5.035-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-.427-.388a.381.381 0 0 0-.578.038l-.451.576a.497.497 0 0 0 .043.645l1.575 1.51a.38.38 0 0 0 .577-.039l7.483-9.602a.436.436 0 0 0-.076-.609zm-4.892 0-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-2.614-2.556a.435.435 0 0 0-.614.007l-.505.516a.435.435 0 0 0 .007.614l3.887 3.8a.38.38 0 0 0 .577-.039l7.483-9.602a.435.435 0 0 0-.075-.609z">
                                                    </path>
                                                </svg>
                                                <span class="text-sm truncate">Oui Oui</span>
                                            </div>
                                        </div>
                                        <div class="flex flex-col flex-none text-xs items-end space-y-1 w-20 pr-2">
                                            <span class="text-[#00a884] font-bold">hier</span>
                                            <div
                                                class="flex bg-[#00a884] justify-center text-xs items-center rounded-full w-5 h-5 text-black">
                                                1
                                            </div>
                                        </div>
                                    </div>
                            </div>
                            <div
                                class="flex items-center space-x-2 px-4 hover:bg-[#202c33] cursor-pointer transition mr-2">
                                <svg viewBox="0 0 212 212" class="flex-none w-12 h-12">
                                    <path fill="#DFE5E7" class="background"
                                        d="M106.251.5C164.653.5 212 47.846 212 106.25S164.653 212 106.25 212C47.846 212 .5 164.654.5 106.25S47.846.5 106.251.5z">
                                    </path>
                                    <g fill="#FFF">
                                        <path class="primary"
                                            d="M173.561 171.615a62.767 62.767 0 0 0-2.065-2.955 67.7 67.7 0 0 0-2.608-3.299 70.112 70.112 0 0 0-3.184-3.527 71.097 71.097 0 0 0-5.924-5.47 72.458 72.458 0 0 0-10.204-7.026 75.2 75.2 0 0 0-5.98-3.055c-.062-.028-.118-.059-.18-.087-9.792-4.44-22.106-7.529-37.416-7.529s-27.624 3.089-37.416 7.529c-.338.153-.653.318-.985.474a75.37 75.37 0 0 0-6.229 3.298 72.589 72.589 0 0 0-9.15 6.395 71.243 71.243 0 0 0-5.924 5.47 70.064 70.064 0 0 0-3.184 3.527 67.142 67.142 0 0 0-2.609 3.299 63.292 63.292 0 0 0-2.065 2.955 56.33 56.33 0 0 0-1.447 2.324c-.033.056-.073.119-.104.174a47.92 47.92 0 0 0-1.07 1.926c-.559 1.068-.818 1.678-.818 1.678v.398c18.285 17.927 43.322 28.985 70.945 28.985 27.678 0 52.761-11.103 71.055-29.095v-.289s-.619-1.45-1.992-3.778a58.346 58.346 0 0 0-1.446-2.322zM106.002 125.5c2.645 0 5.212-.253 7.68-.737a38.272 38.272 0 0 0 3.624-.896 37.124 37.124 0 0 0 5.12-1.958 36.307 36.307 0 0 0 6.15-3.67 35.923 35.923 0 0 0 9.489-10.48 36.558 36.558 0 0 0 2.422-4.84 37.051 37.051 0 0 0 1.716-5.25c.299-1.208.542-2.443.725-3.701.275-1.887.417-3.827.417-5.811s-.142-3.925-.417-5.811a38.734 38.734 0 0 0-1.215-5.494 36.68 36.68 0 0 0-3.648-8.298 35.923 35.923 0 0 0-9.489-10.48 36.347 36.347 0 0 0-6.15-3.67 37.124 37.124 0 0 0-5.12-1.958 37.67 37.67 0 0 0-3.624-.896 39.875 39.875 0 0 0-7.68-.737c-21.162 0-37.345 16.183-37.345 37.345 0 21.159 16.183 37.342 37.345 37.342z">
                                        </path>
                                    </g>
                                </svg>
                                <div class="flex justify-between border-b py-4 border-[#272f34]">
                                    <div class="flex flex-col w-80">
                                        <span class="text-white">M KASSI</span>
                                        <div class="flex text-[#aebac1] space-x-2">
                                            <svg viewBox="0 0 18 18" width="18" height="18" class="flex-none">
                                                <path fill="#aebac1"
                                                    d="m17.394 5.035-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-.427-.388a.381.381 0 0 0-.578.038l-.451.576a.497.497 0 0 0 .043.645l1.575 1.51a.38.38 0 0 0 .577-.039l7.483-9.602a.436.436 0 0 0-.076-.609zm-4.892 0-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-2.614-2.556a.435.435 0 0 0-.614.007l-.505.516a.435.435 0 0 0 .007.614l3.887 3.8a.38.38 0 0 0 .577-.039l7.483-9.602a.435.435 0 0 0-.075-.609z">
                                                </path>
                                            </svg>
                                            <span class="text-sm truncate">Oui Oui</span>
                                        </div>
                                    </div>
                                    <div class="flex flex-col flex-none text-xs items-end space-y-1 w-20 pr-2">
                                        <span class="text-[#00a884] font-bold">hier</span>
                                    </div>
                                </div>
                            </div>
                            <div
                                class="flex items-center space-x-2 px-4 hover:bg-[#202c33] cursor-pointer transition mr-2">
                                <img src="https://flowbite.com/docs/images/people/profile-picture-4.jpg" class="rounded-full h-12 w-12" alt=""/>
                                    <div class="flex justify-between border-b py-4 border-[#272f34]">
                                        <div class="flex flex-col w-80">
                                            <span class="text-white">Leonard Krashne</span>
                                            <div class="flex text-[#aebac1] space-x-2">
                                                <svg viewBox="0 0 18 18" width="18" height="18" class="flex-none">
                                                    <path fill="#aebac1"
                                                        d="m17.394 5.035-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-.427-.388a.381.381 0 0 0-.578.038l-.451.576a.497.497 0 0 0 .043.645l1.575 1.51a.38.38 0 0 0 .577-.039l7.483-9.602a.436.436 0 0 0-.076-.609zm-4.892 0-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-2.614-2.556a.435.435 0 0 0-.614.007l-.505.516a.435.435 0 0 0 .007.614l3.887 3.8a.38.38 0 0 0 .577-.039l7.483-9.602a.435.435 0 0 0-.075-.609z">
                                                    </path>
                                                </svg>
                                                <span class="text-sm truncate">Oui Oui</span>
                                            </div>
                                        </div>
                                        <div class="flex flex-col flex-none text-xs items-end space-y-1 w-20 pr-2">
                                            <span class="text-[#00a884] font-bold">Jeudi</span>
                                        </div>
                                    </div>
                            </div>
                            <div
                                class="flex items-center space-x-2 px-4 hover:bg-[#202c33] cursor-pointer transition mr-2">
                                <img src="https://flowbite.com/docs/images/people/profile-picture-3.jpg" class="rounded-full h-12 w-12" alt=""/>
                                    <div class="flex justify-between border-b py-4 border-[#272f34]">
                                        <div class="flex flex-col w-80">
                                            <span class="text-white">Flyod Miles</span>
                                            <div class="flex text-[#aebac1] space-x-2">
                                                <svg viewBox="0 0 18 18" width="18" height="18" class="flex-none">
                                                    <path fill="#aebac1"
                                                        d="m17.394 5.035-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-.427-.388a.381.381 0 0 0-.578.038l-.451.576a.497.497 0 0 0 .043.645l1.575 1.51a.38.38 0 0 0 .577-.039l7.483-9.602a.436.436 0 0 0-.076-.609zm-4.892 0-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-2.614-2.556a.435.435 0 0 0-.614.007l-.505.516a.435.435 0 0 0 .007.614l3.887 3.8a.38.38 0 0 0 .577-.039l7.483-9.602a.435.435 0 0 0-.075-.609z">
                                                    </path>
                                                </svg>
                                                <span class="text-sm truncate">Oui Oui</span>
                                            </div>
                                        </div>
                                        <div class="flex flex-col flex-none text-xs items-end space-y-1 w-20 pr-2">
                                            <span class="text-[#00a884] font-bold">Jeudi</span>
                                        </div>
                                    </div>
                            </div>
                            <div
                                class="flex items-center space-x-2 px-4 hover:bg-[#202c33] cursor-pointer transition mr-2">
                                <img src="https://flowbite.com/docs/images/people/profile-picture-4.jpg" class="rounded-full h-12 w-12" alt=""/>
                                    <div class="flex justify-between border-b py-4 border-[#272f34]">
                                        <div class="flex flex-col w-80">
                                            <span class="text-white">Flyod Miles</span>
                                            <div class="flex text-[#aebac1] space-x-2">
                                                <svg viewBox="0 0 18 18" width="18" height="18" class="flex-none">
                                                    <path fill="#aebac1"
                                                        d="m17.394 5.035-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-.427-.388a.381.381 0 0 0-.578.038l-.451.576a.497.497 0 0 0 .043.645l1.575 1.51a.38.38 0 0 0 .577-.039l7.483-9.602a.436.436 0 0 0-.076-.609zm-4.892 0-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-2.614-2.556a.435.435 0 0 0-.614.007l-.505.516a.435.435 0 0 0 .007.614l3.887 3.8a.38.38 0 0 0 .577-.039l7.483-9.602a.435.435 0 0 0-.075-.609z">
                                                    </path>
                                                </svg>
                                                <span class="text-sm truncate">Oui Oui</span>
                                            </div>
                                        </div>
                                        <div class="flex flex-col flex-none text-xs items-end space-y-1 w-20 pr-2">
                                            <span class="text-[#00a884] font-bold">Jeudi</span>
                                        </div>
                                    </div>
                            </div>
                            <div
                                class="flex items-center space-x-2 px-4 hover:bg-[#202c33] cursor-pointer transition mr-2">
                                <img src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" class="rounded-full h-12 w-12" alt=""/>
                                    <div class="flex justify-between border-b py-4 border-[#272f34]">
                                        <div class="flex flex-col w-80">
                                            <span class="text-white">Flyod Miles</span>
                                            <div class="flex text-[#aebac1] space-x-2">
                                                <svg viewBox="0 0 18 18" width="18" height="18" class="flex-none">
                                                    <path fill="#aebac1"
                                                        d="m17.394 5.035-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-.427-.388a.381.381 0 0 0-.578.038l-.451.576a.497.497 0 0 0 .043.645l1.575 1.51a.38.38 0 0 0 .577-.039l7.483-9.602a.436.436 0 0 0-.076-.609zm-4.892 0-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-2.614-2.556a.435.435 0 0 0-.614.007l-.505.516a.435.435 0 0 0 .007.614l3.887 3.8a.38.38 0 0 0 .577-.039l7.483-9.602a.435.435 0 0 0-.075-.609z">
                                                    </path>
                                                </svg>
                                                <span class="text-sm truncate">Oui Oui</span>
                                            </div>
                                        </div>
                                        <div class="flex flex-col flex-none text-xs items-end space-y-1 w-20 pr-2">
                                            <span class="text-[#00a884] font-bold">Vendredi</span>
                                        </div>
                                    </div>
                            </div>
                            <div
                                class="flex items-center space-x-2 px-4 hover:bg-[#202c33] cursor-pointer transition mr-2">
                                <img src="https://flowbite.com/docs/images/people/profile-picture-4.jpg" class="rounded-full h-12 w-12" alt=""/>
                                    <div class="flex justify-between border-b py-4 border-[#272f34]">
                                        <div class="flex flex-col w-80">
                                            <span class="text-white">Flyod Miles</span>
                                            <div class="flex text-[#aebac1] space-x-2">
                                                <svg viewBox="0 0 18 18" width="18" height="18" class="flex-none">
                                                    <path fill="#aebac1"
                                                        d="m17.394 5.035-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-.427-.388a.381.381 0 0 0-.578.038l-.451.576a.497.497 0 0 0 .043.645l1.575 1.51a.38.38 0 0 0 .577-.039l7.483-9.602a.436.436 0 0 0-.076-.609zm-4.892 0-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-2.614-2.556a.435.435 0 0 0-.614.007l-.505.516a.435.435 0 0 0 .007.614l3.887 3.8a.38.38 0 0 0 .577-.039l7.483-9.602a.435.435 0 0 0-.075-.609z">
                                                    </path>
                                                </svg>
                                                <span class="text-sm truncate">Oui Oui</span>
                                            </div>
                                        </div>
                                        <div class="flex flex-col flex-none text-xs items-end space-y-1 w-20 pr-2">
                                            <span class="text-[#00a884] font-bold">Vendredi</span>
                                        </div>
                                    </div>
                            </div>
                            <div
                                class="flex items-center space-x-2 px-4 hover:bg-[#202c33] cursor-pointer transition mr-2">
                                <svg viewBox="0 0 212 212" class="flex-none w-12 h-12">
                                    <path fill="#DFE5E7" class="background"
                                        d="M106.251.5C164.653.5 212 47.846 212 106.25S164.653 212 106.25 212C47.846 212 .5 164.654.5 106.25S47.846.5 106.251.5z">
                                    </path>
                                    <g fill="#FFF">
                                        <path class="primary"
                                            d="M173.561 171.615a62.767 62.767 0 0 0-2.065-2.955 67.7 67.7 0 0 0-2.608-3.299 70.112 70.112 0 0 0-3.184-3.527 71.097 71.097 0 0 0-5.924-5.47 72.458 72.458 0 0 0-10.204-7.026 75.2 75.2 0 0 0-5.98-3.055c-.062-.028-.118-.059-.18-.087-9.792-4.44-22.106-7.529-37.416-7.529s-27.624 3.089-37.416 7.529c-.338.153-.653.318-.985.474a75.37 75.37 0 0 0-6.229 3.298 72.589 72.589 0 0 0-9.15 6.395 71.243 71.243 0 0 0-5.924 5.47 70.064 70.064 0 0 0-3.184 3.527 67.142 67.142 0 0 0-2.609 3.299 63.292 63.292 0 0 0-2.065 2.955 56.33 56.33 0 0 0-1.447 2.324c-.033.056-.073.119-.104.174a47.92 47.92 0 0 0-1.07 1.926c-.559 1.068-.818 1.678-.818 1.678v.398c18.285 17.927 43.322 28.985 70.945 28.985 27.678 0 52.761-11.103 71.055-29.095v-.289s-.619-1.45-1.992-3.778a58.346 58.346 0 0 0-1.446-2.322zM106.002 125.5c2.645 0 5.212-.253 7.68-.737a38.272 38.272 0 0 0 3.624-.896 37.124 37.124 0 0 0 5.12-1.958 36.307 36.307 0 0 0 6.15-3.67 35.923 35.923 0 0 0 9.489-10.48 36.558 36.558 0 0 0 2.422-4.84 37.051 37.051 0 0 0 1.716-5.25c.299-1.208.542-2.443.725-3.701.275-1.887.417-3.827.417-5.811s-.142-3.925-.417-5.811a38.734 38.734 0 0 0-1.215-5.494 36.68 36.68 0 0 0-3.648-8.298 35.923 35.923 0 0 0-9.489-10.48 36.347 36.347 0 0 0-6.15-3.67 37.124 37.124 0 0 0-5.12-1.958 37.67 37.67 0 0 0-3.624-.896 39.875 39.875 0 0 0-7.68-.737c-21.162 0-37.345 16.183-37.345 37.345 0 21.159 16.183 37.342 37.345 37.342z">
                                        </path>
                                    </g>
                                </svg>
                                <div class="flex justify-between border-b py-4 border-[#272f34]">
                                    <div class="flex flex-col w-80">
                                        <span class="text-white">LETY</span>
                                        <div class="flex text-[#aebac1] space-x-2">
                                            <svg viewBox="0 0 18 18" width="18" height="18" class="flex-none">
                                                <path fill="#aebac1"
                                                    d="m17.394 5.035-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-.427-.388a.381.381 0 0 0-.578.038l-.451.576a.497.497 0 0 0 .043.645l1.575 1.51a.38.38 0 0 0 .577-.039l7.483-9.602a.436.436 0 0 0-.076-.609zm-4.892 0-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-2.614-2.556a.435.435 0 0 0-.614.007l-.505.516a.435.435 0 0 0 .007.614l3.887 3.8a.38.38 0 0 0 .577-.039l7.483-9.602a.435.435 0 0 0-.075-.609z">
                                                </path>
                                            </svg>
                                            <span class="text-sm truncate">Oui Oui</span>
                                        </div>
                                    </div>
                                    <div class="flex flex-col flex-none text-xs items-end space-y-1 w-20 pr-2">
                                        <span class="text-[#00a884] font-bold">Samedi</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default MyChat