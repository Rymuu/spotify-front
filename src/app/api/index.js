import dotenv from "dotenv";
dotenv.config();

export const getArtist = async (id) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/artists/${id}/`
    );
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
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/albums/${id}/`
    );
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
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/audios/${id}/`
    );
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

export const getTopListenedAudios = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/topListenedAudios`
  );
  const data = await response.json();
  return data;
};

export const getLastListenedAudios = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/lastListenedAudios`
  );
  const data = await response.json();
  return data;
};

export const getLast10Audios = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/last10Audios`
  );
  const data = await response.json();
  return data;
};

export const getLast10Albums = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/last10Albums`
  );
  const data = await response.json();
  return data;
};

export const getLast10Artists = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/last10Artists`
  );
  const data = await response.json();
  return data;
};

export const playedAudio = async (id) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/playedAudio/${id}`,
    {
      method: "POST",
    }
  );
  const data = await response.json();
  return data;
};

export const search = async (input) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ keyword: input }),
  });
  const data = await response.json();
  return data;
};
