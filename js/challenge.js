document.addEventListener("DOMContentLoaded", () => {
    let counter = 0;
    let running = true;
    let interval;

    // Select elements from the DOM
    const counterElement = document.querySelector("#counter");
    const increaseBtn = document.querySelector("#plus");
    const decreaseBtn = document.querySelector("#minus");
    const pauseButton = document.querySelector("#pause");
    const likesBtn = document.querySelector("#heart");
    const likesList = document.querySelector(".likes");
    const commentInput = document.querySelector("#comment-input");
    const submitButton = document.querySelector("#submit");
    const commentsList = document.querySelector("#list");

    // Function to start the counter (increments every second)
    function startCounter() {
        interval = setInterval(() => {
            counter++;
            counterElement.textContent = counter;
        }, 1000);
    }

    startCounter(); // Start counter when page loads

    // Function to update the displayed counter value
    function updateCounter() {
        counterElement.textContent = counter;
    }

    // Function to stop (pause) the counter
    function stopCounter() {
        clearInterval(interval);
        interval = null;
    }

    // Function to enable/disable buttons
    function toggleButtons(state) {
        increaseBtn.disabled = state;
        decreaseBtn.disabled = state;
        likesBtn.disabled = state;
        submitButton.disabled = state;
        commentInput.disabled = state; // Prevent typing comments when paused
    }

    // Increment counter when "+" button is clicked
    increaseBtn.addEventListener("click", () => {
        counter++;
        updateCounter();
    });

    // Decrement counter when "-" button is clicked
    decreaseBtn.addEventListener("click", () => {
        counter--;
        updateCounter();
    });

    // Pause/Resume button functionality
    pauseButton.addEventListener("click", () => {
        if (running) {
            stopCounter(); // Pause the counter
            pauseButton.textContent = "Resume"; // Change button text
            toggleButtons(true); // Disable buttons
        } else {
            startCounter(); // Resume counter
            pauseButton.textContent = "Pause"; // Change button text
            toggleButtons(false); // Re-enable buttons
        }
        running = !running; // Toggle running state
    });

    // "Like" the current number
    likesBtn.addEventListener("click", () => {
        let existingLike = document.querySelector(`[data-num='${counter}']`);

        if (existingLike) {
            // If number already liked, increase the like count
            let likeCount = parseInt(existingLike.dataset.count) + 1;
            existingLike.dataset.count = likeCount;
            existingLike.textContent = `${counter} has been liked ${likeCount} times`;
        } else {
            // If first time liking this number, create a new like entry
            let li = document.createElement("li");
            li.dataset.num = counter;
            li.dataset.count = 1;
            li.textContent = `${counter} has been liked 1 time`;
            likesList.appendChild(li);
        }
    });

    // Add user comments
    submitButton.addEventListener("click", () => {
        const commentText = commentInput.value.trim(); // Get text & remove extra spaces
        if (commentText !== "") {
            const commentItem = document.createElement("li"); // Create <li> for comment
            commentItem.textContent = commentText; // Set text
            commentsList.appendChild(commentItem); // Append to list
            commentInput.value = ""; // Clear input field after submission
        }
    });
});
