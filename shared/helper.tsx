import { createClient } from "contentful";
import { FieldsProps } from "./const";

export const getContent = async (page: string) => {
  const space = process.env.CONTENTFUL_SPACE_ID;
  const token = process.env.CONTENTFUL_ACCESS_TOKEN;
  if (space === undefined || token === undefined) {
    return { props: { content: [] } };
  }
  const client = createClient({ space: space, accessToken: token });
  const entry = await client.getEntries({ content_type: page });
  const fields = entry.items[0].fields as FieldsProps;
  const content = fields.content.content;
  return { props: { content: content } };
};
