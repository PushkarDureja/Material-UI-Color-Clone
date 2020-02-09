export default {
  down(size) {
    var sizes = {
      xs: "@media (max-width:575.98px)",
      sm: "@media (max-width:767.98px)",
      md: "@media (max-width:991.98px)",
      lg: "@media (max-width:1199.98px)"
    };
    return sizes[size];
  }
};
