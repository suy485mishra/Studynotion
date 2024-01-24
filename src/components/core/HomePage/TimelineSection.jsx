import React from 'react'
import Logo1 from '../../../assets/TimeLineLogo/Logo1.svg'
import Logo2 from '../../../assets/TimeLineLogo/Logo2.svg'
import Logo3 from '../../../assets/TimeLineLogo/Logo3.svg'
import Logo4 from '../../../assets/TimeLineLogo/Logo4.svg'
import timelineImage from '../../../assets/Images/TimelineImage.png'

const timeline=[
    {
        Logo:Logo1,
        heading:'Leadership',
        Description:'Fully Committed to the success of company'
    },
    {
        Logo:Logo2,
        heading:'Responsibility',
        Description:'Students will always be our top priority'
    },
    {
        Logo:Logo3,
        heading:'Flexibility',
        Description:'The ability to switch is an important skill'
    },
    {
        Logo:Logo4,
        heading:'Solve the problem',
        Description:'Code your way to the solution'
    },

]





const TimelineSection = () => {
  return (
    <div>
    <div className='flex'>
    <div className='w-[45%] flex flex-col gap-5'>
       {
        timeline.map((element,index)=>{
            return(
                <div className='flex gap-6' key={index}>
                <div className='w-12 h-12 bg-white items-center flex '>
                <img src={element.Logo} alt='Logo' />
                </div>
                <div>
                    <h2 className='font-semibold text-[18px]'>{element.heading}</h2>
                    <p className='text-base'>{element.Description}</p>
                </div>
                </div>
            )
        })
       }

    </div>
    <div>
        <img src={timelineImage} className=' object-cover h-fit'></img>
    <div className=' absolute left-[67%] translate-x-[-50%] translate-y-[-50%] py-7 text-white flex gap-5 bg-caribbeangreen-700 '>
      {/* for each block */}
      <div className=' gap-5 flex items-center border-r border-caribbeangreen-300 px-7'>
      <p className='text-3xl font-bold'>10</p>
      <p className=' text-caribbeangreen-300 text-sm' >YEARS OF EXPERIENCE</p>

      </div>

      <div className='flex gap-5 items-center px-7'>
                <p className='text-3xl font-bold'>250</p>
                    <p className='text-caribbeangreen-300 text-sm'>TYPES OF COURSES</p>
                </div>
    </div>
    
    
    
    
    </div>


    </div>





    </div>
  )
}

export default TimelineSection