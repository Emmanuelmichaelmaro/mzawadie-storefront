import { storiesOf } from "@storybook/react";
import React from "react";

import { RichTextEditorContent, RichTextEditorContentProps } from "./RichTextEditorContent";
import * as fixtures from "./fixtures";

const props: RichTextEditorContentProps = {
    jsonData: fixtures.jsonData,
};

storiesOf("@mzawadie/ui-kit/atoms/RichTextEditorContent", module)
    .addParameters({ component: RichTextEditorContent })
    .add("default", () => <RichTextEditorContent {...props} />);
