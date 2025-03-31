import * as dao from "./dao.js";
import * as modulesDao from "../Modules/dao.js";

export default function CourseRoutes(app) {
  app.get("/api/courses", (req, res) => {
    const courses = dao.findAllCourses();
    res.send(courses);
  });

  app.delete("/api/courses/:courseId", (req, res) => {
    const { courseId } = req.params;
    const status = dao.deleteCourse(courseId);
    res.sendStatus(status ? 204 : 400);
  });

  app.put("/api/courses/:courseId", (req, res) => {
    const { courseId } = req.params;
    const courseUpdates = req.body;
    const updatedCourse = dao.updateCourse(courseId, courseUpdates);
    res.json(updatedCourse);
  });

  app.get("/api/courses/:courseId/modules", (req, res) => {
    const { courseId } = req.params;
    const modules = modulesDao.findModulesForCourse(courseId);
    res.json(modules);
  });

  app.post("/api/courses/:courseId/modules", (req, res) => {
    const { courseId } = req.params;
    const moduleData = {
      ...req.body,
      course: courseId,
    };
    const newModule = modulesDao.createModule(moduleData);
    res.send(newModule);
  });

}