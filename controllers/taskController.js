const Task = require('../model/task');

const createTask = async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;

    const task = new Task({
      title,
      description,
      dueDate,
      user: req.user.userId, // from JWT
    });

    await task.save();

    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getTasks = async (req, res) => {
    try {
      const tasks = await Task.find({ user: req.user.userId }).sort({ createdAt: -1 });
      res.json(tasks);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch tasks' });
    }
  };

  const getTask = async (req, res) => {
    try {
      const task = await Task.findOne({
        _id: req.params.id,
        user: req.user.userId,
      });
  
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
  
      res.json(task);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch task' });
    }
  };

  const deleteTask = async (req, res) => {
    try {
      const task = await Task.findOneAndDelete({
        _id: req.params.id,
        user: req.user.userId,
      });
  
      if (!task) {
        return res.status(404).json({ error: 'Task not found or unauthorized' });
      }
  
      res.json({ message: 'Task deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete task' });
    }
  };

  const updateTask = async (req, res) => {
    try {
      const { title, description, completed, dueDate } = req.body;
  
      // Find and update the task
      const task = await Task.findOneAndUpdate(
        {
          _id: req.params.id,
          user: req.user.userId,
        },
        {
          title,
          description,
          completed,
          dueDate,
        },
        {
          new: true, // return the updated document
          runValidators: true, // ensure schema validation
        }
      );
  
      if (!task) {
        return res.status(404).json({ error: 'Task not found or unauthorized' });
      }
  
      res.json(task);
    } catch (err) {
      res.status(500).json({ error: 'Failed to update task' });
    }
  };

module.exports = {
    createTask,
    getTasks,
    getTask,
    updateTask,
    deleteTask
}