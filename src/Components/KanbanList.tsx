import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Input,
    listClasses,
    Paper,
    Stack,
} from "@mui/material";
import { Droppable } from "react-beautiful-dnd";
import KanbanItem from "./KanbanItem";
import { List } from "./Kanban";
import { useState } from "react";

interface Props {
    list: List;
    dispatch: (action: Object) => void;
}

function KanbanList({ list, dispatch }: Props) {
    const [isInput, setIsInput] = useState(false);

    return (
        <Droppable droppableId={list.id} type="Items">
            {(provided, snapshot) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                    <Card
                        variant="outlined"
                        sx={{ bgcolor: "grey.200", width: 400 }}
                    >
                        <CardHeader
                            sx={{
                                ".MuiCardHeader-title": { fontSize: 34 },
                            }}
                            title={list.title}
                        />
                        <CardContent>
                            <Stack spacing={2}>
                                {list.items.map((item, index) => (
                                    <KanbanItem
                                        key={item.id}
                                        item={item}
                                        index={index}
                                    />
                                ))}
                                {provided.placeholder}
                                <Paper>
                                    <Input />
                                </Paper>
                                <Button
                                    onClick={() =>
                                        dispatch({
                                            type: "ADD",
                                            listId: list.id,
                                            item: {
                                                title: "test",
                                                id: Math.floor(
                                                    Math.random() * 10000
                                                ),
                                            },
                                        })
                                    }
                                >
                                    Add item
                                </Button>
                            </Stack>
                        </CardContent>
                    </Card>
                </div>
            )}
        </Droppable>
    );
}

export default KanbanList;
