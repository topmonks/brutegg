import PropTypes from "prop-types";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useCallback, useEffect } from "react";
import { style } from "../double-border-box";
import { ProductPropTypes } from "../../types/swell";
import { useRecoilState } from "recoil";
import { productOptionsState, productVariantState } from "../../state/product";

export default function ProductVariantSelect({
  FormControlOpts,
  options,
  product,
}) {
  const [productOptions, setProductOptions] = useRecoilState(
    productOptionsState(product.id)
  );
  const [, setProductVariant] = useRecoilState(productVariantState(product.id));

  const handleChange = useCallback(
    (event) => {
      const optionId = event.target.value;
      setProductOptions((o) => ({ ...o, [options.name]: optionId }));
      const variant = product.variants.results.find((v) =>
        v.option_value_ids.includes(optionId)
      );

      setProductVariant(variant);
    },
    [product, setProductVariant, options, setProductOptions]
  );

  useEffect(() => {
    if (productOptions?.[options.name]) {
      return;
    }

    handleChange({ target: { value: options.values[0].id } });
  }, [options, productOptions, handleChange]);

  return (
    <FormControl fullWidth size="small" {...FormControlOpts}>
      <InputLabel id={options.id}>{options.name}</InputLabel>
      <Select
        MenuProps={{
          disableScrollLock: true,
          PaperProps: {
            sx: {
              borderRadius: 0,
              background: "black",
              "& .MuiList-root": {
                ...style,
                padding: "1px",
              },
            },
          },
        }}
        id="demo-simple-select"
        label={options.name}
        labelId={options.id}
        onChange={handleChange}
        value={productOptions?.[options.name]}
      >
        {options.values.map((v, ix) => (
          <MenuItem key={ix} value={v.id}>
            {v.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

ProductVariantSelect.propTypes = {
  FormControlOpts: PropTypes.object,
  options: PropTypes.object,
  product: ProductPropTypes,
};
