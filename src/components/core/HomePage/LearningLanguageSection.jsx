import React from 'react'
import HighlightText from './HighlightText'
import CTAButton from '../HomePage/Button'
//importing images cards
import know_your_progress from '../../../assets/Images/Know_your_progress.png'
import compare_with_others from '../../../assets/Images/Compare_with_others.png'
import plan_your_lesson from '../../../assets/Images/Plan_your_lessons.png'



const LearningLanguageSection = () => {
  return (
    <div className='mt-20 mb-32'>
        
    <div className='flex flex-col gap-5  items-center'>
    <div className='text-4xl font-semibold text-center'>
       Your Swiss Knife for
       <HighlightText text={' learning any language'}/>
    </div>
    <div className=' w-[70%] font-inter text-base text-center text-richblack-600 mx-auto '>
    Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
    </div>


    
    {/* Cards */}
    <div className='flex items-center justify-cente mt-5'>
    {/* If we use object-fit: contain; the image keeps its aspect ratio, but is resized to fit within the given dimension: */}
    <img src={know_your_progress} className='-mr-32 object-contain'/>
      <img src={compare_with_others} className='object-contain' />
      <img src={plan_your_lesson} className='-ml-36 object-contain' />
    </div>



    <div className='w-fit'>
    <CTAButton active={true} linkto={'/signup'}>
    <div>
        Learn More
    </div>

    </CTAButton>

    </div>
      





    </div>
    </div>
  )
}

export default LearningLanguageSection