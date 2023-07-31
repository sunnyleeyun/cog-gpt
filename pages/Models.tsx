"use client";
import { useState } from "react";
import ModelTable from "@/components/ModelTable";
import { Model, columns } from "@/components/Column";

interface Models {
  count: number;
  result: Model[];
}

export default function Models() {
  const [models, setModels] = useState<Models | null>(null);

  const getModels = async () => {
    const response = await fetch("/api/models");
    let models = await response.json();
    if (response.status !== 200) {
      return;
    }
    console.log(models);
    setModels(models);
  };

  if (!models) {
    getModels();
    return <></>;
  }

  return (
    <div className="w-3/4 mt-20">
      <ModelTable columns={columns} data={models.result} />
    </div>
  );
}
