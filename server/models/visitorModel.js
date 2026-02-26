import mongoose from "mongoose";

const visitorSchema = new mongoose.Schema(
    {
        visitorId: { type: String, required: true },
        panel: {
            type: String,
            enum: ["user", "admin"],
            required: true,
        },
        visits: { type: Number, default: 1 },
        lastVisitedAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);


visitorSchema.index({ visitorId: 1, panel: 1 }, { unique: true });

export default mongoose.model("Visitor", visitorSchema);
