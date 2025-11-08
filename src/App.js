import React, { useState } from "react";
import { FeedbackOptions } from "./components/FeedbackOptions";
import { Statistics } from "./components/Statistics";
import { Section } from "./components/Section";
import { Notification } from "./components/Notification";

export const App = () => {
  const [state, setState] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  // Обробник кліку по кнопці
  const handleFeedback = (type) => {
    setState((prevState) => ({
      ...prevState,
      [type]: prevState[type] + 1,
    }));
  };

  // Обчислення загальної кількості
  const countTotalFeedback = () => {
    return state.good + state.neutral + state.bad;
  };

  // Обчислення відсотка позитивних
  const countPositiveFeedbackPercentage = () => {
    const total = countTotalFeedback();
    return total ? Math.round((state.good / total) * 100) : 0;
  };

  const total = countTotalFeedback();
  const positivePercentage = countPositiveFeedbackPercentage();

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={["good", "neutral", "bad"]}
          onLeaveFeedback={handleFeedback}
        />
      </Section>

      <Section title="Statistics">
        {total > 0 ? (
          <Statistics
            good={state.good}
            neutral={state.neutral}
            bad={state.bad}
            total={total}
            positivePercentage={positivePercentage}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </div>
  );
};
