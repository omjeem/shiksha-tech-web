import { BACKEND_URL } from "../utils";
import { ContactForm } from "../utils/types";

/**
 * Submit contact form data to the backend
 */
export const submitContactForm = async (
  formData: ContactForm
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await fetch(`${BACKEND_URL}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to submit contact form");
    }

    return {
      success: true,
      message: data.message || "Form submitted successfully",
    };
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
};
