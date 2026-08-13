// AI Assistant — application logic
// Sends the user's question to OpenRouter and renders the answer.

(function () {
  "use strict";

  const API_URL = "https://openrouter.ai/api/v1/chat/completions";
  const API_KEY = "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";
  const MODEL = "openai/gpt-4o-mini";

  const form = document.getElementById("chat-form");
  const input = document.getElementById("question");
  const output = document.getElementById("output");
  const submitBtn = document.getElementById("submit");

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const question = input.value.trim();
    if (!question) {
      return;
    }

    output.textContent = "thinking";
    submitBtn.disabled = true;

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [{ role: "user", content: question }],
        }),
      });

      if (!response.ok) {
        throw new Error("Request failed with status " + response.status);
      }

      const data = await response.json();
      const answer = data.choices[0].message.content;

      output.textContent = answer;
      input.value = "";
    } catch (error) {
      output.textContent = "something went wrong, try again";
    } finally {
      submitBtn.disabled = false;
    }
  });
})();
