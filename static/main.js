//Run sentinment analysis on input and translation.
$("#sentiment-analysis").on("click", function(e) {
  e.preventDefault();

  var sentimentRequest = {
    inputText: inputText,
    inputLanguage: inputLanguage,
    outputText: outputText,
    outputLanguage: outputLanguage
  };

  if (inputText !== "") {
    $.ajax({
      url: "/sentiment-analysis",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      dataType: "json",
      data: JSON.stringify(sentimentRequest),
      success: function(data) {
        for (var i = 0; i < data.documents.length; i++) {
          if (typeof data.documents[i] !== "undefined") {
            if (data.documents[i].id === "1") {
              document.getElementById("input-sentiment").textContent =
                data.documents[i].score;
            }
            if (data.documents[i].id === "2") {
              document.getElementById("translation-sentiment").textContent =
                data.documents[i].score;
            }
          }
        }
        for (var i = 0; i < data.errors.length; i++) {
          if (typeof data.errors[i] !== "undefined") {
            if (data.errors[i].id === "1") {
              document.getElementById("input-sentiment").textContent =
                data.errors[i].message;
            }
            if (data.errors[i].id === "2") {
              document.getElementById("translation-sentiment").textContent =
                data.errors[i].message;
            }
          }
        }
        if (
          document.getElementById("input-sentiment").textContent !== "" &&
          document.getElementById("translation-sentiment").textContent !== ""
        ) {
          document.getElementById("sentiment").style.display = "block";
        }
      }
    });
  }
});
// In the next section, you'll add code for speech synthesis here.
