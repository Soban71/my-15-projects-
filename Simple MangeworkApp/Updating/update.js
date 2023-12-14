document.addEventListener('DOMContentLoaded', function () {

    function getUserIdFromURL() {
        // Implement this function if needed
    }

    function updateUser(userId) {
        const updatedUsername = document.getElementById('editUserName').value;
        const updatedURL = document.getElementById('editURLField').value;
        const updatedPassword = document.getElementById('editPassword').value;
        const confirmPassword = document.getElementById('ConfirmPassword').value;

        // Check if password and confirm password match
        if (updatedPassword !== confirmPassword) {
            alert('Password and Confirm Password do not match.');
            return;
        }

        const updatedUserData = {
            userName: updatedUsername,
            URLField: updatedURL,
            password: updatedPassword
        };

        $.ajax({
            url: `http://localhost:3000/users/${userId}`,
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(updatedUserData),
            success: function (data) {
                console.log('User updated successfully:', data);
                window.location.href = '../loginManager/index.html';
            },
            error: function (xhr, status, error) {
                console.error('Error updating user:', error);
            }
        });
    }

    const searchParams = new URLSearchParams(window.location.search);
    const userId = searchParams.get('userId');
    const URLField = decodeURIComponent(searchParams.get('URLField'));
    const userName = decodeURIComponent(searchParams.get('userName'));
    const password = decodeURIComponent(searchParams.get('password'));

    populateEditForm(userId, URLField, userName, password);

    function populateEditForm(userId, URLField, userName, password) {
        document.getElementById('userTableBody').innerHTML = `
            <tr>
                <td>${userId}</td>
                <td><input type="text" id="editURLField" value="${URLField || ''}"></td>
                <td><input type="text" id="editUserName" value="${userName || ''}"></td>
                <td>
                    <input type="password" id="editPassword" value="${password || ''}">
                    <input type="password" id="ConfirmPassword" value="">
                </td>
                <td>
                    <button id="updateButton"><i class="fa fa-pencil-square-o" style="font-size:16px"></i></button>
                    <button id="updateButton"><i class="fa fa-mail-reply" style="font-size:16px"></i></button>
                </td>
            </tr>
        `;
    }

    document.getElementById('updateButton').addEventListener('click', function () {
        updateUser(userId);
    });
});
