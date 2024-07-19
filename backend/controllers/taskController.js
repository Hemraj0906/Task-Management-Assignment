const Task = require("../models/Task");

// Get all tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    let totalTask = tasks.length;
    console.log(tasks.length);
    res.json({ message: "get all task", totalTask, data: tasks });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a task
// exports.createTask = async (req, res) => {
//   const { title, description, dueDate, pipeline, status } = req.body;
//   console.log("Request body:", req.body);
//   console.log("Authenticated user:", req.user);

//   try {
//     const newTask = new Task({
//       title,
//       description,
//       dueDate,
//       pipeline,
//       status,
//       userId: req.user._id, // Assuming req.user is set by authentication middleware
//     });

//     await newTask.save();
//     console.log("data:->",newTask)
//     res
//       .status(201)
//       .json({ message: "Task created successfully", data: newTask });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

exports.createTask = async (req, res) => {
  const { title, description, dueDate, pipeline, status } = req.body;
  console.log("Request body:", req.body);
  console.log("Authenticated user:", req.user);

  try {
    const newTask = new Task({
      title,
      description,
      dueDate,
      pipeline,
      status,
      userId: req.user._id, // Assuming req.user is set by authentication middleware
    });

    await newTask.save();
    console.log("New task created:", newTask);
    res
      .status(201)
      .json({ message: "Task created successfully", data: newTask });
  } catch (err) {
    if (err.name === "ValidationError") {
      console.error("Validation error:", err);
      res.status(400).json({ message: err.message });
    } else {
      console.error("Error creating task:", err);
      res.status(500).json({ message: err.message });
    }
  }
};

exports.getTasksByLoggedInUser = async (req, res) => {
  try {
    const userId = req.user._id;

    const tasks = await Task.find({ userId });
    const totalTask = tasks.length;

    if (totalTask === 0) {
      return res.status(404).json({ message: "No tasks found for this user" });
    }

    res
      .status(200)
      .json({ message: "Get all tasks for user", totalTask, data: tasks });
  } catch (error) {
    console.error("Error fetching user tasks:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  const { title, description, dueDate, pipeline, status } = req.body;
  const id = req.params.id;

  try {
    if (!id) {
      return res.status(400).json({ message: "ID is required from params" });
    }

    const updateFields = {};
    if (title !== undefined) updateFields.title = title;
    if (description !== undefined) updateFields.description = description;
    if (dueDate !== undefined) updateFields.dueDate = dueDate;
    if (pipeline !== undefined) updateFields.pipeline = pipeline;
    if (status !== undefined) updateFields.status = status;

    const updatedTask = await Task.findByIdAndUpdate(id, updateFields, {
      new: true,
    });

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted succefully", data: deletedTask });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
