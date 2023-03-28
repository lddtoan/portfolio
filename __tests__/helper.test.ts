import { getContent } from "../shared/helper";

test("get about page content", () => {
  expect(getContent("about")).not.toEqual({ props: { content: [] } });
});

test("get work page content", () => {
  expect(getContent("work")).not.toEqual({ props: { content: [] } });
});

test("get contact page content", () => {
  expect(getContent("contact")).not.toEqual({ props: { content: [] } });
});
