function predictPerformance(){
    const scoreInput = document.getElementById("score").value;
    if(scoreInput === ""){ document.getElementById("result").innerText = "Please enter a score."; return; }
    if(!/^\d+$/.test(scoreInput)){ document.getElementById("result").innerText = "Only numbers allowed."; return; }
    const score = parseInt(scoreInput);
    if(score < 0 || score > 100){ document.getElementById("result").innerText = "Score must be between 0 and 100."; return; }
    let prediction = "";
    if(score >= 75) prediction = "High Probability of Distinction";
    else if(score >= 50) prediction = "Likely to Pass";
    else prediction = "At Risk - Needs Academic Support";
    document.getElementById("result").innerText = prediction;
}