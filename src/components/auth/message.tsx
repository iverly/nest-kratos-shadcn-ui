import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { UiText } from "@ory/client";

interface MessageProps extends React.HTMLAttributes<HTMLDivElement> {
  text: UiText;
}

export function Message({ text }: MessageProps) {
  if (text.type === "error") {
    return <Error text={text} />;
  }

  return null;
}

const Error = ({ text }: MessageProps) => {
  return (
    <Alert variant="destructive">
      <ExclamationTriangleIcon className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{text.text}</AlertDescription>
    </Alert>
  );
};
