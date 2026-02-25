import {
  cartItemsJson,
  deliveryOptionsJson,
  ordersJson,
  orderItemsJson,
  productsJson,
} from "@/constants";
import { type DefinedModelsMap } from "@/setup";

export async function seedStaticTables(modelsMap: DefinedModelsMap) {
  const { DeliveryOption, Product } = modelsMap;

  const isProductsMissing = (await Product.count()) === 0;
  if (isProductsMissing) {
    await Product.bulkCreate(productsJson);
  }

  const isDeliveryOptionsMissing = (await DeliveryOption.count()) === 0;
  if (isDeliveryOptionsMissing) {
    await DeliveryOption.bulkCreate(deliveryOptionsJson);
  }
}

export async function resetDatabase(modelsMap: DefinedModelsMap) {
  const { CartItem, DeliveryOption, Order, OrderItem, Product } = modelsMap;

  // delete dependent tables first
  await CartItem.destroy({
    where: {},
    truncate: true,
    cascade: true,
    force: true,
  });
  await OrderItem.destroy({
    where: {},
    truncate: true,
    cascade: true,
    force: true,
  });

  // delete independent tables
  await DeliveryOption.destroy({
    where: {},
    truncate: true,
    cascade: true,
    force: true,
  });
  await Order.destroy({
    where: {},
    truncate: true,
    cascade: true,
    force: true,
  });
  await Product.destroy({
    where: {},
    truncate: true,
    cascade: true,
    force: true,
  });

  // insert in independent tables
  await Product.bulkCreate(productsJson);
  await DeliveryOption.bulkCreate(deliveryOptionsJson);
  await Order.bulkCreate(ordersJson);

  // insert in dependent tables
  await CartItem.bulkCreate(cartItemsJson);
  await OrderItem.bulkCreate(orderItemsJson);
}
