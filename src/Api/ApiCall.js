const apiCall = async (method, url, headers = {}, data = null) => {
  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        ...headers,
      },
      body: data ? JSON.stringify(data) : null,
    });
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      throw new Error("Something went wrong");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
