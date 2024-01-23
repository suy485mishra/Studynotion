import { FaArrowRight } from "react-icons/fa";
import CTAButton from  '../components/core/HomePage/Button'
import React from "react"
import { Link } from "react-router-dom";
import HighlightText from "../components/core/HomePage/HighlightText";
import Banner from '../assets/Images/banner.mp4'

const Home = () => {
  return (
    <div>
      {/* Section-1 */}
      <div className="relative mx-auto flex flex-col w-11/12 items-center text-white justify-between max-w-maxContent">
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

        <div className="shadow-blue-200">
                <video muted loop autoPlay
                >
                <source src={Banner} type='video/mp4' />



                </video>
        </div>


      </div>




    </div>
  );
};

export default Home;
