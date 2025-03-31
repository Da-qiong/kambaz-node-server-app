import * as dao from "./dao.js";

export default function AssignmentRoutes(app) {
  app.post("/api/modules/:moduleId/assignments", (req, res) => {
    const { moduleId } = req.params;
    const assignment = { ...req.body, module: moduleId };
    const newAssignment = dao.createAssignment(assignment);
    res.json(newAssignment);
  });

  app.get("/api/modules/:moduleId/assignments", (req, res) => {
    const { moduleId } = req.params;
    const assignments = dao.findAssignmentsForModule(moduleId);
    res.json(assignments);
  });

  app.put("/api/assignments/:assignmentId", (req, res) => {
    const { assignmentId } = req.params;
    const assignmentUpdates = req.body;
    const updated = dao.updateAssignment(assignmentId, assignmentUpdates);
    res.json(updated);
  });

  app.delete("/api/assignments/:assignmentId", (req, res) => {
    const { assignmentId } = req.params;
    dao.deleteAssignment(assignmentId);
    res.sendStatus(204);
  });
}
