// External require
const multer = require("multer");

// Creating variable for handling different image extensions
const MIME_TYPE = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

// Method for storing an image
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images')
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPE[file.mimetype];
    callback(null, `${name}_${Date.now()}.${extension}`);
  }
});

// Validator for fields in multer
async function fileFilter (req, file, cb) {
  try {
    // Regex to test fields for valid characters
    const fieldsRegex = /^[a-zA-Z0-9 _.,;éèêàùâïëöü'!()&\n\r]+$/;

    // Creating const from req.body
    const {title, content } = req.body

    if(fieldsRegex.test(title) &&
      fieldsRegex.test(content)) {
      return cb(null, true)
    } else {
      return cb(new Error("Certains champs contiennent des caractères invalides"))
    }
  } catch(err) {
    return cb(new Error(err))
  }
}


const upload = multer({storage: storage,
fileFilter : (req, file, cb) => {fileFilter(req, file,cb)}
})

module.exports = upload.single('image')

