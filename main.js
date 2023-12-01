// Event listener for form submission for both new user creation and editing
document.getElementById("userForm").addEventListener("submit", function (event) {
    event.preventDefault();
  
    let name = event.target.Username.value;
    let email = event.target.emailId.value;
    let phoneNumber = event.target.phonenumber.value;
    let dob = event.target.dob.value;
  
    let obj = {
      name,
      email,
      phoneNumber,
      dob,
    };
  
    // If the email already exists, update the user details instead of creating a new user
    if (localStorage.getItem(email)) {
      // Save the object to the API using Axios
      axios
        .put(`https://crudcrud.com/api/5ba135b43e9049419b5d68257381d317/BookingappointmentApp/${email}`, obj)
        .then((response) => {
          console.log("User details updated successfully!");
          updateDisplay(obj);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      // Save the object to the API using Axios
      axios
        .post("https://crudcrud.com/api/5ba135b43e9049419b5d68257381d317/BookingappointmentApp", obj)
        .then((response) => {
          console.log(response);
          showDisplay(obj);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  
    // Save the object to local storage
    localStorage.setItem(obj.email, JSON.stringify(obj));
  
    // Clear the input fields after saving
    event.target.reset();
  });
  
  // Load data from local storage and display it on the screen
  document.addEventListener("DOMContentLoaded", () => {
    axios
      .get("https://crudcrud.com/api/5ba135b43e9049419b5d68257381d317/BookingappointmentApp")
      .then((response) => {
        console.log(response);
        for (let i = 0; i < response.data.length; i++) {
          let userDetailsObj = response.data[i];
          showDisplay(userDetailsObj);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });
  
  // Function to display the user object on the screen
  function showDisplay(obj) {
    let parentItem = document.getElementById("AddItem");
    let li = document.createElement("li");
    li.textContent = obj.name + ' ' + obj.email + ' ' + obj.phoneNumber + ' ' + obj.dob;
  
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function () {
      deleteFromCrudCrud(obj.email);
      parentItem.removeChild(li);
    });
  
    let editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", function () {
      populateFormWithUser(obj);
    });
  
    li.appendChild(deleteButton);
    li.appendChild(editButton);
    parentItem.appendChild(li);
  }
  
  // Function to update the displayed user details on the screen after editing
  function updateDisplay(obj) {
    let parentItem = document.getElementById("AddItem");
    let allItems = parentItem.getElementsByTagName("li");
  
    // Find the existing user details in the displayed list and update it
    for (let i = 0; i < allItems.length; i++) {
      let item = allItems[i];
      if (item.textContent.includes(obj.email)) {
        item.textContent = obj.name + ' ' + obj.email + ' ' + obj.phoneNumber + ' ' + obj.dob;
      }
    }
  }
  
  function deleteFromCrudCrud(userId) {
    axios
      .delete(`https://crudcrud.com/api/5ba135b43e9049419b5d68257381d317/BookingappointmentApp/${userId}`)
      .then((response) => {
        console.log("User deleted successfully!");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  
  // Function to remove a user from localStorage based on their email
  function removeFromLocalStorage(email) {
    localStorage.removeItem(email);
  }
  
  // Function to populate the form with user details for editing
  function populateFormWithUser(obj) {
    document.getElementById("userForm").elements.Username.value = obj.name;
    document.getElementById("userForm").elements.emailId.value = obj.email;
    document.getElementById("userForm").elements.phonenumber.value = obj.phoneNumber;
    document.getElementById("userForm").elements.dob.value = obj.dob;
  }
  