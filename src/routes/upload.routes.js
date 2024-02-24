
import express from 'express';
import multer from 'multer';
import { uploadController, getAll, getOne, updateUpload, deleteUpload, deleteAll  } from '../controllers/uploadController.js';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/upload', upload.single('file'), uploadController);

router.get('/upload', getAll);

router.get('/upload/:id', getOne);

router.put('/upload/:id', updateUpload);

router.delete('/upload/:id', deleteUpload);

router.delete('/upload', deleteAll);

export default router;
