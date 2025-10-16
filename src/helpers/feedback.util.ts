// Google Apps Script Configuration
const APPS_SCRIPT_CONFIG = {
  // Use environment variable for the deployed Google Apps Script web app URL
  scriptUrl: import.meta.env.VITE_GOOGLE_SCRIPT_URL
};

// Helper to validate email
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Submit feedback via Google Apps Script
export async function submitFeedback(feedbackData: {
  name: string;
  email: string;
  message: string;
}): Promise<{ status: string; error?: string }> {
  try {
    // Validate email
    if (!isValidEmail(feedbackData.email)) {
      return { 
        status: "error", 
        error: "Please enter a valid email address" 
      };
    }

    // Submit to Google Apps Script Web App using form data (better CORS support)
    const formData = new FormData();
    formData.append('timestamp', new Date().toISOString());
    formData.append('name', feedbackData.name);
    formData.append('email', feedbackData.email);
    formData.append('message', feedbackData.message);

    const response = await fetch(APPS_SCRIPT_CONFIG.scriptUrl, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Response:", result);
    return { status: "success" };
  } catch (error) {
    console.error('Error submitting feedback:', error);
    return { 
      status: "error", 
      error: "Failed to submit feedback. Please try again." 
    };
  }
}