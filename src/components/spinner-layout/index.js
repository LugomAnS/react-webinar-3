import { memo } from "react";
import './style.css';

function SpinnerLayout() {
  return (
    <div className="SpinnerLayout">
      <div className="SpinnerLayout-spinner"></div>
    </div>
  );
}

export default memo(SpinnerLayout);