
document.getElementById("dictionarySubmit").addEventListener("click", function(event) {
    event.preventDefault();
    const value = document.getElementById("dictionaryInput").value;
    if (value === "")
      return;
    console.log(value);
});