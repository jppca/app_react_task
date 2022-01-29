import React from "react";
import { FormGroup } from "@mui/material";
//My imports
import { TodoItem } from "./TodoItem";

//Funcion encargada de retornar la lista de tareas
export function TodoList({ todos, toggleTodo }) {
    return (
        <FormGroup>
            {todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} />
            ))}
        </FormGroup>
    );
}