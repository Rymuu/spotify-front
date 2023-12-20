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

export const getAudio = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/api/audios/${id}/`);
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

export const getTopListenedAudios = async () => {
  const response = await fetch("http://localhost:3000/api/topListenedAudios");
  const data = await response.json();
  return data;
};

export const getLastListenedAudios = async () => {
  const response = await fetch("http://localhost:3000/api/lastListenedAudios");
  const data = await response.json();
  return data;
};

export const getLast10Audios = async () => {
  const response = await fetch("http://localhost:3000/api/last10Audios");
  const data = await response.json();
  return data;
};

export const getLast10Albums = async () => {
  const response = await fetch("http://localhost:3000/api/last10Albums");
  const data = await response.json();
  return data;
};

export const getLast10Artists = async () => {
  const response = await fetch("http://localhost:3000/api/last10Artists");
  const data = await response.json();
  return data;
};

export const playedAudio = async () => {
  const response = await fetch("http://localhost:3000/api/playedAudio", {
    method: "POST",
  });
  const data = await response.json();
  return data;
};
