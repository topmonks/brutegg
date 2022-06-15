import PropTypes from "prop-types";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { withLocale } from "../libs/router";

export default function ContextMenu({ links = [] }) {
  const router = useRouter();

  return (
    <List>
      {links.map((l, ix) => {
        const localeHref = withLocale(router.locale, l.href);

        return (
          <ListItem disablePadding key={ix}>
            <Link as={localeHref} href={localeHref} passHref>
              <ListItemButton component="a" selected={router.asPath === l.href}>
                <ListItemText
                  primary={l.textPrimary}
                  secondary={l.textSecondary}
                />
              </ListItemButton>
            </Link>
          </ListItem>
        );
      })}
    </List>
  );
}

ContextMenu.propTypes = {
  links: PropTypes.array,
};
