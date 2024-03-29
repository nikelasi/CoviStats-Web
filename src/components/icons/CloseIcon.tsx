import React from "react";
import { createStyles, Style } from "../../utils/styles";

const styles: Style = createStyles({
  icon: [
    "cursor-pointer",
    "hover:scale-105",
    "active:scale-95"
  ],
  mask: [
    "fill-pink-light-fg",
    "dark:fill-dark-pink-light-fg"
  ]
});

const CloseIcon: React.FC = () => {
  return (
    <svg className={styles.icon} width="30.8" height="30.8" version="1.1" viewBox="0 0 8.1492 8.1492" xmlns="http://www.w3.org/2000/svg">
      {/* <!-- X Mask --> */}
      <path className={styles.mask} d="m4.0744 0a4.0746 4.0746 0 0 0-4.0744 4.0747 4.0746 4.0746 0 0 0 4.0746 4.0745 4.0746 4.0746 0 0 0 4.0745-4.0745 4.0746 4.0746 0 0 0-4.0745-4.0747zm-1.5145 2.2887c0.06931 0 0.13864 0.026538 0.19174 0.079614l1.323 1.323 1.323-1.323c0.10616-0.10616 0.27716-0.10617 0.38332 0 0.10617 0.10617 0.10617 0.27702 0 0.38318l-1.323 1.3232 1.323 1.323c0.10617 0.10617 0.10617 0.27701 0 0.38318-0.10616 0.10617-0.27715 0.10616-0.38332 0l-1.323-1.323-1.323 1.323c-0.10617 0.10616-0.27715 0.10616-0.38332 0-0.10617-0.10617-0.10617-0.27701 0-0.38318l1.323-1.323-1.323-1.3232c-0.10617-0.10616-0.10617-0.27701 0-0.38318 0.05308-0.053076 0.12231-0.079614 0.19158-0.079614z" fill="#ff4949"/>
    </svg>
  );
};

export default CloseIcon;