import { config } from "dotenv";
import { getContent } from "../shared/helper";

config({ path: ".env.local" });

test("get about page content", async () => {
  const response = await getContent("about");
  expect(response).not.toEqual({ props: { content: [] } });
});

test("get work page content", async () => {
  const response = await getContent("work");
  expect(response).not.toEqual({ props: { content: [] } });
});

test("get contact page content", async () => {
  const response = await getContent("contact");
  expect(response).not.toEqual({ props: { content: [] } });
});
