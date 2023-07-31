"use client";
import { type ColumnDef } from "@tanstack/react-table";

export type Model = {
  name: string;
  description: string;
  useCase: string;
  dockerTag: string;
};

export const columns: ColumnDef<Model>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "use_case",
    header: "Usage",
  },
  {
    accessorKey: "docker_tag",
    header: "Docker Tag",
  },
];
