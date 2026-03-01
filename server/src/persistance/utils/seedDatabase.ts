import {
  defaultDeliveryOptions,
  defaultProducts,
} from "@/persistance/defaults/";

import { DeliveryOption, Product } from "@/persistance/models/";

export async function seedDatabase() {
  const produtsCount = await Product.count();
  const deliveryOptionsCount = await DeliveryOption.count();

  if (produtsCount === 0) {
    await Product.bulkCreate(defaultProducts);
  }

  if (deliveryOptionsCount === 0) {
    await DeliveryOption.bulkCreate(defaultDeliveryOptions);
  }
}
