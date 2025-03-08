document.addEventListener("DOMContentLoaded", function() {
    // Function to load a quiz question via the API
    function loadQuizQuestion() {
      fetch("quiz_api.php")
        .then(response => response.json())
        .then(data => {
          if (data.length > 0) {
            // Choose a random question from the fetched data
            const randomIndex = Math.floor(Math.random() * data.length);
            const questionData = data[randomIndex];
            displayQuizQuestion(questionData);
          } else {
            document.getElementById("quiz-question").textContent = "No quiz questions found.";
          }
        })
        .catch(error => {
          console.error("Error loading quiz question:", error);
          document.getElementById("quiz-question").textContent = "Error loading quiz question.";
        });
    }
  
    function displayQuizQuestion(questionData) {
      const quizQuestionEl = document.getElementById("quiz-question");
      const quizOptionsEl = document.getElementById("quiz-options");
      const quizContainer = document.getElementById("quiz-container");
      quizQuestionEl.textContent = questionData.question;
  
      // Clear previous options
      quizOptionsEl.innerHTML = "";
      const options = [questionData.option1, questionData.option2, questionData.option3, questionData.option4];
      options.forEach((optionText, index) => {
        const li = document.createElement("li");
        li.className = "list-group-item quiz-option";
        li.textContent = optionText;
        li.dataset.optionIndex = index + 1; // Options: 1, 2, 3, or 4
        quizOptionsEl.appendChild(li);
      });
  
      // Store correct answer for comparison
      quizContainer.dataset.correctOption = questionData.correct_option;
    }
  
    // Variables for quiz interaction
    let selectedOption = "";
    const quizOptionsEl = document.getElementById("quiz-options");
    const quizFeedback = document.getElementById("quiz-feedback");
    const quizSubmit = document.getElementById("quiz-submit");
  
    if (quizOptionsEl) {
      quizOptionsEl.addEventListener("click", function(e) {
        if (e.target && e.target.matches("li.quiz-option")) {
          // Remove 'selected' class from all options
          document.querySelectorAll("li.quiz-option").forEach(opt => opt.classList.remove("selected"));
          // Add selected class to clicked option
          e.target.classList.add("selected");
          selectedOption = e.target.dataset.optionIndex;
        }
      });
    }
  
    if (quizSubmit) {
      quizSubmit.addEventListener("click", function() {
        if (selectedOption === "") {
          quizFeedback.textContent = "Please select an answer.";
          quizFeedback.style.color = "red";
        } else {
          const correctOption = document.getElementById("quiz-container").dataset.correctOption;
          if (selectedOption === correctOption) {
            quizFeedback.textContent = "Correct! Well done.";
            quizFeedback.style.color = "green";
          } else {
            quizFeedback.textContent = "Incorrect. Try again.";
            quizFeedback.style.color = "red";
          }
        }
      });
    }
  
    loadQuizQuestion();
  });
  