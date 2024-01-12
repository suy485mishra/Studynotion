const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

//create courseHandler func
exports.createCourse = async (req, res) => {
  try {
    //fetching info
    const {
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      tag,
      category,
      status,
      instructions,
    } = req.body;

    //get thumbnail
    const thumbnail = req.files.thumbnailImage;

    //validation
    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !tag ||
      !category ||
      !thumbnail
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    //check instructor
    const userId = req.user.id;

    //instructor ki id nikalne k liye ye kia
    const instructorDetails = await User.findById(userId, {
      accountType: "Instructor",
    });
    // console.log("Instructor details:", instructorDetails);
    //verify whether userId and instructordetails._id are same or not

    //validate
    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "Instructor Details are required",
      });
    }

    //fetch tagdetails
    const categoryDetails = await Category.findById(category);
    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "TagDetails cannot be found",
      });
    }

    //upload image to cloudinary
    const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );
    console.log(thumbnailImage);
    //entry create for new course
    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: instructorDetails._id,
      whatYouWillLearn: whatYouWillLearn,
      category: categoryDetails._id,
      tag: tag,
      status: status, //fetching from id, cam fetch frm {tag}too
      price,
      instructions: instructions,
      thumbnail: thumbnailImage.secure_url,
    });

    //ad new course to schema of instructor
    await User.findByIdAndUpdate(
      { _id: instructorDetails._id },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
    );

    //update category's schema
    // Add the new course to the Categories
    await Category.findByIdAndUpdate(
      { _id: category },
      {
        $push: {
          course: newCourse._id,
        },
      },
      { new: true }
    );

    //return res
    return res.status(200).json({
      success: true,
      message: "Successfuly Created Course",
      data: newCourse,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to create course",
      error: error.message,
    });
  }
};

//getallcourses
exports.getAllCourses = async (req, res) => {
  try {
    //fetch all ciurses
    const allCourses = await Course.find(
      {},
      {
        courseName: true,
        price: true,
        thumbnail: true, //making sure courses have name & description
        instructor: true,
        ratingAndReviews: true,
        studentsEnrolled: true,
      }
    )
      .populate("instructor")
      .exec();

    return res.status(200).json({
      success: true,
      message: "All Courses returned successfully",
      data: allCourses,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "cannot fetch d=course data",
      error: error.message,
    });
  }
};

//getCourseDetails
exports.getCourseDetails = async (req, res) => {
  try {
    //get id
    const { courseId } = req.body;
    //find course details
    const courseDetails = await Course.find({ _id: courseId })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndreviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    //validation
    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find the course with ${courseId}`,
      });
    }
    //return response
    return res.status(200).json({
      success: true,
      message: "Course Details fetched successfully",
      data: courseDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
