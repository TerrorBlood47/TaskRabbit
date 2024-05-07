import React from 'react'

const GetTaskerInfoPage = () => {
    return (
        <div className=' w-full h-full overflow-x-hidden overflow-y-scroll '>
            {/* top title part */}
            <div className=' w-full h-[10vh] flex  ml-[17.5vw] items-center'>
                <p className=' text-gray-400 font-bold text-4xl py-2'>TaskSparrow</p>
            </div>

            <hr />

            {/* middle  */}
            <div className=' w-full h-[80vh] flex  mt-5'>
                <div className=' w-[60%] h-full flex justify-end'>
                    <img className=' w-[70%] h-[85%] m-10 right-4'
                        src='https://www.taskrabbit.com/v3/assets/_/_/_/src/becomeATaskerNew/images/hero_landing-fdeb7ef8f1a4361ec76f75d007d79546.jpg'
                        alt=''
                    />
                </div>

                {/* info box */}
                <div className=' ml-5 mt-10 h-[80vh] text-left flex-col justify-around '>
                    <div className=' flex-col'>
                        <p className=' text-5xl font-bold'>Earn money your way</p>

                        <div className=' w-[60%] '>
                            <p className=' text-gray-400 font-bold py-8 mr-5'>See how much you can make tasking on taskSparrow</p>
                        </div>

                        <p className=' font-bold text-lg '>Select your area</p>
                        <div className='  h-[10%] '>area dropdown</div>

                        <p className=' font-bold text-lg mt-5'>Choose a Category</p>
                        <div className='  h-[10%]'>task Category dropdown</div>

                        <div className=' flex justify-start mt-7'>
                            <p className=' font-bold text-3xl'>$46</p>
                            <p className=' text-green-400'>per hour</p>
                        </div>


                    </div>

                    <div className=' text-center w-full mt-10'>
                        <button className=' w-full rounded-2xl h-[5vh] py-2 px-10 bg-green-500 text-white font-bold mt-10'> Get Started</button>

                        <div className=' flex justify-center'>
                            <p>Already have an account ?  </p>
                            <p className=' text-green-400 px-2'>  Sign in </p>
                        </div>
                    </div>

                </div>
            </div>

            {/* mid bokchodi */}

            <div className=' w-full h-[25vh]  my-20 flex justify-center' >

                <div className=' w-[35vw] h-full flex flex-col items-center'>
                    <p className=' text-5xl font-bold'>Flexible work, at your fingertips</p>
                    <p className=' font-extralight text-xl mt-7'>Find local jobs that fit your skills and schedule.</p>
                    <p className=' font-extralight text-xl '>With TaskSparrow, you have the freedom and support to be your own boss.</p>
                </div>



            </div>

            {/* footer */}


        </div>
    )
}

export default GetTaskerInfoPage
