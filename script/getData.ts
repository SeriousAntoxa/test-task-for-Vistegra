export let productData: any;

export async function getProduct() {
  try {
    let res: Response = await fetch('../data/product.json');
    if (res.ok) {
      productData = await res.json() as Object;
      return productData
    }
  } catch (err) {
    console.log(err.message)
    return null
  }
}
