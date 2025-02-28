import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Stack,
    TextField,
} from "@mui/material";
import { Droppable } from "react-beautiful-dnd";
import KanbanItem from "./KanbanItem";
import { List } from "../data";
import { Dispatch, useState } from "react";
import { Action } from "./Kanban";

interface Props {
    list: List;
    dispatch: Dispatch<Action>;
}

function KanbanList({ list, dispatch }: Props) {
    const [isInput, setIsInput] = useState(false);
    const [value, setValue] = useState("");

    function handleKeyDown(e: any) {
        if (e.code === "Enter") {
            dispatch({
                type: "ADD",
                listId: list.id,
                item: {
                    title: value,
                    id: Math.floor(Math.random() * 10000).toString(),
                },
            });
            e.target.blur();
        }
    }

    return (
        <Droppable droppableId={list.id} direction="vertical" type="Items">
            {(provided, snapshot) => (
                <Card
                    ref={provided.innerRef}
                    {...provided.droppableProps}
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
                                    onDelete={() =>
                                        dispatch({
                                            type: "REMOVE",
                                            listId: list.id,
                                            itemId: item.id,
                                        })
                                    }
                                />
                            ))}
                            {provided.placeholder}
                            {isInput && (
                                <TextField
                                    variant="filled"
                                    value={value}
                                    autoFocus={true}
                                    onChange={(e) => setValue(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    onBlur={() => {
                                        setIsInput(false);
                                        setValue("");
                                    }}
                                />
                            )}
                            <Button onClick={() => setIsInput(!isInput)}>
                                Add item
                            </Button>
                        </Stack>
                    </CardContent>
                </Card>
            )}
        </Droppable>
    );
}

export default KanbanList;
