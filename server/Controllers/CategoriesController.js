import Categories from "../Models/CategoriesModel.js";

const getCategories = async (req, res) => {
  try {
    const categories = await Categories.find({});
    res.json(categories);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const createCategory = async (req, res) => {
  try {
    const { title } = req.body;
    const category = new Categories({
      title,
    });

    const createdCategory = await category.save();
    res.status(201).json(createdCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updatedCategory = async (req, res) => {
  try {
    const category = await Categories.findById(req.params.id);

    if (category) {
      category.title = req.body.title || category.title;
      const updatedCategory = await category.save();
      res.json(updatedCategory);
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const category = await Categories.findById(req.params.id);

    if (category) {
      await category.deleteOne();
      res.json({ message: "Category deleted" });
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export { getCategories, createCategory, updatedCategory, deleteCategory };
