import { Router } from "express";
import commentsController from "../controllers/comments.controllers";
import { validateRequest } from "../midlewares/auth/validator";
import { commentShema, commentUpdateShema } from "../interface/shemas";
import { authenticate } from "../midlewares/auth/autheticate";

const router = Router();

router.get("/", commentsController.getComments);
router.post("/", authenticate, validateRequest(commentShema), commentsController.createComment);
router.put("/:id", authenticate, validateRequest(commentUpdateShema), commentsController.updateComment);
router.delete("/:id", authenticate, commentsController.deleteComment);
router.delete("/:channel", authenticate, commentsController.deleteallComments);


const commentRoutes = router;
export default commentRoutes;