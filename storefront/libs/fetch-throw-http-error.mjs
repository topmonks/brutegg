/**
 * @param {import('node-fetch').Response} res
 * */
export default async (res) => {
  if (res.ok) {
    return res;
  } else {
    const text = await res.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      // not json error response
    }

    const e = new Error(text);
    e.status = res.status;
    if (data) {
      e.data = data;
    }

    throw e;
  }
};
