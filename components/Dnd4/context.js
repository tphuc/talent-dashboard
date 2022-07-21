import React from "react";

const DndBoardContext = React.createContext({
    renderItem: (item) => item,
    renderBoard: (item) => item
});
export default DndBoardContext;