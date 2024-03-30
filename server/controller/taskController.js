const { TaskModal } = require("../modals/taskModal");


const addTask = async (req, res) => {
    try {
        const task = new TaskModal(req.body);
        await task.save()
        res.status(201).json({ message: "Task Created Successfully" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}
const getTask = async (req, res) => {
    const { priority, category } = req.query;
    try {
        let query = {};
        if (priority) {
            query.priority = priority;
        }
        if (category) {
            query.category = category;
        }
        const tasks = await TaskModal.find(query);
        tasks.sort((a, b) => {
            const priorityOrder = { high: 3, medium: 2, low: 1 };
            return priorityOrder[b.priority] - priorityOrder[a.priority];
        });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getTaskById = async (req, res) => {
    const Id = req.params.id;
    try {
        const tasks = await TaskModal.find({ _id: Id });
        res.status(200).json({ statusCode: 200,data: tasks});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const updateTask = async (req, res) => {
    const Id = req.params.id;
    const body = req.body;
    try {
        const task = await TaskModal.findByIdAndUpdate({ _id: Id }, body);
        res.json({ message: "Task update successfully" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const deleteTask = async (req, res) => {
    const Id = req.params.id
    try {
        await TaskModal.findByIdAndDelete(Id);
        res.json({ message: 'Task deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = { addTask, getTask, getTaskById, deleteTask, updateTask }