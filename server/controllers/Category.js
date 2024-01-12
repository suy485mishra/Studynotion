const Category = require("../models/Category");

//createTag handler function
exports.createCategory = async (req, res) => {
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
    const CategorysDetails = await Category.create({
      name: name,
      description: description,
    });
    console.log(CategorysDetails);

    //return response
    return res.status(200).json({
      success: true,
      message: "Category created successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,/*????*/
      message: error.message,
    });
  }
};

//getAlltags handler function
exports.showAllCategories = async (req, res) => {
  try {
    //fetch all tags
    const allCategorys = await Category.find(
      {},
      { name: true, description: true }
    ); //making sure tags have name & description

    return res.status(200).json({
      success: true,
      // message: "All categories returned successfully",
      data: allCategorys,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.categoryPageDetails = async (req, res) => {
  try {
    //fetch id
    const { categoryId } = req.body;

    // Get courses for the specified category
    const selectedCategory = await Category.findById(categoryId)
      .populate("courses")//reference ni chahiyye
      .exec();
    console.log(selectedCategory);
    // Handle the case when the category is not found
    if (!selectedCategory) {
      console.log("Category not found.");
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }
    // Handle the case when there are no courses
    if (selectedCategory.courses.length === 0) {
      console.log("No courses found for the selected category.");
      return res.status(404).json({
        success: false,
        message: "No courses found for the selected category.",
      });
    }

    const selectedCourses = selectedCategory.courses;

    // Get courses for other categories
    const categoriesExceptSelected = await Category.find({
      _id: { $ne: categoryId },
    }).populate("courses");
    let differentCourses = [];
    for (const category of categoriesExceptSelected) {
      differentCourses.push(...category.courses);
    }

    // Get top-selling courses across all categories
    const allCategories = await Category.find().populate("courses");
    const allCourses = allCategories.flatMap((category) => category.courses);
    const mostSellingCourses = allCourses
      .sort((a, b) => b.sold - a.sold) //for priority
      .slice(0, 10);

    res.status(200).json({
      success:true,
      selectedCourses: selectedCourses,
      differentCourses: differentCourses,
      mostSellingCourses: mostSellingCourses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
