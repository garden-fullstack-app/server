'use strict';

const PestModel = require('./pestModel.js');

const Pests = {};

Pests.addAPest = async (req, res, next) => {
  try {
    const data = req.body;
    const pest = new PestModel(data);
    await pest.save();
    res.status(200).send(pest);
  } catch (e) { next(e.message); }
}

Pests.getAllPests = async (req, res) => {
  const pests = await PestModel.find({});
  res.status(200).send(pests);
}

// Pests.getOnePest = async (req, res) => {
//   const id = req.params.id;
//   const pests = await PestModel.find({ _id: id });
//   res.status(200).send(Pests[0]);
// }

// Pests.updatePest = async (req, res) => {
//   let putObj = req.body;
//   console.log(req.body);
//   let id = req.params.id;
//   console.log(req.params);

//   try {
//     const updatedObj = await PestModel.findByIdAndUpdate(id, putObj, { new: true, overwrite: true });
//     res.status(200).send(updatedObj);
//   }
//   catch (err) {
//     res.status(500).send(`Unable to perform PUT: ${err.message}`);
//   }
// }

Pests.deleteOnePest = async (req, res) => {

  let { id } = req.params;
  try {
    let deletedObj = await PestModel.findByIdAndDelete(id);
    res.status(200).send(deletedObj);
  }
  catch (err) {
    res.status(500).send(`Deletion Error: ${err.message}`);
  }

}


module.exports = Pests;