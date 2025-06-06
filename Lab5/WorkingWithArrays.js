let todos = [
    { id: 1, title: "Task 1", description: "Do homework", completed: false },
    { id: 2, title: "Task 2", description: "Buy milk", completed: true },
    { id: 3, title: "Task 3", description: "Clean room", completed: false },
    { id: 4, title: "Task 4", description: "Read book", completed: true },
];

export default function WorkingWithArrays(app) {

    app.get("/lab5/todos", (req, res) => {
        const { completed } = req.query;
        if (completed !== undefined) {
            const completedBool = completed === "true";
            const filtered = todos.filter((t) => t.completed === completedBool);
            res.json(filtered);
        } else {
            res.json(todos);
        }
    });

    app.get("/lab5/todos/:id", (req, res) => {
        const { id } = req.params;
        const todo = todos.find((t) => t.id === parseInt(id));
        res.json(todo);
    });

    app.get("/lab5/todos/create", (req, res) => {
        const newTodo = {
            id: new Date().getTime(),
            title: "New Task",
            completed: false,
            description: "Default description",
        };
        todos.push(newTodo);
        res.json(todos);
    });

    app.post("/lab5/todos", (req, res) => {
        const newTodo = {
            ...req.body,
            id: new Date().getTime(),
        };
        todos.push(newTodo);
        res.json(newTodo);
    });

    app.get("/lab5/todos/:id/delete", (req, res) => {
        const { id } = req.params;
        const index = todos.findIndex((t) => t.id === parseInt(id));
        if (index !== -1) {
            todos.splice(index, 1);
        }
        res.json(todos);
    });

    app.delete("/lab5/todos/:id", (req, res) => {
        const { id } = req.params;
        const index = todos.findIndex((t) => t.id === parseInt(id));
        if (index === -1) {
            res.status(404).json({ message: `Unable to delete Todo with ID ${id}` });
            return;
        }
        todos.splice(index, 1);
        res.sendStatus(200);
    });

    app.put("/lab5/todos/:id", (req, res) => {
        const { id } = req.params;
        const index = todos.findIndex((t) => t.id === parseInt(id));
        if (index === -1) {
            res.status(404).json({ message: `Unable to update Todo with ID ${id}` });
            return;
        }
        todos = todos.map((t) =>
            t.id === parseInt(id) ? { ...t, ...req.body } : t
        );
        res.sendStatus(200);
    });

    app.get("/lab5/todos/:id/title/:title", (req, res) => {
        const { id, title } = req.params;
        const todo = todos.find((t) => t.id === parseInt(id));
        if (todo) {
            todo.title = title;
        }
        res.json(todos);
    });

    app.get("/lab5/todos/:id/completed/:completed", (req, res) => {
        const { id, completed } = req.params;
        const todo = todos.find((t) => t.id === parseInt(id));
        if (todo) {
            todo.completed = completed === "true";
        }
        res.json(todos);
    });
}
