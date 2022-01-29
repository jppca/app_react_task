import React from "react";
import { FormControlLabel, Checkbox } from '@mui/material/';

//Función encargada de generar cada item de la lista 
export function TodoItem({ todo, toggleTodo }) {
    const { id, task, completed } = todo;

    const handleTodoClick = () => {
        toggleTodo(id);
    };

    return (
        <FormControlLabel control={<Checkbox Checked={completed} onChange={handleTodoClick} />} label={task} />
    );
}