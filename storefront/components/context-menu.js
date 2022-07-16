import PropTypes from "prop-types";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { withLocale } from "../libs/router";
import window from "../libs/window";
import { useState } from "react";

function AnchorLink({ children, ...opts }) {
  return <a {...opts}>{children}</a>;
}

AnchorLink.propTypes = {
  children: PropTypes.node,
};

const anchorPaddings = {
  H2: 3,
  H3: 5,
  H4: 7,
};

export default function ContextMenu({ links = [] }) {
  const router = useRouter();
  const [hash, setHash] = useState(window.location?.hash);

  return (
    <List>
      {links.map((l, ix) => {
        if (l.href.startsWith("#")) {
          return (
            <ListItem disablePadding key={ix}>
              <ListItemButton
                component="a"
                href={l.href}
                onClick={() => {
                  setTimeout(() => setHash(window.location?.hash), 0);
                }}
                selected={hash === l.href}
                sx={{
                  "&& .MuiTouchRipple-child": (theme) => ({
                    backgroundColor: theme.palette.primary.main,
                  }),
                  pl: {
                    sm: anchorPaddings[l.el.nodeName],
                  },
                }}
              >
                <ListItemText
                  primary={l.textPrimary}
                  secondary={l.textSecondary}
                />
              </ListItemButton>
            </ListItem>
          );
        }

        const localeHref = withLocale(router.locale, l.href);

        return (
          <ListItem disablePadding key={ix}>
            <Link as={localeHref} href={localeHref} passHref>
              <ListItemButton
                component="a"
                selected={router.asPath === l.href}
                sx={{
                  "&& .MuiTouchRipple-child": (theme) => ({
                    backgroundColor: theme.palette.primary.main,
                  }),
                }}
              >
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
