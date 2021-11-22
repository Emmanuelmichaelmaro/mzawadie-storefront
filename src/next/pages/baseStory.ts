import { storiesOf } from "@storybook/react";

export const createStory = (name: string = "default") =>
    storiesOf(`@mzawadie/prototype/views/${name}`, module);
