import { Fab } from "@mui/material";
import CompareIcon from "@mui/icons-material/Compare";

interface CompareButtonProps {
  display: boolean;
  disabled: boolean;
  onClick: () => void;
}

export const CompareButton: React.FC<CompareButtonProps> = ({
  display,
  disabled,
  onClick
}) =>
  display && (
    <Fab
      variant="extended"
      color="primary"
      disabled={disabled}
      onClick={onClick}
      sx={{
        position: "fixed",
        bottom: 46,
        right: 50,
      }}
    >
      <CompareIcon sx={{ mr: 1 }} />
      Compare
    </Fab>
  );
