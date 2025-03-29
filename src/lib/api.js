const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL 

export async function fetchAgencies() {
    const response = await fetch(`${API_BASE_URL}/agencies`);
    if (!response.ok) throw new Error("Failed to fetch posts");
    return response.json();
  }