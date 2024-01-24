import { FaArrowRight } from "react-icons/fa";
import CTAButton from  '../components/core/HomePage/Button'
import React from "react"
import { Link } from "react-router-dom";
import HighlightText from "../components/core/HomePage/HighlightText";
import Banner from '../assets/Images/banner.mp4'
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import TimelineSection from "../components/core/HomePage/TimelineSection";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";
const Home = () => {
  return (
    <div>
      {/* Section-1 */}
      <div className="relative mx-auto flex flex-col w-11/12 items-center text-white justify-between
       max-w-maxContent">
        <Link to={"/signup"}>
          <div className="group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200
          transition-all duration-200 hover:scale-75 w-fit">{/*for rounded external div*/}
            <div className="flex flex-row items-center rounded-full px-10 py-[5px]
           transition-all duration-200 hover:scale-75 w-fit">{/*content k loye div*/}
              <p>Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>

        <div className=" text-center text-4xl font-semibold mt-7">
            Empower Your Future with <HighlightText text={'Coding Skills'}/>
        </div>

        <div className=" mt-4 w-[90%] text-center text-lg font-bold text-richblack-400">
                   With our online coding courses,you can learn at your own pace, from anywhere in the world,
                    and get access to a wealth of resources, including
                   hands-on projects, quizzes, and personalised feedback from instructors.
        </div>

        <div className=" flex flex-row gap-7 mt-8">
       <CTAButton active={true} linkto={'/signup'}>   {/*// AGAR ACTIVE TRur h to yellow, else false and we made a custom button here */}
              Learn More
        </CTAButton>
        <CTAButton active={false} linkto={'/login'}>
              Book A Demo
        </CTAButton>

        </div>

        <div className="shadow-blue-200 px mt-12 mx-12 ">
                <video muted loop autoPlay
                >
                <source src={Banner} type='video/mp4' />



                </video>
        </div>

        {/* section 1 part 1 i.e. code sec1 */}
        <div>
        <CodeBlocks 
                position={"lg:flex-row"}
                heading={
                    <div className='text-4xl font-semibold'>
                        Unlock Your
                        <HighlightText text={"coding potential"}/>
                        with our online courses
                    </div>
                }
                subheading = {
                    "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                }
                ctabtn1={
                    {
                        btnText: "Try it Yourself",
                        linkto: "/signup",
                        active: true,
                    }
                }
                ctabtn2={
                    {
                        btnText: "Learn More",
                        linkto: "/login",
                        active: false,
                    }
                }

                codeblock={`<<!DOCTYPE html>\n<html>\nhead><title>Example</title><linkrel="stylesheet"href="styles.css">\n/head>\n`}
                codeColor={"text-yellow-25"}
            />
        </div>

 {/* Code Section 2 */}
 <div>
            <CodeBlocks 
                position={"lg:flex-row-reverse"}
                heading={
                    <div className='text-4xl font-semibold'>
                        Start
                        <HighlightText text={"coding in seconds"}/>
                        
                    </div>
                }
                subheading = {
                    "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
                }
                ctabtn1={
                    {
                        btnText: "Continue Lesson",
                        linkto: "/signup",
                        active: true,
                    }
                }
                ctabtn2={
                    {
                        btnText: "Learn More",
                        linkto: "/login",
                        active: false,
                    }
                }

                codeblock={`<<!DOCTYPE html>\n<html>\nhead><title>Example</title><linkrel="stylesheet"href="styles.css">\n/head>\n`}
                codeColor={"text-yellow-25"}
            />
        </div>

      </div>

      {/* Section-2(white background one) */}
      <div className="bg-pure-greys-5 text-richblack-700">
        <div className="homepage_bg h-[333px]">
            <div className="w-11/12 max-w-maxContent flex flex-col justify-between items-center mx-auto gap-5  ">
             <div className="h-[150px]"></div>
               <div className="flex gap-7 text-white">
               <CTAButton active={true} linkto={'/signup'}>
               <div className="flex items-center gap-3">
                      Explore Full Catalog
                      <FaArrowRight/>
               </div>

               </CTAButton>
               <CTAButton active={false} linkto={'/signup'}>
                Learn More
               </CTAButton>
  

               </div>


            </div>
        </div>


        <div className="w-11/12 max-w-maxContent flex flex-col justify-between items-center mx-auto gap-7">
        <div className="flex gap-5 mb-10 mt-[95px]">
            <div className="text-4xl font-semibold w-[45%]">
                Get the Skills you need for a 
                <HighlightText text={'Job that is in Demand'}/>
            </div>
            <div className="flex flex-col gap-10 w-[40%] items-start">
                <div className="text-[16px]">
                The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                </div>
                <CTAButton active={true} linkto={'/signup'}>
                    Learn More
                </CTAButton>
            </div>
        </div>


        <TimelineSection/>
        <LearningLanguageSection/>

        
        </div>

        
      </div>




    </div>
  );
};

export default Home;
