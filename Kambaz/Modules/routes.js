import * as dao from "./dao.js";

function ModuleRoutes(app) {

  const createModule = async (req, res) => {
    const { cid } = req.params;
    console.log(req.body)
    const module = await dao.createModule(cid, req.body);
   
    res.json(module);
  }

  const deleteModule = async (req, res) => {
    const status = await dao.deleteModule(req.params.moduleId);
    console.log(req.params.moduleId, status)
    res.json(status);
  }

  const findAllModules = async (req, res) => {
    const modules = await dao.findAllModules();
    res.json(modules);
  }

  const findModuleById = async (req, res) => {
    const module = await dao.findModuleById(req.params.moduleId);
    res.json(module);
  }

  const updateModule = async (req, res) => {
    const { moduleId } = req.params;
    const status = await dao.updateModule(moduleId, req.body);
    res.json(status);
  }

  const findModuleforCourse = async (req, res) => {
    const { courseId } = req.params;
    const modules = await dao.findModuleforCourse(courseId);
    console.log(modules);
    res.json(modules);
  }

  app.post("/api/Courses/:cid/modules", createModule);
  app.delete("/api/modules/:moduleId", deleteModule);
  app.get("/api/modules", findAllModules);
  app.get("/api/modules/:moduleId", findModuleById);
  app.put("/api/modules/:moduleId", updateModule);
  app.get("/api/Courses/:courseId/modules", findModuleforCourse);
}
export default ModuleRoutes;