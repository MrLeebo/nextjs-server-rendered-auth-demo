import { memo } from "react";

type Props = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  buttonStyle?: "primary" | "default" | "link";
};

function Button(props: Props) {
  const { buttonStyle, ...rest } = props;

  let className;
  switch (
    buttonStyle ??
    (!rest.type ? "primary" : rest.type === "submit" ? "primary" : "default")
  ) {
    case "link": {
      className = "text-blue-500 hover:text-blue-700 underline";
      break;
    }
    case "primary": {
      className =
        "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";
      break;
    }
    default: {
      className =
        "bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded";
    }
  }

  return <button className={className} {...rest} />;
}

export default memo(Button);
