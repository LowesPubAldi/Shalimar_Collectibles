const contactForm = document.querySelector("[data-contact-form]");
const contactStatus = document.querySelector("[data-contact-status]");
const contactFileInput = document.getElementById("contact-attachments");
const contactFileSummary = document.querySelector("[data-contact-file-summary]");

if (contactFileInput && contactFileSummary) {
    contactFileInput.addEventListener("change", () => {
        const files = Array.from(contactFileInput.files || []);

        if (files.length === 0) {
            contactFileSummary.textContent = "No files selected.";
            return;
        }

        contactFileSummary.textContent = `Selected: ${files.map((file) => file.name).join(", ")}`;
    });
}

if (contactForm && contactStatus) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!contactForm.reportValidity()) {
            contactStatus.removeAttribute("data-state");
            contactStatus.textContent = "Please complete the required fields before moving on.";
            return;
        }

        contactStatus.dataset.state = "ready";
        contactStatus.textContent = "Contact flow saved. Tomorrow we can connect this form to direct email and upload handling.";
    });
}