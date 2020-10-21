export const variantTypes = ["A", "B"];

export const fetchHandler = async (url: string, name: string) => {
  try {
    //Response with the all the A/B Tests
    const response = await fetch(url);
    const { ABTesting } = await response.json();

    const result = ABTesting.filter((item: any) => item.name === name);
    const show = result.length > 0;
    const randomVariant = Math.floor(Math.random() * variantTypes.length);

    return {
      show,
      variant: variantTypes[randomVariant],
      loading: false,
    };
  } catch (e) {
    throw e;
  }
};

export const emitterHandler = async (
  variant: string,
  name: string,
  url: string
) => {
  try {
    const post_body = {
      name,
      varA: variant === "A" ? 1 : 0,
      varB: variant === "B" ? 1 : 0,
    };

    const response = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: JSON.stringify(post_body),
    });

    return await response.json();
  } catch (e) {
    return e;
  }
};
