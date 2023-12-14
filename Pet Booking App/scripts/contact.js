document.getElementById("submit-button").addEventListener("click", function () {
    var userName = document.getElementById("user-name").value.trim();
    var userEmail = document.getElementById("user-email").value.trim();
    var userMessage = document.getElementById("user-message").value.trim();

    if (userName !== '' && userEmail !== '' && userMessage !== '') {
        var contactPage = document.getElementById("contact-page");
        contactPage.innerHTML = '<p style="font-size: 24px;">Thank you for your message</p>';
    }
});