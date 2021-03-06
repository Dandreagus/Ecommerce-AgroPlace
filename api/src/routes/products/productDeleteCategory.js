const { Product, Category } = require("../../db.js");
module.exports = async (req, res) => {
  const { id, categoryId } = req.params;
  try {
    const product = await Product.findOne({
      where: {
        id: id,
      },
      include: {
        model: Category,
      },
    });
    await product.removeCategories([categoryId]);
    res.send("Deleted").status(200);
  } catch (error) {
    res.json(error);
  }
};
