export type Item = {
    id: string;
    title: string;
};

export type List = {
    id: string;
    title: string;
    items: Item[];
};

const dataLists: List[] = [
    {
        id: "A",
        title: "Backlog",
        items: [
            { id: "1", title: "Call with sales" },
            { id: "2", title: "Interview with Asis" },
        ],
    },
    {
        id: "B",
        title: "Production",
        items: [
            { id: "4", title: "Intergrate Strip Api" },
            { id: "5", title: "Update Customer Api" },
            { id: "6", title: "Test" },
        ],
    },
    {
        id: "C",
        title: "Q&A ",
        items: [],
    },
];

export default dataLists;
