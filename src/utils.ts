// Base URLs
export const BACKEND_URL = "https://shiksha-tech-server.onrender.com/api/v1";

// Common utility functions
export const formatDate = (date: string | Date): string => {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
