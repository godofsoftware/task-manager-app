import { getTaskById, updateTask, deleteTask } from '../models/task';

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case 'GET':
      try {
        const task = await getTaskById(id);
        if (!task) {
          return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(task);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
      break;
    case 'PUT':
      try {
        const task = await updateTask(id, req.body);
        res.status(200).json(task);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
      break;
    case 'DELETE':
      try {
        await deleteTask(id);
        res.status(204).end();
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
