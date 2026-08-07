const contactForm = document.querySelector("[data-contact-form]");
const contactStatus = document.querySelector("[data-contact-status]");
const contactFileInput = document.getElementById("contact-attachments");
const contactFileSummary = document.querySelector("[data-contact-file-summary]");

const EMAILJS_SERVICE_ID = "service_oe2vosd";
const EMAILJS_TEMPLATE_ID = "template_bfckmd9";
const EMAILJS_PUBLIC_KEY = "G1CS-QLbgNF8atJUw";

if (window.emailjs) {
    window.emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
}

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
            contactStatus.textContent = "Complete the required fields to queue the request.";
            return;
        }

        if (!window.emailjs) {
            contactStatus.removeAttribute("data-state");
            contactStatus.textContent = "EmailJS did not load. Check the browser connection and try again.";
            return;
        }

        contactStatus.dataset.state = "ready";
        contactStatus.textContent = "Sending request...";

        window.emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, contactForm).then(
            () => {
                contactForm.reset();
                if (contactFileSummary) {
                    contactFileSummary.textContent = "No files selected.";
                }

                contactStatus.dataset.state = "ready";
                contactStatus.textContent = "Request sent. Check your inbox for the EmailJS test message.";
            },
            (error) => {
                contactStatus.removeAttribute("data-state");
                contactStatus.textContent = error?.text
                    ? `Message failed to send: ${error.text}`
                    : "Message failed to send. Check the EmailJS settings and try again.";
            }
        );
    });
}