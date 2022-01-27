import cuid from 'cuid';
import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemIcon,
  TextField,
} from '@mui/material';
import { Close as DeleteIcon, DragIndicator } from '@mui/icons-material';

export interface ToDo {
  id: string;
  text: string;
  done: boolean;
  isChild: boolean;
}

export interface ToDoItemProps {
  item: ToDo;
  setItems: React.Dispatch<React.SetStateAction<ToDo[]>>;
}

const ToDoItem: React.FC<ToDoItemProps> = ({ item, setItems }) => {
  return (
    <ListItem
      key={item.id}
      sx={[
        {
          '&:hover': {
            '& .dragIndicator, .deleteButton': {
              visibility: 'visible',
            },
          },
        },
        item.isChild && {
          pl: 6,
        },
      ]}
      secondaryAction={
        <IconButton
          className="deleteButton"
          sx={{ visibility: 'hidden' }}
          onClick={() => {
            setItems((items) => items.filter((x) => x.id !== item.id));
          }}
        >
          <DeleteIcon />
        </IconButton>
      }
    >
      <DragIndicator className="dragIndicator" sx={{ visibility: 'hidden' }} />
      <ListItemIcon>
        <Checkbox
          disableRipple
          checked={item.done}
          onChange={(ev) => {
            setItems((items) =>
              items.map((x) =>
                x.id === item.id ? { ...x, done: ev.target.checked } : x
              )
            );
          }}
        />
      </ListItemIcon>
      <TextField
        variant="standard"
        InputProps={{
          disableUnderline: true,
          inputProps: {
            sx: [item.done && { textDecoration: 'line-through' }],
          },
        }}
        fullWidth
        autoFocus={item.text.length === 0 || item.text.length === 1}
        value={item.text}
        onChange={(ev) => {
          setItems((items) =>
            items.map((x) =>
              x.id === item.id ? { ...x, text: ev.target.value } : x
            )
          );
        }}
        onKeyDown={(ev) => {
          if (ev.key === 'Enter') {
            ev.preventDefault();
            setItems((items) => {
              const i = items.findIndex((x) => x.id === item.id);
              const newItems = [...items];
              newItems.splice(i + 1, 0, {
                id: cuid(),
                text: '',
                done: false,
                isChild: false,
              });
              return newItems;
            });
          } else if (ev.key === 'Backspace' && item.text.length === 0) {
            ev.preventDefault();
            setItems((items) => items.filter((x) => x.id !== item.id));
          } else if (ev.key === 'Tab') {
            ev.preventDefault();
            setItems((items) =>
              items.map((x) => (x.id === item.id ? { ...x, isChild: true } : x))
            );
          }
        }}
      />
    </ListItem>
  );
};

export default ToDoItem;
