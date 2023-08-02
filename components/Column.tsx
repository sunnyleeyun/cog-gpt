"use client";
import { type ColumnDef } from "@tanstack/react-table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Predictions from "@/pages/Predictions";

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
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
      return (
        <Popover>
          <PopoverTrigger>Tryout</PopoverTrigger>
          <PopoverContent className="w-96">
            <Predictions />
          </PopoverContent>
        </Popover>
      );
    },
  },
];
