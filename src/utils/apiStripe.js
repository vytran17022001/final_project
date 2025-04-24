const REACT_APP_STRIPE_SECRET_KEY = "";
const STRIPE_BASE_URL = "https://api.stripe.com/v1";

export async function getStripe(collection) {
  try {
    const response = await fetch(`${STRIPE_BASE_URL}/${collection}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${REACT_APP_STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    if (!response.ok) throw new Error("Network response was not ok");

    const res = await response.json();
    return res.data;
  } catch (error) {
    throw new Error("Error fetching data: " + error.message);
  }
}

export async function postStripe(collection, data) {
  try {
    const formData = new URLSearchParams();
    Object.entries(data).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item, index) =>
          formData.append(`${key}[${index}]`, item)
        );
      } else {
        formData.append(key, value);
      }
    });

    const response = await fetch(`${STRIPE_BASE_URL}/${collection}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${REACT_APP_STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData,
    });

    if (!response.ok) throw new Error("Network response was not ok");

    const res = await response.json();
    return res;
  } catch (error) {
    throw new Error("Error posting data: " + error.message);
  }
}

export async function updateStripe(collection, id, data) {
  try {
    const formData = new URLSearchParams();
    Object.entries(data).forEach(([key, value]) => {
      if (key === "metadata") {
        Object.entries(value).forEach(([metaKey, metaValue]) => {
          formData.append(metaKey, metaValue);
        });
      } else if (Array.isArray(value)) {
        value.forEach((item, index) =>
          formData.append(`${key}[${index}]`, item)
        );
      } else {
        formData.append(key, value);
      }
    });

    const response = await fetch(`${STRIPE_BASE_URL}/${collection}/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${REACT_APP_STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData,
    });

    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    throw new Error("Error updating data: " + error.message);
  }
}

export async function deleteStripe(collection, id) {
  try {
    const response = await fetch(`${STRIPE_BASE_URL}/${collection}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${REACT_APP_STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    throw new Error("Error deleting data: " + error.message);
  }
}
