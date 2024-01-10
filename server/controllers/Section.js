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
    ).populate({
      path: "courseContent",
      populate: {
        path: "subSection",
      },
    })
    .exec();

  //  Done: //DIY: USE POPULATE TO REPLACE SEC/SUB-SEC IN UPDATEDCOURSEDETAILS
    return res.status(200).json({
      success: true,
      message: "Section created successfully",
      updatedCourseDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "cannot create function.try again",
      error:error.message
    });
  }
};

//update section
exports.updateSection = async (req, res) => {
	try {
		const { sectionName, sectionId } = req.body;
		const section = await Section.findByIdAndUpdate(
			sectionId,
			{ sectionName },
			{ new: true }
		);
		res.status(200).json({
			success: true,
			message: section,
		});
	} catch (error) {
		console.error("Error updating section:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
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
