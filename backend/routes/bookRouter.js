import {isAuthenticated, isAuthorized} from "../middlewares/authMidddleware.js"
import express from 'express';
import { addBook, deleteBook, getAllBooks } from '../controllers/bookController.js';

const router = express.Router();

router.post("/admin/add",isAuthenticated,isAuthorized("Admin"), addBook);
router.get("/all",isAuthenticated,getAllBooks);
router.delete("/delete/:id",isAuthenticated,isAuthorized("Admin"),deleteBook);

export default router;