"use client";
import { useState, FormEvent } from "react";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

interface Prediction {
  status: string;
  id: string;
  detail?: string;
  output?: string[];
}

export default function Predictions() {
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch("/api/predictions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: e.currentTarget.prompt.value,
      }),
    });

    let prediction: Prediction = await response.json();
    if (response.status !== 201) {
      setError(prediction.detail || "An error occurred.");
      return;
    }

    setPrediction(prediction);

    while (
      prediction.status !== "succeeded" &&
      prediction.status !== "failed"
    ) {
      await sleep(500);
      const response = await fetch("/api/predictions/" + prediction.id);
      prediction = await response.json();
      if (response.status !== 200) {
        setError(prediction.detail || "An error occurred.");
        return;
      }
      setPrediction(prediction);
    }
  };

  return (
    <div>
      <p className="mb-5 text-2xl text-gray-900 dark:text-white">
        Dream something with{" "}
        <a href="https://replicate.com/stability-ai/stable-diffusion">SDXL</a>:
      </p>

      <form className="" onSubmit={handleSubmit}>
        <input
          className="mb-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          name="prompt"
          placeholder="Enter a prompt to display an image"
        />
        <div className="flex justify-end ">
          <button
            className=" flex-shrink-0 mb-5 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
            type="submit"
          >
            Go!
          </button>
        </div>
      </form>

      {error && <div>{error}</div>}

      {prediction && (
        <div>
          {prediction.output && (
            <div className={styles.imageWrapper}>
              <Image
                fill
                src={prediction.output[prediction.output.length - 1]}
                alt="output"
                sizes="100vw"
              />
            </div>
          )}
          <p>status: {prediction.status}</p>
        </div>
      )}
    </div>
  );
}
