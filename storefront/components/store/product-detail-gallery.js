import styled from "@emotion/styled";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { alpha, Box } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import PropTypes from "prop-types";
import { Fragment, useRef, useState } from "react";

const ImageList = styled(Box)({
  width: "100%",
  overflowX: "scroll",
  scrollbarWidth: "none",
  whiteSpace: "nowrap",
  msOverflowStyle: "none",
  "&::-webkit-scrollbar": {
    display: "none",
  },
});

const ImageListItem = styled(Box)({
  position: "relative",
  display: "inline-block",
  cursor: "zoom-in",
});

export default function ProductDetailGallery({ name, images = [] }) {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState();

  const handleClickOpen = (image) => {
    setOpen(true);
    setSelectedImage(image);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const isXs = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const arrowKeysNavigate = (e) => {
    let inc = 0;

    if (e.key === "ArrowRight") {
      inc += 1;
    } else if (e.key === "ArrowLeft") {
      inc -= 1;
    } else {
      return;
    }

    const ix = images.findIndex((i) => i.file.md5 === selectedImage?.file.md5);
    if (ix < 0) {
      return;
    }

    let newIx = ix + inc;

    if (newIx >= images.length) {
      newIx = 0;
    }
    if (newIx < 0) {
      newIx = images.length - 1;
    }

    setSelectedImage(images[newIx]);
  };

  const touchendX = useRef();
  const touchstartX = useRef();
  const swipeNavigation = (inc) => {
    const ix = images.findIndex((i) => i.file.md5 === selectedImage?.file.md5);
    if (ix < 0) {
      return;
    }

    let newIx = ix + inc;

    if (newIx >= images.length) {
      return;
    }
    if (newIx < 0) {
      return;
    }

    setSelectedImage(images[newIx]);
  };

  return (
    <Fragment>
      <Dialog
        PaperProps={{
          sx: [
            {
              height: "100vh",

              maxHeight: "100vh",
              background: alpha("#000", 0.7),
              backdropFilter: "blur(10px)",
              m: 0,
            },
            isXs && { width: "100%" },
          ],
        }}
        fullWidth
        maxWidth="xxl"
        onClose={handleClose}
        onKeyDown={arrowKeysNavigate}
        open={open}
      >
        <DialogTitle
          sx={{
            justifyContent: "space-between",
            display: "flex",
            alignItems: "center",
          }}
        >
          {name}
          <IconButton onClick={handleClose} size="large">
            <CloseIcon color="primary" />
          </IconButton>
        </DialogTitle>
        <DialogContent
          onClick={handleClose}
          onTouchEnd={(e) => {
            touchendX.current = e.changedTouches[0].screenX;
            const inc = touchendX.current < touchstartX.current ? 1 : -1;
            swipeNavigation(inc);
          }}
          onTouchStart={(e) => {
            touchstartX.current = e.changedTouches[0].screenX;
          }}
          sx={{ position: "relative", cursor: "crosshair" }}
        >
          {selectedImage && (
            <Image
              alt={`detail image of ${name}`}
              layout="fill"
              objectFit="contain"
              src={selectedImage.file.url}
            />
          )}
        </DialogContent>
        <DialogActions>
          <ImageList
            sx={{
              textAlign: "center",
              mb: 2,
              p: "1px",
            }}
          >
            {images.map((item, ix) => (
              <ImageListItem
                key={item.file.md5}
                onClick={() => setSelectedImage(item)}
                onKeyDown={(e) => e.key === "Enter" && setSelectedImage(item)}
                sx={[
                  {
                    mr: 1,
                    width: { xs: "40%", md: "10%" },
                    height: "100px",
                    cursor: "pointer",
                  },
                  selectedImage?.file.md5 === item.file.md5 && {
                    boxShadow: (theme) =>
                      "0 0 0 1px " + theme.palette.primary.main,
                  },
                ]}
                tabIndex={0}
              >
                <Image
                  alt={`${ix} image of ${name}`}
                  layout="fill"
                  objectFit="cover"
                  src={item.file.url}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </DialogActions>
      </Dialog>
      <ImageList>
        {images.map((item, ix) => (
          <ImageListItem
            key={item.file.md5}
            onClick={() => handleClickOpen(item)}
            onKeyDown={(e) => e.key === "Enter" && handleClickOpen(item)}
            sx={{
              mr: 1,
              mt: "3px",
              width: { xs: "45%", sm: "28%" },
              height: { xs: "100px", sm: "130px" },
            }}
            tabIndex={0}
          >
            <Image
              alt={`${ix} image of ${name}`}
              layout="fill"
              objectFit="cover"
              src={item.file.url}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Fragment>
  );
}

ProductDetailGallery.propTypes = {
  images: PropTypes.array,
  name: PropTypes.string,
};
