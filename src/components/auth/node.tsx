import { UiNode, UiNodeInputAttributes } from "@ory/client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { isUiNodeInputAttributes, getNodeLabel } from "@ory/integrations/ui";

interface NodeProps extends React.HTMLAttributes<HTMLDivElement> {
  node: UiNode;
  loading?: boolean;
}

export function Node({ node, ...props }: NodeProps) {
  if (isUiNodeInputAttributes(node.attributes)) {
    if (node.attributes.type === "submit") {
      return <SubmitNode node={node} {...props} />;
    }

    return <InputNode node={node} {...props} />;
  }

  return null;
}

const InputNode = ({ node, loading }: NodeProps) => {
  const attributes: UiNodeInputAttributes =
    node.attributes as UiNodeInputAttributes;

  return (
    <div className="grid gap-1">
      <Label className="sr-only">{getNodeLabel(node)}</Label>
      <Input
        name={attributes.name}
        type={attributes.type}
        autoComplete={
          attributes.autocomplete || attributes.name === "identifier"
            ? "username"
            : ""
        }
        defaultValue={attributes.value}
        required={attributes.required}
        disabled={attributes.disabled || loading}
        placeholder={attributes.name}
      />
    </div>
  );
};

const SubmitNode = ({ node, loading }: NodeProps) => {
  const attributes: UiNodeInputAttributes =
    node.attributes as UiNodeInputAttributes;

  return (
    <Button
      type="submit"
      name={attributes.name}
      value={attributes.value}
      disabled={loading}
    >
      {loading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
      {getNodeLabel(node)}
    </Button>
  );
};
