import { Box, Stack } from "@mui/material";
import produce from "immer";
import { useReducer } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import dataLists, { Item, List } from "../data";
import KanbanList from "./KanbanList";

export type Action =
    | {
          type: "MOVE";
          from: string;
          to: string;
          fromIndex: number;
          toIndex: number;
      }
    | { type: "ADD"; listId: string; item: Item };

const dragReducer = produce((draft: List[], action: Action) => {
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
    const [lists, dispatch] = useReducer(dragReducer, dataLists);

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
                <Stack
                    spacing={2}
                    margin={5}
                    direction={{ xs: "column", md: "row" }}
                    justifyContent="center"
                    alignItems={{ xs: "center", md: "start" }}
                >
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
