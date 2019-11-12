window.onload = function () {
  let pilotName = document.querySelector("input[name=pilotName]");
  let coPilot = document.querySelector("input[name=copilotName]");
  let fuel = document.querySelector("input[name=fuelLevel]");
  let cargo = document.querySelector("input[name=cargoMass]");
  let form = document.querySelector("form");

  form.addEventListener("submit", function (event) {
    if (pilotName.value === "" || coPilot.value === "" || fuel.value === "" || cargo.value === "") {
      alert("All fields are required!");
    }
    event.preventDefault();

    if (isNaN(fuel.value) || isNaN(cargo.value) || !isNaN(pilotName.value) || !isNaN(coPilot.value)) {
      alert("Invalid data!");
    }

    if (fuel.value < 10000 && fuel.value !== "") {
      document.getElementById("pilotStatus").innerHTML = `Pilot ${pilotName.value} Ready`;
      document.getElementById("copilotStatus").innerHTML = `Co-Pilot ${coPilot.value} Ready`;
      document.getElementById("faultyItems").style.visibility = "visible";
      document.getElementById("fuelStatus").innerHTML = `Fuel level: ${fuel.value} L is not enough for launch!`;
      document.getElementById("launchStatus").innerHTML = "Shuttle not ready for launch";
      document.getElementById("launchStatus").style.color = "red";
    } else if (cargo.value > 10000) {
      document.getElementById("pilotStatus").innerHTML = `Pilot ${pilotName.value} Ready`;
      document.getElementById("copilotStatus").innerHTML = `Co-Pilot ${coPilot.value} Ready`;
      document.getElementById("faultyItems").style.visibility = "visible";
      document.getElementById("cargoStatus").innerHTML = `Cargo mass: ${cargo.value} kg is too much for launch!`;
      document.getElementById("launchStatus").innerHTML = "Shuttle not ready for launch";
      document.getElementById("launchStatus").style.color = "red";
    } else if (pilotName.value !== "" && coPilot.value !== "" && fuel.value !== "" && cargo.value !== "") {
      document.getElementById("launchStatus").innerHTML = "Shuttle is ready for launch.";
      document.getElementById("launchStatus").style.color = "green";
    }
  });

  fetch("https://handlers.education.launchcode.org/static/planets.json").then(function (response) {
    response.json().then(function (json) {
      const missionTarget = document.getElementById("missionTarget");
      let index= Math.floor(Math.random()*7);
      missionTarget.innerHTML = `
<div>
        <h2>Mission Destination</h2>
        <ol>
            <li>Name: ${json[index].name}</li>
            <li>Diameter: ${json[index].diameter}</li>
            <li>Star: ${json[index].star}</li>
            <li>Distance from Earth: ${json[index].distance}</li>
            <li>Number of Moons: ${json[index].moons}</li>
        </ol>
        <img src="${json[index].image}">
    </div>`
    });
  });
}


