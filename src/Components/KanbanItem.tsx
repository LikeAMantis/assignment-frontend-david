import { Card, CardContent, Checkbox, Stack, Typography } from "@mui/material";
import { Dispatch } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Item } from "../data";
import { Action } from "./Kanban";

interface Props {
    item: Item;
    index: number;
    onDelete: () => void;
}

function KanbanItem({ item, index, onDelete }: Props) {
    return (
        <Draggable draggableId={item.id.toString()} index={index}>
            {(provided, snapshot) => (
                <Card
                    ref={provided.innerRef}
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    onDoubleClick={onDelete}
                >
                    <CardContent>
                        <Stack spacing={2} direction="row" alignItems="center">
                            <Checkbox />
                            <Typography variant="h6">{item.title}</Typography>
                        </Stack>
                    </CardContent>
                </Card>
            )}
        </Draggable>
    );
}

export default KanbanItem;
