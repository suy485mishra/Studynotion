const Tag = require("../models/tags");

//createTag handler function
exports.createTag = async (req, res) => {
  try {
    //fetch details
    const { name, description } = req.body;

    //validate
    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    //create Db entry
    const tagDetails = await Tag.create({
      name: name,
      description: description,
    });
    console.log(tagDetails);

    //return response
    return res.status(200).json({
      success: true,
      message: "Tag created successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//getAlltags handler function
exports.showAlltags = async (req, res) => {
  try {
    //fetch all tags
    const allTags = await Tag.find({}, { name: true, description: true }); //making sure tags have name & description

    return res.status(200).json({
      success: true,
      message: "All tags returned successfully",
      allTags,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,

    });

  }
};
