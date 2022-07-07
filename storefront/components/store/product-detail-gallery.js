import styled from "@emotion/styled";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { alpha, Box } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import PropTypes from "prop-types";
import { Fragment, useState } from "react";

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

export default function ProductDetailGallery({ name, images }) {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState();

  const handleClickOpen = (image) => {
    setOpen(true);
    setSelectedImage(image);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <Dialog
        PaperProps={{
          sx: {
            height: "100vh",
            maxHeight: "100vh",
            background: alpha("#000", 0.7),
            backdropFilter: "blur(10px)",
            m: 0,
          },
        }}
        fullWidth
        maxWidth="xxl"
        onClose={handleClose}
        open={open}
      >
        <DialogTitle sx={{ justifyContent: "space-between", display: "flex" }}>
          {name}
          <IconButton onClick={handleClose} size="large">
            <CloseIcon color="primary" />
          </IconButton>
        </DialogTitle>
        <DialogContent
          onClick={handleClose}
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
                    mt: "1px",
                    width: "10%",
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
              width: "28%",
              height: "130px",
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
