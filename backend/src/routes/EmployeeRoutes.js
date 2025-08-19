import express from "express";
import {
  getEmployees,
  createEmployee,
  deleteEmployee,
  updateEmployee,
  getEmployeeById,
  getManageableEmployees,
} from "../controllers/EmployeeController.js";
import { protect, hasPermission } from "../middleware/AuthMiddleware.js";
import { PERMISSIONS } from "../../config/permissions.js";
import { upload, processAndSaveImage } from "../middleware/UploadMiddleware.js";

const router = express.Router();

router.get(
  "/",
  protect,
  hasPermission([PERMISSIONS.PAGES.EMPLOYEE_MANAGEMENT, PERMISSIONS.EMPLOYEE.READ]),
  getEmployees
);
router.post(
  "/",
  protect,
  hasPermission([PERMISSIONS.PAGES.EMPLOYEE_MANAGEMENT, PERMISSIONS.EMPLOYEE.CREATE]),
  upload.single("picture"),
  processAndSaveImage,
  createEmployee
);

// for employee permission management page=====================================
router.get(
  "/manageable",
  protect,
  hasPermission([PERMISSIONS.PAGES.MANAGE_EMPLOYEE_PERMISSIONS, PERMISSIONS.EMPLOYEE_PERMISSIONS_MANAGE.READ]),
  getManageableEmployees
);

//=================================================================

router.get(
  "/:id",
  protect,
  hasPermission([PERMISSIONS.PAGES.EMPLOYEE_MANAGEMENT, PERMISSIONS.EMPLOYEE.UPDATE]),
  getEmployeeById
);

router.put(
  "/:id",
  protect,
 hasPermission([PERMISSIONS.PAGES.EMPLOYEE_MANAGEMENT, PERMISSIONS.EMPLOYEE.UPDATE]),
  upload.single("picture"),
  processAndSaveImage,
  updateEmployee
);
router.delete(
  "/:id",
  protect,
hasPermission([PERMISSIONS.PAGES.EMPLOYEE_MANAGEMENT, PERMISSIONS.EMPLOYEE.DELETE]),
  deleteEmployee
);

export default router;
