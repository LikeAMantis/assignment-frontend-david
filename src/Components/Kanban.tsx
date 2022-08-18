import { Box, Button, Stack } from "@mui/material";
import produce from "immer";
import { useReducer, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import KanbanItem from "./KanbanItem";
import KanbanList from "./KanbanList";

export type Item = {
    id: string | number;
    title: string;
    listId: string;
};

export type List = {
    id: string;
    title: string;
    items: Item[];
};

const dataLists: List[] = [
    {
        id: "a",
        title: "test",
        items: [
            { listId: "a", id: 1, title: "hallo" },
            { listId: "a", id: 2, title: "wie" },
            { listId: "a", id: 3, title: "gehts" },
        ],
    },
    {
        id: "b",
        title: "projects",
        items: [
            { listId: "b", id: 4, title: "eins" },
            { listId: "b", id: 5, title: "zwei" },
            { listId: "b", id: 6, title: "drei" },
        ],
    },
];

const dragReducer = produce((draft: List[], action) => {
    switch (action.type) {
        case "MOVE": {
            const fromId = draft.findIndex(
                (list: List) => list.id === action.from
            );
            const toId = draft.findIndex((list: List) => list.id === action.to);

            draft[fromId].items = draft[fromId].items || [];
            draft[toId].items = draft[toId].items || [];
            const [removed] = draft[fromId].items.splice(action.fromIndex, 1);
            draft[toId].items.splice(action.toIndex, 0, removed);
            break;
        }
        case "ADD": {
            const listId = draft.findIndex(
                (list: List) => list.id === action.listId
            );

            draft[listId].items.push(action.item);
            break;
        }
    }
});

export function Kanban() {
    // const [lists, setLists] = useState<List[]>(dataLists);
    const [lists, dispatch] = useReducer(dragReducer, dataLists);

    // function reorder<Type>(
    //     list: Type[],
    //     startIndex: number,
    //     endIndex: number
    // ): Type[] {
    //     const result = Array.from(list);
    //     const [removed] = result.splice(startIndex, 1);
    //     result.splice(endIndex, 0, removed);

    //     return result;
    // }

    function handleOnDragEnd(result: DropResult) {
        if (result.reason === "DROP") {
            if (!result.destination) {
                return;
            }
            dispatch({
                type: "MOVE",
                from: result.source.droppableId,
                to: result.destination.droppableId,
                fromIndex: result.source.index,
                toIndex: result.destination.index,
            });
        }
    }

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Box sx={{ paddingBottom: 4 }}>
                <Stack spacing={2} margin={5} direction="row">
                    {lists.map((list: List) => (
                        <KanbanList
                            key={list.id}
                            list={list}
                            dispatch={dispatch}
                        />
                    ))}
                </Stack>
            </Box>
        </DragDropContext>
    );
}

export default Kanban;
