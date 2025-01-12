import express, {Express, Request, Response } from "express";
import cors from "cors";

const server = express();

interface Todo {
  id : number;
  label : string;
  done : boolean;
  dueDate? : Date;
}

server.use(cors());
const monTableau: Todo[] = [
  { id: 1, label: "apprendre Vue Js", done: false,
  dueDate: new Date("2024-12-31")},
  { id: 2, label: "apprendre à faire des boucles", done: false },
  { id: 3, label: "apprendre à griller des saucisses", done: true,
  dueDate: new Date("2024-12-31") }];

  server.get("/todos", (req: Request, res: Response) => res.send(monTableau));

  server.listen(3001, () => console.log("serveur prêt à démarrer"));

  server.get("/todos/:id", (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const todo = monTableau.find((t) => t.id === id);
    if (todo) {
    res.send(todo);
    } else {
    res.status(404).send("Todo not found");
    }
    });

    server.put("/todos/:id", (req: Request, res: Response) => {
      const id = parseInt(req.params.id, 10);
      const { label, done, dueDate } = req.body;
      const todoIndex = monTableau.findIndex((t) => t.id === id);
      if (todoIndex !==-1) {
      monTableau[todoIndex] = {
      ...monTableau[todoIndex],
      label: label || monTableau[todoIndex].label,
      done: done !== undefined ? done : monTableau[todoIndex].done,
      dueDate: dueDate ? new Date(dueDate) :
      monTableau[todoIndex].dueDate,
      };
     res.send(monTableau[todoIndex]);
      } else {
      res.status(404).send("Todo not found");
      }
      });

      server.delete("/todos/:id", (req: Request, res: Response) => {
        const id = parseInt(req.params.id, 10);
        const todoIndex = monTableau.findIndex((t) => t.id === id);
        if (todoIndex !==-1) {
        const deletedTodo = monTableau.splice(todoIndex, 1);
        res.send(deletedTodo);
        } else {
        res.status(404).send("Todo not found");
        }
        });

        server.post("/todos", (req: Request, res: Response) => {
          const { label, done, dueDate } = req.body;
          const newId = monTableau.length > 0 ? monTableau[monTableau.length-1].id + 1 : 1;
          const newTodo: Todo = { id: newId, label, done, dueDate: dueDate ?
          new Date(dueDate) : undefined };
          monTableau.push(newTodo);
          res.status(201).send(newTodo);
          });


























































([
    { todo: 'Apprendre Vue Js', done: false },
    { todo: 'Apprendre à faire des boucles', done: false },
    { todo: 'Apprendre le piano', done: true },
    { todo: 'Apprendre à utiliser VueJs', done: false },
    { todo: 'Faire les courses plus souvent', done: false },
    { todo: 'Aller à la salle 5 fois par semaine', done: false },
    { todo: 'Manger plus sainement', done: false },
    { todo: 'Apprendre à faire du piano', done: false }
  ])

server.get("/todos", (req: Request, res: Response) => res.send(monTableau));

server.listen(3000, () => console.log ("serveur prêt à démarrer"));