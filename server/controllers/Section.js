const Section = require("../models/Section");

const Course = require("../models/Course");

//create secction
exports.createSection = async (req, res) => {
  //fetching data
  try {
    const { sectionName, courseId } = req.body;

    //data validtaion
    if (!sectionName || courseId) {
      return res.status(400).json({
        success: false,
        message: "Missing Properties needed for creating section",
      });
    }

    //create actual section
    const newSection = await Section.create({ sectionName });

    //update course with section's objId
    const updatedCourseDetails = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: {
          courseContent: newSection._id,
        },
      },
      {
        new: true,
      }
    );
    //DIY: USE POPULATE TO REPLACE SEC/SUB-SEC IN UPDATEDCOURSEDETAILS
    return res.status(200).json({
      success: true,
      message: "Section created successfully",
      updatedCourseDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "cannot create function.try again",
      updatedCourseDetails,
    });
  }
};

//update section
exports.updateSection = async (req, res) => {
  try {
    //fetch
    const { sectionName, sectionId } = req.body;

    //validate
    if (!sectionName || !sectionId) {
      return res.status(400).json({
        success: false,
        message: "Missing Properties",
      });
    }

    //updating data
    const section = await Section.findByIdAndUpdate(
      sectionId,
      { sectionName }.sectionName,
      { new: True }
    );

    return res.status(200).json({
      success: true,
      message: "Section Updated Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "cannot update section, try again",
      updatedCourseDetails,
    });
  }
};

//delete a section
exports.deleteSection = async (req, res) => {
  try {
    const { sectionId } = req.params; //params mein hogi
    await Section.findByIdAndDelete(sectionId);
    
    //do we need to delete the entry from the course schema ??


    return res.status(200).json({
      success: true,
      message: "Section Deleted lambardaar",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Cannot dlete section",
      error: error.message,
    });
  }
};
