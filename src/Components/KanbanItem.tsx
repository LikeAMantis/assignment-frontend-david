import { Card, CardContent, Checkbox, Stack, Typography } from "@mui/material";
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Item } from "./Kanban";

interface Props {
    item: Item;
    index: number;
}

function KanbanItem({ item, index }: Props) {
    return (
        <Draggable draggableId={item.id.toString()} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                >
                    <Card>
                        <CardContent>
                            <Stack
                                spacing={2}
                                direction="row"
                                alignItems="center"
                            >
                                <Checkbox />
                                <Typography variant="h6">
                                    {item.title}
                                </Typography>
                            </Stack>
                        </CardContent>
                    </Card>
                </div>
            )}
        </Draggable>
    );
}

export default KanbanItem;
