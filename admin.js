let pets = JSON.parse(localStorage.getItem("pets")) || [];
let requests = JSON.parse(localStorage.getItem("adoptionRequests")) || [];

function showSection(id){
  document.querySelectorAll(".section").forEach(sec=>{
    sec.classList.remove("active");
  });
  document.getElementById(id).classList.add("active");
}

/* DASHBOARD COUNTS */
function updateDashboard(){
  let pets = JSON.parse(localStorage.getItem("pets")) || [];
  let requests = JSON.parse(localStorage.getItem("adoptionRequests")) || [];

  document.getElementById("totalPets").innerText = pets.length;
  document.getElementById("totalRequests").innerText = requests.length;
}


/* PET MANAGEMENT */
function addPet(){
  let name = petName.value;
  let file = document.getElementById("petImgFile").files[0];

  if(!name || !file){
    alert("Please enter pet name and choose image");
    return;
  }
  function updateReq(i, status){
  requests[i].status = status;

  // If approved → mark pet as adopted
  if(status === "Approved"){
    let pets = JSON.parse(localStorage.getItem("pets")) || [];

    pets = pets.map(p=>{
      if(p.name === requests[i].pet){
        return { ...p, adopted: true };
      }
      return p;
    });

    localStorage.setItem("pets", JSON.stringify(pets));
  }

  localStorage.setItem("requests", JSON.stringify(requests));
  location.reload();
}


  let reader = new FileReader();
  reader.onload = function(){
    let pets = JSON.parse(localStorage.getItem("pets")) || [];
    pets.push({ name, img: reader.result });

    localStorage.setItem("pets", JSON.stringify(pets));

    petName.value = "";
    document.getElementById("petImgFile").value = "";

    displayPets();
    updateDashboard();
  };
  reader.readAsDataURL(file);
}



function displayPets(){
  let list = document.getElementById("petList");
  list.innerHTML = "";

  // ALWAYS read latest pets (index + admin)
  pets = JSON.parse(localStorage.getItem("pets")) || [];

  pets.forEach((p,i)=>{
    list.innerHTML += `
      <div>
        <img src="${p.img}">
        <h3>${p.name}</h3>
        <button onclick="deletePet(${i})">Delete</button>
      </div>`;
  });

  updateDashboard();
}


function deletePet(i){
  let pets = JSON.parse(localStorage.getItem("pets")) || [];
  pets.splice(i,1);
  localStorage.setItem("pets", JSON.stringify(pets));
  displayPets();
  updateDashboard();
}


/* ADOPTION REQUESTS */
function loadRequests(){
  let table = document.getElementById("requestTable");
  table.innerHTML="";
  requests.forEach((r,i)=>{
    table.innerHTML+=`
      <tr>
        <td>${r.petName}</td>
        <td>${r.name}</td>
        <td>${r.email}</td>
        <td>${r.status}</td>
        <td>
          <button class="approve" onclick="updateStatus(${i},'Approved')">Approve</button>
          <button class="reject" onclick="updateStatus(${i},'Rejected')">Reject</button>
          <button class="delete" onclick="deleteReq(${i})">Delete</button>
        </td>
      </tr>`;
  });
}

function updateStatus(i,status){
  requests[i].status=status;
  localStorage.setItem("adoptionRequests",JSON.stringify(requests));
  loadRequests();
}

function deleteReq(i){
  requests.splice(i,1);
  localStorage.setItem("adoptionRequests",JSON.stringify(requests));
  loadRequests();
  updateDashboard();
}

/* LOGOUT */
function logout(){
  alert("Admin logged out!");
  window.location.href="../index.html";
}


/* INIT */
displayPets();
loadRequests();
updateDashboard();
