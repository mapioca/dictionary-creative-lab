document.getElementById("wordSubmit").addEventListener("click", function(event) {
    event.preventDefault();
    const value = document.getElementById("wordInput").value;
    if (value === "")
      return;
    console.log(value);

    // Capitalization function
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }


    // API
    const url = "https://wordsapiv1.p.rapidapi.com/words/" + value;
    const fetchPromise = fetch(url, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
            "x-rapidapi-key": "706b72f4a2msh21757ca043dddf3p1e934ajsn05d2f735763f"
        }
    });
    fetchPromise.then(response => {
        // convert json object to javaScript object
        return response.json();
    }).then(body => {
        // print javaScript object to console
        console.log(body);

        // object containing everything to print out
        let wordResults = "";
        let wordTitle = "";

        // pronunciaton
        let pronunciation = body.pronunciation;
        console.log(pronunciation);

        // syllables
        let syllablesArray = body.syllables;
        console.log(syllablesArray);
        let syllables = '';

        if(syllablesArray.count > 1) {
            let i = 0;
            for(let element of syllablesArray.list) {
                if(i === syllablesArray.count - 1) {
                    syllables += element;
                } else {
                    syllables += element + "&#183";
                    i++;
                }
            }
        }

        // the word to define
        var word = body.word;
        console.log(word);
        wordTitle += "<h2>" + word + ": </h2>";
        wordTitle += "<p class='wordTitleExtra'> [" + pronunciation.all + "]   " + syllables + "</p>"
        wordTitle += "<hr class='separator'></hr>";

        // the several word definitions
        let results = body.results;
        console.log(results);

        // wordGroups
        let verbGroup ="<div class='wordGroup'>";
        verbGroup += "<p class='partOfSpeech'>verb</p>";
        verbGroup += "<div class='definitionItem'>";

        let nounGroup = "<div class='wordGroup'>";
        nounGroup += "<p class='partOfSpeech'>noun</p>";
        nounGroup += "<div class='definitionItem'>";

        let adjectiveGroup = "<div class='wordGroup'>";
        adjectiveGroup += "<p class='partOfSpeech'>adjective</p>";
        adjectiveGroup += "<div class='definitionItem'>";

        // group by partOfSpeech type
        let verbCount = 1;
        let nounCount = 1;
        let adjectiveCount = 1;

        // groups found
        let verbsFound = false; 
        let nounsFound = false;
        let adjectivesFound = false;

        for(let element of results) {
            console.log(element);
            if(element.partOfSpeech === "verb") {
                verbGroup += "<p class='definitionText'>" + verbCount + ") " + element.definition + "</p>";
                verbsFound = true;
                verbCount++;
            }
            if(element.partOfSpeech === "noun") {
                nounGroup += "<p class='definitionText'>" + nounCount + ") " + element.definition + "</p>";
                nounsFound = true;
                nounCount++;
            }
            if(element.partOfSpeech === "adjective") {
                adjectiveGroup += "<p class='definitionText'>" + adjectiveCount + ") " + element.definition + "</p>";
                adjectivesFound = true;
                adjectiveCount++;
            }
        }

        verbGroup += "</div>";
        verbGroup += "</div>";

        nounGroup += "</div>";
        nounGroup += "</div>";

        adjectiveGroup += "</div>";
        adjectiveGroup += "</div>";

        // update wordResults
        if(verbsFound) {
            wordResults += verbGroup;
        }
        if(nounsFound) {
            wordResults += nounGroup;
        }
        if(adjectivesFound) {
            wordResults += adjectiveGroup;
        }

        wordResults += "<div id='endingDiv'></div>";


        // update innerHTML
        document.getElementById('wordTitle').innerHTML = wordTitle;
        document.getElementById('wordResults').innerHTML = wordResults;
    })

        });