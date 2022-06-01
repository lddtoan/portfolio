import { ReactNode } from "react";

export const routes = [
  { name: "about", url: "/about", title: "About Me", icon: "lni lni-user" },
  {
    name: "work",
    url: "/work",
    title: "Where I've Worked",
    icon: "lni lni-pulse",
  },
  {
    name: "contact",
    url: "/contact",
    title: "Get in Touch",
    icon: "lni lni-envelope",
  },
];

export interface PageProps {
  display: boolean;
  content?: Array<{
    data: any;
    content: Array<{
      data?: { uri: string };
      content?: Array<any>;
      nodeType: string;
      value?: string;
    }>;
    nodeType: string;
  }>;
}

export interface FieldsProps {
  content: {
    content: Array<{
      data: any;
      content: Array<{
        data?: { uri: string };
        content?: Array<any>;
        nodeType: string;
        value?: string;
      }>;
      nodeType: string;
    }>;
  };
}
