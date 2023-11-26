import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import Link from "next/link";
import { ReactElement } from "react";

interface LinkHref {
  pathname: string;
  query: {
    lang: string;
  };
}

interface Props {
  name: string;
  icon: ReactElement;
  link: string | LinkHref;
}

const MenuListItem: React.FC<Props> = (props) => {
  return (
    <Link href={props.link}>
      <ListItemButton>
        <ListItemIcon>{props.icon}</ListItemIcon>
        <ListItemText primary={props.name} />
      </ListItemButton>
    </Link>
  );
};

export default MenuListItem;
