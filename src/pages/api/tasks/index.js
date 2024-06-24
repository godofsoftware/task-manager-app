import { getAllTasks, createTask } from '../models/task';

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const tasks = await getAllTasks();
        res.status(200).json(tasks);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
      break;
    case 'POST':
      try {
        const task = await createTask(req.body);
        res.status(201).json(task);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
