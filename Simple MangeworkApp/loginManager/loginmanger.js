$(document).ready(function () {
  $('#signupForm').submit(function (event) {
      event.preventDefault();
      fetchUserData();
  });

  window.fetchUserData = function () {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/users',
        success: function (users) {
            displayUserData(users);
        },
        error: function (error) {
            console.error('Error fetching user data:', error);
        },
    });
};

  function displayUserData(users) {
      const tableBody = $('#userTableBody');
      tableBody.empty();

      users.forEach(user => {
          const maskedPassword = '*'.repeat(user.password.length);

          const row = `<tr>
                           <td><span>${user.userId}</span></td>
                           <td><a href="${user.URLField}" target="_blank">${user.URLField}</a></td>
                           <td><span>${user.userName}</span></td>
                           <td><span>${maskedPassword}</span></td>

                           <td>
                               <button onclick="editUser(${user.userId}, '${user.URLField}', '${user.userName}', '${user.password}')">
                                   <i class="fa fa-edit" style="font-size:20px"></i>
                               </button>
                               <button onclick="deleteUser(${user.userId})">
                                   <i class="material-icons" style="font-size:18px">delete</i>
                               </button>
                           </td>
                       </tr>`;
          tableBody.append(row);
      });
  }

  window.deleteUser = function (userId) {
      console.log('Deleting user with ID:', userId);

      if (confirm('Are you sure you want to delete this user?')) {
          $.ajax({
              type: 'DELETE',
              url: `http://localhost:3000/users/${userId}`,
              success: function (response) {
                  console.log('Delete success:', response);
                  alert(response.message);
                  
                  fetchUserData();
              },
              error: function (error) {
                  console.error('Error deleting user:', error);
                  alert('Error deleting user. Check the console for details.');
              },
          });
      }
  };

  window.editUser = function (userId, URLField, userName, password) {
      window.location.href = `../Updating/Edituser.html?userId=${userId}&URLField=${encodeURIComponent(URLField)}&userName=${encodeURIComponent(userName)}&password=${encodeURIComponent(password)}`;
  };

  fetchUserData();
});


$(document).ready(function () {
    $('#signupForm').submit(function (event) {
      event.preventDefault();
  
      const userName = $('#userName').val();
      const URLField = $('#URLField').val();
      const password = $('#password').val();
      const confirmPassword = $('#confirmPassword').val();
  
      $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/signup',
        contentType: 'application/json',
        data: JSON.stringify({
          userName,
          URLField,
          password,
          confirmPassword,
        }),
        success: function (response) {
          alert(`User registered successfully. Registration ID: ${response.userId}`);
          closePopup();
          fetchUserData();
          
          // Clear form fields
          $('#userName').val('');
          $('#URLField').val('');
          $('#password').val('');
          $('#confirmPassword').val('');

          fetchUserData();
        },
        error: function (error) {
          alert(error.responseJSON.error);
        },
      });
    });
  });
  