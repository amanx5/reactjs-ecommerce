import type { Attributes } from "sequelize";
import type { DeliveryOption } from "@/persistance/models";
import { ensureArray } from "@/utils";
import { MalformedRequestUrlError } from "@/application/errors";

type DeliveryOptionExpandAttributes = {
  estimatedDeliveryTimeMs: number;
};

type DeliveryOptionExpandAttribute = keyof DeliveryOptionExpandAttributes;

const DeliveryOptionExpandAttributeList: DeliveryOptionExpandAttribute[] = [
  "estimatedDeliveryTimeMs",
];

type DeliveryOptionExpanded = Attributes<DeliveryOption> &
  Partial<DeliveryOptionExpandAttributes>;

export function expandDeliveryOption(
  deliveryOption: DeliveryOption,
  expand: Exclude<qs.ParsedQs[keyof qs.ParsedQs], undefined>,
): DeliveryOptionExpanded {
  const expandAttributesArray = ensureArray(expand);
  const isExpandOptionsInvalid = expandAttributesArray.some(
    (ele) =>
      !DeliveryOptionExpandAttributeList.includes(
        ele as DeliveryOptionExpandAttribute,
      ),
  );

  if (isExpandOptionsInvalid) {
    throw new MalformedRequestUrlError();
  }

  const deliveryOptionPlain = deliveryOption.get({ plain: true });

  const deliveryOptionExpanded: DeliveryOptionExpanded = {
    ...deliveryOptionPlain,
  };

  for (const attribute of expandAttributesArray) {
    switch (attribute) {
      case "estimatedDeliveryTimeMs": {
        const nowMs = Date.now();
        const dayMs = 24 * 60 * 60 * 1000;

        deliveryOptionExpanded.estimatedDeliveryTimeMs =
          nowMs + deliveryOptionPlain.deliveryDays * dayMs;
        break;
      }
    }
  }

  return deliveryOptionExpanded;
}
