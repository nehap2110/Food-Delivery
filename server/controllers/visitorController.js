import Visitor from "../models/visitorModel.js";

export const trackVisitor = async (req, res) => {
  try {
    const { visitorId, panel } = req.body;

    if (!visitorId || !panel) {
      return res.status(400).json({
        success: false,
        message: "visitorId and panel are required",
      });
    }

    const visitor = await Visitor.findOne({ visitorId, panel });

    if (visitor) {
      visitor.visits += 1;
      visitor.lastVisitedAt = new Date();
      await visitor.save();

      return res.status(200).json({
        success: true,
        type: "returning",
        visits: visitor.visits,
      });
    }

    await Visitor.create({ visitorId, panel });

    return res.status(201).json({
      success: true,
      type: "new",
      visits: 1,
    });
  } catch (error) {
    console.error("Visitor tracking error:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
