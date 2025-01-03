"use client";
import {
  createSvgIcon,
  Stack,
  StackProps,
  SxProps,
  Theme,
} from "@mui/material";

export const LogoHorizontalText = createSvgIcon(
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 504 101"
    fill="none"
  >
    <path
      fill="currentColor"
      d="M498.077.426h5.925v97.785h-5.925V.426Zm-17.283 0h5.925v97.785h-5.925V.426ZM442.452.426v61.93c0 5.85-1.029 10.615-3.086 14.292-1.976 3.677-4.692 6.394-8.148 8.149-3.374 1.755-7.243 2.632-11.605 2.632-6.584 0-11.933-1.964-16.048-5.892-4.115-4.012-6.173-10.405-6.173-19.18V.426h5.926v61.93c0 6.602 1.481 11.45 4.444 14.542 2.963 3.008 6.913 4.513 11.851 4.513 4.856 0 8.889-1.505 12.099-4.513 3.209-3.093 4.814-7.94 4.814-14.543V.426h5.926Zm16.172 0v63.936c0 7.271-1.687 13.623-5.062 19.056-3.374 5.432-7.983 9.694-13.826 12.787-5.843 3.009-12.551 4.513-20.123 4.513-7.736 0-14.567-1.504-20.492-4.513-5.844-3.093-10.411-7.355-13.703-12.787-3.292-5.516-4.939-11.868-4.939-19.056V.426h5.926v63.936c0 6.018 1.399 11.325 4.197 15.922 2.799 4.596 6.708 8.19 11.728 10.78 5.021 2.508 10.782 3.762 17.283 3.762 6.338 0 11.975-1.254 16.913-3.761 5.021-2.507 8.971-6.06 11.852-10.656 2.88-4.597 4.32-9.946 4.32-16.047V.426h5.926ZM310.638 100.722c-1.26 0-1.891-.627-1.891-1.881V78.827c0-.602.025-1.078.076-1.43.101-.4.403-.752.908-1.053l16.718-9.18v-5.417l-16.492-8.878c-.806-.451-1.21-1.204-1.21-2.257V17.807c0-.803.051-1.38.151-1.73.101-.402.454-.828 1.059-1.28l19.972-13.393a6.382 6.382 0 0 1 1.286-.677c.453-.2 1.033-.3 1.739-.3h25.645c1.261 0 1.891.626 1.891 1.88v20.616c0 1.104-.378 1.856-1.134 2.258l-19.82 8.577V39.4l19.82 11.286c.756.351 1.134 1.154 1.134 2.408v32.73c0 .4-.075.827-.227 1.278-.1.402-.353.728-.756.979l-23.754 11.737c-.302.201-.68.401-1.134.602a2.695 2.695 0 0 1-1.211.301h-22.77ZM278.737 100.722c-1.26 0-2.269-.326-3.026-.978l-9.077-8.879-13.995-14.52c-.555-.603-.908-1.054-1.059-1.355-.101-.301-.152-.828-.152-1.58V27.739c0-.803.076-1.355.227-1.656.152-.3.48-.727.984-1.279l11.423-12.038 11.649-11.362c.505-.451.959-.727 1.362-.827.454-.1 1.009-.15 1.664-.15h20.804c1.26 0 1.891.626 1.891 1.88V21.57c0 .451-.051.878-.151 1.279-.051.351-.303.727-.757 1.129l-10.666 9.78-8.17 8.654v17.38l9.002 9.48 9.834 8.879c.403.351.656.727.757 1.128.1.402.151.803.151 1.204v18.359c0 1.254-.631 1.881-1.891 1.881h-20.804ZM214.535 100.722c-1.261 0-1.891-.627-1.891-1.881V2.307c0-1.254.63-1.88 1.891-1.88h26.628c1.261 0 1.891.626 1.891 1.88v96.534c0 1.254-.63 1.881-1.891 1.881h-26.628ZM137.19 100.722c-1.261 0-1.891-.627-1.891-1.881V2.307c0-1.254.63-1.88 1.891-1.88h47.658c1.16 0 2.169.4 3.026 1.203l15.13 15.048c.806.853 1.21 1.856 1.21 3.01v15.8c0 .502-.101.903-.303 1.204-.201.301-.504.652-.907 1.054l-11.877 10.533-1.286 2.182 1.286 2.634 11.877 10.533c.403.402.706.753.907 1.054.202.25.303.652.303 1.204v15.5c0 1.203-.404 2.206-1.21 3.009l-15.13 15.048c-.857.853-1.866 1.279-3.026 1.279H137.19Zm32.301-23.625c2.421 0 4.287-.653 5.598-1.957 1.362-1.354 2.043-3.26 2.043-5.718 0-2.508-.681-4.44-2.043-5.794-1.311-1.354-3.177-2.031-5.598-2.031-2.37 0-4.236.677-5.598 2.031-1.361 1.355-2.042 3.286-2.042 5.794 0 2.458.681 4.364 2.042 5.718 1.362 1.304 3.228 1.957 5.598 1.957Zm-.302-37.922c2.32 0 4.11-.652 5.371-1.956 1.311-1.304 1.967-3.135 1.967-5.493 0-2.357-.656-4.188-1.967-5.492-1.261-1.304-3.051-1.956-5.371-1.956-2.27 0-4.06.652-5.371 1.956-1.311 1.304-1.967 3.135-1.967 5.492 0 2.358.656 4.189 1.967 5.493 1.311 1.304 3.101 1.956 5.371 1.956ZM77.834 100.722c-1.21 0-2.22-.426-3.026-1.28l-15.13-15.047c-.857-.803-1.286-1.806-1.286-3.01V2.307c0-1.254.63-1.88 1.891-1.88h26.628c1.261 0 1.891.626 1.891 1.88v67.19c0 1.906.959 2.86 2.875 2.86h4.766V2.306c0-1.254.63-1.88 1.891-1.88h26.628c1.261 0 1.891.626 1.891 1.88v96.534c0 1.254-.63 1.881-1.891 1.881H77.833ZM28.004 100.722c-1.26 0-2.27-.326-3.026-.978l-9.077-8.879-13.995-14.52C1.35 75.741.998 75.29.846 74.99c-.1-.301-.15-.828-.15-1.58V27.739c0-.803.075-1.355.226-1.656.152-.3.48-.727.984-1.279l11.422-12.038 11.65-11.362c.505-.451.958-.727 1.362-.827.454-.1 1.009-.15 1.664-.15h20.803c1.261 0 1.892.626 1.892 1.88V21.57c0 .451-.05.878-.152 1.279-.05.351-.302.727-.756 1.129l-10.666 9.78-8.17 8.654v17.38l9.002 9.48 9.834 8.879c.403.351.656.727.756 1.128.101.402.152.803.152 1.204v18.359c0 1.254-.63 1.881-1.892 1.881H28.004Z"
    />
  </svg>,
  "LogoHorizontalText"
);
export const LogoHorizontalFavicon = createSvgIcon(
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 101 101"
    fill="none"
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M64.443 100.719h21.745c2.022 0 3.948-.407 5.7-1.144 5.256-2.212 8.944-7.388 8.944-13.421V14.992c0-8.045-6.556-14.566-14.644-14.566H14.64C6.553.426-.004 6.947-.004 14.992v71.162c0 8.044 6.557 14.565 14.644 14.565h49.803ZM86.188 9.166H14.64c-3.235 0-5.857 2.608-5.857 5.826v71.162c0 3.218 2.622 5.826 5.857 5.826h28.948a10.029 10.029 0 0 1-.078-1.249v-32.46c0-8.044 6.557-14.565 14.645-14.565h28.033c2.083 0 4.064.433 5.858 1.212V14.992c0-3.218-2.623-5.826-5.858-5.826ZM52.297 79.912v6.242c0 3.211 2.612 5.816 5.839 5.826h6.304a1.252 1.252 0 0 0 1.246-1.249v-10.82c0-.689-.562-1.248-1.255-1.248H53.552c-.693 0-1.255.56-1.255 1.249ZM74.395 91.98c.051-.409.078-.826.078-1.249v-10.82c0-5.516-4.496-9.987-10.042-9.987H53.552c-.425 0-.844.026-1.255.077v-11.73c0-3.217 2.623-5.825 5.858-5.825h28.033c3.224 0 5.84 2.59 5.858 5.793v27.915c0 2.815-2.008 5.164-4.678 5.708a5.915 5.915 0 0 1-1.18.118H74.395Z"
      clipRule="evenodd"
    />
  </svg>,
  "LogoHorizontalFavicon"
);

export function LogoHorizontal(props: { shorten?: boolean } & StackProps) {
  const { shorten, children, color, width, ...rest } = props;

  const commonSx: SxProps = {
    fontSize: "1.5rem",
    flexGrow: 0,
    flexShrink: 0,
    transition: "flex-basis 0.3s var(--transition-tf)",
  };
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"center"}
      width={width}
      color={color}
      gap={1}
      {...rest}
    >
      <LogoHorizontalFavicon
        sx={{
          ...commonSx,
          flexBasis: shorten ? "100%" : "13%",
        }}
      />
      <LogoHorizontalText
        sx={{
          ...commonSx,
          flexBasis: shorten ? "0%" : "60%",
          opacity: shorten ? 0 : 1,
        }}
      />
    </Stack>
  );
}
