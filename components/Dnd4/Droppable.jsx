import { useDroppable } from "@dnd-kit/core";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";
import React, { useContext } from "react";
import { styled } from "stitches.config";
import DndBoardContext from "./context";


const StyledDroppable = styled('div', {
    display: "flex",
    flexDirection: "column",
    mr: "$2",
    backgroundColor: "$gray2",
    px: "$2",
    py: "$3",
    borderRadius: "$4",
    minWidth: 300,
    transition: "0.4s ease all",
    minHeight: 200
})


const Droppable = ({ id, items }) => {
    const { setNodeRef } = useDroppable({ id });

    const droppableStyle = {

    };


    const {renderBoard} = useContext(DndBoardContext)

    return (
        <SortableContext id={id} items={items} strategy={rectSortingStrategy}>
            <div ref={setNodeRef} style={droppableStyle}>

                <StyledDroppable>
                    <div>{renderBoard(id)}</div>
                    <br />
                    {items.map((item) => (
                        <SortableItem key={`item-${item.id}`} item={item} />
                    ))}
                </StyledDroppable>
            </div>
        </SortableContext>
    );
};

export default Droppable;
