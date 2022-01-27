import cuid from 'cuid';
import React, { useRef, useState } from 'react';
// import { DragDropContext } from 'react-beautiful-dnd';
import {
  Collapse,
  IconButton,
  List,
  TextField,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Divider,
} from '@mui/material';
import {
  Add as AddIcon,
  ChevronRight,
  DragIndicator,
  ExpandMore,
} from '@mui/icons-material';
import ToDoItem, { ToDo } from './ToDoItem';

interface ToDoListProps {}

const ToDoList: React.FC<ToDoListProps> = () => {
  const [items, setItems] = useState<ToDo[]>([]);
  const [showDone, setShowDone] = useState(true);
  const newItemRef = useRef<HTMLInputElement>();

  const toDoItems = items
    .filter(({ done }) => !done)
    .map((item) => <ToDoItem key={item.id} item={item} setItems={setItems} />);

  const doneItems = items
    .filter(({ done }) => done)
    .map((item) => <ToDoItem key={item.id} item={item} setItems={setItems} />);

  const newItem = (
    <ListItem>
      <DragIndicator sx={{ visibility: 'hidden' }} />
      <ListItemIcon>
        <IconButton>
          <AddIcon />
        </IconButton>
      </ListItemIcon>
      <TextField
        variant="standard"
        inputRef={newItemRef}
        InputProps={{ disableUnderline: true }}
        fullWidth
        placeholder="List item"
        onChange={(ev) => {
          const { value: text } = ev.target;
          if (newItemRef.current) {
            newItemRef.current.value = '';
          }
          setItems((items) => [
            ...items,
            { id: cuid(), text, done: false, isChild: false },
          ]);
        }}
      />
    </ListItem>
  );

  return (
    <List dense>
      {toDoItems}
      {newItem}
      {doneItems.length > 0 && (
        <>
          <Divider />
          <ListItem>
            <DragIndicator sx={{ visibility: 'hidden' }} />
            <ListItemButton
              disableGutters
              onClick={() => setShowDone((showDone) => !showDone)}
            >
              <ListItemIcon>
                <IconButton>
                  {showDone ? <ExpandMore /> : <ChevronRight />}
                </IconButton>
              </ListItemIcon>
              {`${doneItems.length} Completed ${
                doneItems.length > 1 ? 'items' : 'item'
              }`}
            </ListItemButton>
          </ListItem>
          <Collapse in={showDone}>{doneItems}</Collapse>
        </>
      )}
    </List>
  );
};

export default ToDoList;
