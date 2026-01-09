/* ---------- USER REGISTER ---------- */
function registerUser() {
  const user = {
    name: rname.value,
    email: remail.value,
    phone: rphone.value,
    password: rpassword.value,
  };
  localStorage.setItem("user", JSON.stringify(user));
  alert("Registration Successful");
  location.href = "login.html";
}

/* ---------- USER LOGIN ---------- */
function loginUser() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (
    user &&
    lemail.value === user.email &&
    lpassword.value === user.password
  ) {
    localStorage.setItem("login", "true");
    location.href = "dashboard.html";
  } else {
    alert("Invalid credentials");
  }
}

/* ---------- ADMIN LOGIN ---------- */
function adminLogin() {
  if (adminid.value === "admin" && adminpass.value === "admin123") {
    localStorage.setItem("admin", "true");
    location.href = "admin.html";
  } else {
    alert("Invalid Admin Credentials");
  }
}

/* ---------- ADOPT PET ---------- */
function adoptPet(pet) {
  const request = {
    petName: pet,
    status: "Pending",
  };
  localStorage.setItem("adoptionRequest", JSON.stringify(request));
  location.href = "adopt.html";
}

/* ---------- SUBMIT REQUEST ---------- */
function submitAdoption() {
  alert("Adoption Request Submitted");
  location.href = "dashboard.html";
}

/* ---------- ADMIN ACTION ---------- */
function updateStatus(status) {
  const request = JSON.parse(localStorage.getItem("adoptionRequest"));
  request.status = status;
  localStorage.setItem("adoptionRequest", JSON.stringify(request));
  alert("Request " + status);
  location.reload();
}
/* ---------- LOGOUT (USER & ADMIN) ---------- */
function logoutUser() {
  localStorage.removeItem("login");
  alert("Logged out successfully");
  location.href = "login.html";
}

function logoutAdmin() {
  localStorage.removeItem("admin");
  alert("Admin logged out");
  location.href = "admin-login.html";
}

/* ---------- PAGE PROTECTION ---------- */
function checkAdmin() {
  if (localStorage.getItem("admin") !== "true") {
    alert("Unauthorized Access");
    location.href = "admin-login.html";
  }
}
/* ---------- START ADOPTION ---------- */
function startAdoption(petName) {
  // check if user is logged in
  if (!localStorage.getItem("login")) {
    alert("Please login to adopt a pet");
    location.href = "login.html";
    return;
  }

  // store selected pet
  localStorage.setItem("selectedPet", petName);
  location.href = "adopt.html";
}

/* ---------- SUBMIT ADOPTION REQUEST ---------- */
function submitAdoption() {
  const user = JSON.parse(localStorage.getItem("user"));
  const pet = localStorage.getItem("selectedPet");

  const request = {
    userName: user.name,
    petName: pet,
    reason: document.getElementById("reason").value,
    address: document.getElementById("address").value,
    status: "Pending",
  };

  localStorage.setItem("adoptionRequest", JSON.stringify(request));
  alert("Adoption Request Submitted (Status: Pending)");
  location.href = "dashboard.html";
}

function openForm(pet){
  document.getElementById("adoptionForm").style.display = "flex";
  document.getElementById("petName").value = "Pet Name: " + pet;
}

function closeForm(){
  document.getElementById("adoptionForm").style.display = "none";
}

function openAdoptionForm(petName){
  document.getElementById("adoptionModal").style.display = "flex";
  document.getElementById("adoptPetName").value = "Pet Name: " + petName;
}

function closeAdoptionForm(){
  document.getElementById("adoptionModal").style.display = "none";
}


function submitAdoption(e){
  e.preventDefault();

  let petName = document.getElementById("adoptPetName").value;
  let name = e.target[1].value;
  let email = e.target[2].value;
  let phone = e.target[3].value;
  let reason = e.target[4].value;

  let requests = JSON.parse(localStorage.getItem("adoptionRequests")) || [];

  requests.push({
    petName,
    name,
    email,
    phone,
    reason,
    status: "Pending"
  });

  localStorage.setItem("adoptionRequests", JSON.stringify(requests));

  alert("✅ Your request has been submitted successfully. We'll contact you soon.");

  closeAdoptionForm();
  e.target.reset();
}
function displayPets(){
  let pets = JSON.parse(localStorage.getItem("pets")) || [];
  let list = document.getElementById("petList");
  list.innerHTML = "";

  pets.forEach((p,i)=>{
    list.innerHTML += `
      <div>
        <img src="${p.img}">
        <h3>${p.name}</h3>
        <p class="${p.status === 'Adopted' ? 'adopted' : 'available'}">
          ${p.status}
        </p>
        <button onclick="deletePet(${i})">Delete</button>
      </div>
    `;
  });
}
function displayPets(){
  let pets = JSON.parse(localStorage.getItem("pets")) || [];
  let list = document.getElementById("petList");
  list.innerHTML = "";

  pets.forEach((p,i)=>{
    list.innerHTML += `
      <div>
        <img src="${p.img}">
        <h3>${p.name}</h3>
        <p class="${p.status === 'Adopted' ? 'adopted' : 'available'}">
          ${p.status}
        </p>
        <button onclick="deletePet(${i})">Delete</button>
      </div>
    `;
  });
}
pets.forEach(pet => {
  let disabled =
    pet.status === "Adopted" ||
    adoptionRequests.some(r =>
      r.petName === pet.name &&
      (r.status === "Pending" || r.status === "Approved")
    );

  container.innerHTML += `
    <div class="pet-card">
      <img src="${pet.img}">
      <h3>${pet.name}</h3>

      ${
        disabled
        ? `<span class="adopted-badge">Not Available</span>`
        : `<button onclick="openAdoptionForm('${pet.name}')">Adopt Me</button>`
      }

    </div>
  `;
});



