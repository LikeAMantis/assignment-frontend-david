import { Card, CardContent, Checkbox, Stack, Typography } from "@mui/material";
import { Draggable } from "react-beautiful-dnd";
import { Item } from "../data";

interface Props {
    item: Item;
    index: number;
}

function KanbanItem({ item, index }: Props) {
    return (
        <Draggable draggableId={item.id.toString()} index={index}>
            {(provided, snapshot) => (
                <Card
                    ref={provided.innerRef}
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
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
