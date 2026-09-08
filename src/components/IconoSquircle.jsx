import { Box } from "@mui/material";

function IconoSquircle({
  color,
  colorOscuro,
  children,
  size = { xs: 60, md: 64 },
  sx,
}) {
  return (
    <Box
      sx={{
        width: size,
        height: size,
        borderRadius: 2,
        background: `linear-gradient(135deg, ${color} 0%, ${colorOscuro} 100%)`,
        color: "common.white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        boxShadow: `0 10px 18px -10px ${colorOscuro}`,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

export default IconoSquircle;
