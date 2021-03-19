const { model, Schema } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

let dateTime = new Date();

const LendSchema = Schema({
  collaborator: {
    type: Schema.ObjectId,
    ref: "Collaborator",
    required: true,
  },

  date_issued: {
    type: String,
    default: () => dateTime.toISOString().slice(0, 10),
    required: true,
  },

  status: {
    type: String,
    default: "active",
    required: true,
  },

  initial_amount: {
    type: Number,
    required: true,
  },

  amount: {
    type: Number,
    required: true,
  },

  fee: {
    type: Number,
    required: true,
  },
});

LendSchema.plugin(mongoosePaginate);

module.exports = model("Lend", LendSchema);
