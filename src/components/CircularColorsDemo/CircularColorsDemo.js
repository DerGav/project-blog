"use client";

import React from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
import { Play, Pause, RotateCcw } from "react-feather";

import Card from "@/components/Card";
import VisuallyHidden from "@/components/VisuallyHidden";

import styles from "./CircularColorsDemo.module.css";

const COLORS = [
  { label: "red", value: "hsl(348deg 100% 60%)" },
  { label: "yellow", value: "hsl(50deg 100% 55%)" },
  { label: "blue", value: "hsl(235deg 100% 65%)" },
];

function CircularColorsDemo() {
  const id = React.useId();
  const [playing, setPlaying] = React.useState(false);
  const [timeElapsed, setTimeElapsed] = React.useState(0);

  // incremenent value every second
  React.useEffect(() => {
    const intervalId = window.setInterval(() => {
      console.log("tick");
      if (playing) {
        setTimeElapsed((prevTime) => prevTime + 1);
      }
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [playing]);

  const selectedColor = COLORS[timeElapsed % COLORS.length];

  const resetTimer = () => {
    setTimeElapsed(0);
    setPlaying(false);
  };

  return (
    <Card as="section" className={styles.wrapper}>
      <ul className={styles.colorsWrapper}>
        {COLORS.map((color, index) => {
          const isSelected = color.value === selectedColor.value;

          return (
            <li className={styles.color} key={index}>
              {isSelected && (
                <motion.div
                  className={styles.selectedColorOutline}
                  layoutId={`selected-color-outline-${id}`}
                />
              )}
              <div
                className={clsx(
                  styles.colorBox,
                  isSelected && styles.selectedColorBox
                )}
                style={{
                  backgroundColor: color.value,
                }}
              >
                <VisuallyHidden>{color.label}</VisuallyHidden>
              </div>
            </li>
          );
        })}
      </ul>

      <div className={styles.timeWrapper}>
        <dl className={styles.timeDisplay}>
          <dt>Time Elapsed</dt>
          <dd>{timeElapsed}</dd>
        </dl>
        <div className={styles.actions}>
          {playing ? (
            <button onClick={() => setPlaying(false)}>
              <Pause />
              <VisuallyHidden>Pause</VisuallyHidden>
            </button>
          ) : (
            <button
              onClick={() => {
                setPlaying(true);
                setTimeElapsed(timeElapsed + 1);
              }}
            >
              <Play />
              <VisuallyHidden>Play</VisuallyHidden>
            </button>
          )}
          <button onClick={resetTimer}>
            <RotateCcw />
            <VisuallyHidden>Reset</VisuallyHidden>
          </button>
        </div>
      </div>
    </Card>
  );
}

export default CircularColorsDemo;
