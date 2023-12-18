//Functions to get [id]

export const getArtist = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/api/artists/${id}/`);
    if (!response.ok) {
      throw new Error("Failed to fetch artist");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching artist:", error);
    throw new Error("Failed to fetch artist");
  }
};

export const getAlbum = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/api/albums/${id}/`);
    if (!response.ok) {
      throw new Error("Failed to fetch artist");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching artist:", error);
    throw new Error("Failed to fetch artist");
  }
};

//Functions to get all

export const getArtists = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/artists", {
      cache: "no-cache",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching artists:", error);
    throw error;
  }
};

export const getAlbums = async () => {
  const response = await fetch("http://localhost:3000/api/albums");
  const data = await response.json();
  return data;
};

export const getAudios = async () => {
  const response = await fetch("http://localhost:3000/api/audios");
  const data = await response.json();
  return data;
};
