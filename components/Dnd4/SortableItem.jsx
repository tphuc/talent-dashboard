import React, { useContext } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { styled } from "stitches.config";
import DndBoardContext from "./context";


const StyledItem = styled('div', {
  width: 300,
    minHeight: 50,
    display: "flex",
    alignItems: "center",
    padding:'0 $2',
    // border: "1px solid gray",
    borderRadius: '$3',
    userSelect: "none",
    cursor: "grab",
    boxSizing: "content-box",
    background:"white",
    my:"$1",
    boxShadow: `0 2px 10px $colors$blackA7`,
  
})

const SortableItem = ({ item }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,

  } = useSortable({ id: item.id, transition: null,// milliseconds
  easing: 'cubic-bezier(0.25, 1, 0.5, 1)', });


  const {renderItem} = useContext(DndBoardContext)


  const itemStyle = {
    transform: CSS.Transform.toString(transform),

    outline:"none"
    
  };

  return (
    <div style={itemStyle} ref={setNodeRef} {...attributes} {...listeners}>
      <StyledItem>
        {renderItem(item)}
      </StyledItem>
    </div>
  );
};

export default SortableItem;
