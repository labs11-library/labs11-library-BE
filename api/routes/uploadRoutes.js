const express = require("express");
const router = express.Router();

const { multerUploads, dataUri } = require("../middleware/multer.js");
const {
  cloudinaryConfig,
  uploader
} = require("../middleware/cloudinaryConfig.js");
cloudinaryConfig(router);

router.post("/", multerUploads, (req, res) => {
  if (req.file) {
    const file = dataUri(req).content;
    return uploader.upload(file).then(result => {
      const image = result.url;
      return res
        .status(200)
        .json({
          message: "Your image has been uploaded successfully to cloudinary",
          image: image
        })
        .catch(err =>
          res.status(400).json({
            message: "Something went wrong while processing your request",
            err: err
          })
        );
    });
  }
});

module.exports = router;
